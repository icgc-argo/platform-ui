/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { useMutation } from '@apollo/client';
import {
  ColumnDef,
  Container,
  css,
  DnaLoader,
  Notification,
  NotificationVariant,
  NOTIFICATION_VARIANTS,
  Table,
  TableV8,
  Typography,
} from '@icgc-argo/uikit';
import useGlobalLoader from 'components/GlobalLoader';
import ModalPortal from 'components/Modal';
import useCommonToasters from 'components/useCommonToasters';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { useToaster } from 'global/hooks/toaster';
import { usePageQuery } from 'global/hooks/usePageContext';
import useUrlParamState from 'global/hooks/useUrlParamState';
import { toDisplayError } from 'global/utils/clinicalUtils';
import { displayDateAndTime, sleep } from 'global/utils/common';
import { capitalize } from 'global/utils/stringUtils';
import { omit } from 'lodash';
import head from 'lodash/head';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';
import Router from 'next/router';
import { useState, useEffect, useMemo, ComponentProps, createRef } from 'react';

import { useClinicalSubmissionQuery } from '.';
import { containerStyle } from '../common';
import ErrorNotification, { ErrorReportColumns } from '../ErrorNotification';
import {
  ErrorNotificationDefaultColumns,
  errorNotificationTableProps,
  getDefaultErrorTableColumns,
} from '../ErrorNotification/ErrorNotificationDefaultTable';
import { SchemaInvalidSubmissionNotification } from '../SchemaInvalidSubmissionNotification';
import {
  SubmissionSystemLockedNotification,
  useSubmissionSystemDisabled,
} from '../SubmissionSystemLockedNotification';
import FilesNavigator from './FilesNavigator';
import SIGN_OFF_SUBMISSION_MUTATION from './gql/SIGN_OFF_SUBMISSION_MUTATION';
import UPLOAD_CLINICAL_SUBMISSION_MUTATION from './gql/UPLOAD_CLINICAL_SUBMISSION_MUTATION';
import VALIDATE_SUBMISSION_MUTATION from './gql/VALIDATE_SUBMISSION_MUTATION';
import Instruction from './Instruction';
import SignOffValidationModal from './SignOffValidationModal';
import SubmissionSummaryTable from './SubmissionSummaryTable';
import {
  ClinicalSubmissionEntityFile,
  ClinicalSubmissionError,
  ClinicalSubmissionQueryData,
  GqlClinicalEntity,
  SignOffSubmissionMutationVariables,
  UploadFilesMutationVariables,
  ValidateSubmissionMutationVariables,
} from './types';
import useUserConfirmationModalState from './useUserConfirmationModalState';
import { getConfig } from 'global/config';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

type ErrorTableColumns = ErrorNotificationDefaultColumns & {
  fileName: string;
};

export type ErrorTableColumnProperties = {
  accessorKey: keyof ErrorTableColumns;
  header: string;
  maxSize?: number;
};

const CLINICAL_FILE_ORDER = [
  'donor',
  'specimen',
  'primary_diagnosis',
  'treatment',
  'chemotherapy',
  'hormone_therapy',
  'immunotherapy',
  'radiation',
  'surgery',
  'follow_up',
  'family_history',
  'exposure',
  'comorbidity',
  'biomarker',
];

const gqlClinicalEntityToClinicalSubmissionEntityFile =
  (submissionState: ClinicalSubmissionQueryData['clinicalSubmissions']['state']) =>
  (gqlFile: GqlClinicalEntity): ClinicalSubmissionEntityFile => {
    const isSubmissionValidated =
      submissionState === 'INVALID' ||
      submissionState === 'VALID' ||
      submissionState === 'PENDING_APPROVAL';
    const isPendingApproval = submissionState === 'PENDING_APPROVAL';
    const stats = {
      errorsFound: [],
      new: [],
      noUpdate: [],
      updated: [],
      ...(gqlFile.stats || {}),
    };
    const hasSchemaError = !!gqlFile.schemaErrors.length;
    const hasDataError = !!gqlFile.dataErrors.length;
    const hasUpdate = !!stats.updated.length;
    return {
      stats,
      createdAt: gqlFile.createdAt,
      creator: gqlFile.creator,
      fileName: gqlFile.batchName,
      schemaErrors: gqlFile.schemaErrors,
      dataErrors: gqlFile.dataErrors,
      dataUpdates: gqlFile.dataUpdates,
      dataWarnings: gqlFile.dataWarnings,
      displayName: capitalize((gqlFile.clinicalType || '').split('_').join(' ')),
      clinicalType: gqlFile.clinicalType,
      records: gqlFile.records,
      recordsCount: gqlFile.records.length,
      status: isPendingApproval
        ? hasUpdate
          ? 'UPDATE'
          : 'SUCCESS'
        : hasSchemaError || hasDataError
        ? 'ERROR'
        : gqlFile.records.length
        ? isSubmissionValidated
          ? 'SUCCESS'
          : 'WARNING'
        : 'NONE',
    };
  };

const getFileNavigatorFiles = (dataObj: ClinicalSubmissionQueryData) =>
  map(
    orderBy(dataObj.clinicalSubmissions.clinicalEntities, (e) =>
      CLINICAL_FILE_ORDER.indexOf(e.clinicalType),
    ),
    gqlClinicalEntityToClinicalSubmissionEntityFile(dataObj.clinicalSubmissions.state),
  );

const getErrorColumns = (
  level: NotificationVariant,
): {
  errorReportColumns: ErrorReportColumns[];
  errorTableColumns: ColumnDef<ErrorTableColumns>[];
} => {
  const errorTableColumns: ErrorTableColumnProperties[] = [
    ...getDefaultErrorTableColumns(level),
    {
      accessorKey: 'fileName',
      header: 'File',
      maxSize: 150,
    },
  ];

  const errorReportColumns: ErrorReportColumns[] = errorTableColumns.map(
    ({ accessorKey, header }) => ({
      header,
      id: accessorKey,
    }),
  );

  return { errorReportColumns, errorTableColumns };
};

const PageContent = () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { setGlobalLoading } = useGlobalLoader();

  // not declared as a side effect that changes with program change
  // change in 'data' always seems to take precedence over currentFileList within `defaultClinicalEntityType`
  const [currentFileList, setCurrentFileList] = useState<{
    fileList: FileList | null;
    shortName: string;
  }>({ fileList: null, shortName: programShortName });

  const {
    isModalShown: signOffModalShown,
    getUserConfirmation: getSignOffConfirmation,
    onConfirmed: onSignOffApproved,
    onCancel: onSignOffCanceled,
  } = useUserConfirmationModalState();
  const toaster = useToaster();
  const commonToaster = useCommonToasters();

  const getClinicalEntityType = (dataObj?: ClinicalSubmissionQueryData) => {
    const defaultType = null;
    if (!dataObj) return defaultType;
    const fileToClinicalEntityType = (file: File): string =>
      dataObj.clinicalSubmissions.clinicalEntities
        .map((e) => e.clinicalType)
        .find((entityType) => !!file.name.match(new RegExp(`^${entityType}.*\\.tsv`, 'i')));

    // currentfileList state can persist when the program changes
    // ensure currentfileList is specific to the current program, so sorting does not get affected by different program
    // adding currentFileList to the dependency list array had no effect (https://github.com/icgc-argo/platform-ui/pull/1220)
    const lastUploadedEntityTypes =
      currentFileList.shortName === programShortName
        ? uniq(map(currentFileList.fileList, fileToClinicalEntityType))
        : [];

    const files = getFileNavigatorFiles(dataObj);

    const fileToFocusOn = head(
      orderBy(files, (file) => {
        const wereFilesUploaded = lastUploadedEntityTypes.length > 0;
        const applyPriorityRule = wereFilesUploaded
          ? lastUploadedEntityTypes.includes(file.clinicalType)
          : true;
        switch (file.status) {
          case 'ERROR':
            return applyPriorityRule ? 0 : files.length;
          case 'UPDATE':
            return applyPriorityRule ? 1 : files.length;
          case 'WARNING':
            return applyPriorityRule ? 2 : files.length;
          case 'SUCCESS':
            return applyPriorityRule ? 3 : files.length;
          case 'NONE':
            return files.length;
          default:
            return files.length;
        }
      }),
    );
    return files.length ? fileToFocusOn.clinicalType : defaultType;
  };

  const [tabFromData, setTabFromData] = useState<string>('donor');

  const [selectedClinicalEntityType, setSelectedClinicalEntityType] = useUrlParamState(
    'tab',
    getClinicalEntityType(),
    {
      serialize: (v) => v,
      deSerialize: (v) => v,
    },
  );

  useEffect(() => {
    // using setSelectedClinicalEntityType in useClinicalSubmissionQuery onCompleted callback
    // causes an infinite loop
    setSelectedClinicalEntityType(tabFromData);
  }, [tabFromData]);

  const {
    data,
    loading: loadingClinicalSubmission,
    updateQuery: updateClinicalSubmissionQuery,
    refetch,
  } = useClinicalSubmissionQuery(programShortName, {
    onCompleted: (result) => {
      const nextClinicalEntityType = getClinicalEntityType(result);
      setTabFromData(nextClinicalEntityType);
    },
  });

  const fileNavigatorFiles = getFileNavigatorFiles(data);

  const defaultClinicalEntityType = useMemo((): string | null => {
    return getClinicalEntityType(data);
  }, [data]);

  const [uploadClinicalSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    UploadFilesMutationVariables
  >(UPLOAD_CLINICAL_SUBMISSION_MUTATION, {
    onCompleted: () => {
      setSelectedClinicalEntityType(defaultClinicalEntityType);
    },
    onError: () => {
      commonToaster.unknownError();
    },
  });
  const [validateSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ValidateSubmissionMutationVariables
  >(VALIDATE_SUBMISSION_MUTATION, {
    onCompleted: () => {
      setSelectedClinicalEntityType(defaultClinicalEntityType);
    },
  });
  const [signOffSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    SignOffSubmissionMutationVariables
  >(SIGN_OFF_SUBMISSION_MUTATION);

  const allDataErrors = useMemo(
    () =>
      data.clinicalSubmissions.clinicalEntities.reduce<
        Array<
          ClinicalSubmissionError & {
            fileName: string;
          }
        >
      >(
        (acc, entity) => [
          ...acc,
          ...entity.dataErrors.map((err) => ({
            ...err,
            fileName: entity.batchName,
          })),
        ],
        [],
      ),
    [data],
  );

  const allDataWarnings = useMemo(
    () =>
      data.clinicalSubmissions.clinicalEntities.reduce<
        Array<
          ClinicalSubmissionError & {
            fileName: string;
          }
        >
      >(
        (acc, entity) => [
          ...acc,
          ...entity.dataWarnings.map((err) => ({
            ...err,
            fileName: entity.batchName,
          })),
        ],
        [],
      ),
    [data],
  );

  const hasDataWarning = !!allDataWarnings.length;
  const hasDataError = !!allDataErrors.length;
  const hasSchemaErrorsAfterMigration = data.clinicalSubmissions.state === 'INVALID_BY_MIGRATION';
  const hasSchemaError =
    !!data.clinicalSubmissions.clinicalEntities.length &&
    data.clinicalSubmissions.clinicalEntities.some(({ schemaErrors }) => !!schemaErrors.length);
  const hasSomeEntity = data.clinicalSubmissions.clinicalEntities.some(
    ({ records }) => !!records.length,
  );
  const isReadyForValidation = hasSomeEntity && !hasSchemaError && !hasSchemaErrorsAfterMigration;
  const isReadyForSignoff = isReadyForValidation && data.clinicalSubmissions.state === 'VALID';
  const isPendingApproval = data.clinicalSubmissions.state === 'PENDING_APPROVAL';
  const hasUpdate = data.clinicalSubmissions.clinicalEntities.some(
    (clinicalEntity) => !!clinicalEntity.dataUpdates.length,
  );
  const isValidated = data.clinicalSubmissions.state !== 'OPEN';

  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const onErrorClose: (index: number) => ComponentProps<typeof Notification>['onInteraction'] =
    (index) =>
    ({ type }) => {
      if (type === 'CLOSE') {
        updateClinicalSubmissionQuery((previous) => ({
          ...previous,
          clinicalSubmissions: {
            ...previous.clinicalSubmissions,
            fileErrors: previous.clinicalSubmissions.fileErrors.filter((_, i) => i !== index),
          },
        }));
      }
    };

  const handleSubmissionFilesUpload = (files: FileList) => {
    setCurrentFileList({ fileList: files, shortName: programShortName });
    return uploadClinicalSubmission({
      variables: {
        files,
        programShortName,
      },
    });
  };

  const handleDataErrorClearance = () => {
    toaster.addToast({
      title: 'Clearing errors!',
      content: "I'm just a dummy placeholder behaviour",
    });
  };

  const showReloadToast = () => {
    toaster.addToast({
      variant: 'ERROR',
      title: 'Something went wrong',
      content: 'Uh oh! It looks like something went wrong. This page has been reloaded.',
    });
  };

  const handleSubmissionValidation = async () => {
    try {
      await validateSubmission({
        variables: {
          programShortName,
          submissionVersion: data.clinicalSubmissions.version,
        },
      });
    } catch (err) {
      await refetch();
      commonToaster.unknownErrorWithReloadMessage();
    }
  };

  const handleClearSchemaError: ComponentProps<typeof FilesNavigator>['clearDataError'] = async (
    file,
  ) => {
    await updateClinicalSubmissionQuery((previous) => ({
      ...previous,
      clinicalSubmissions: {
        ...previous.clinicalSubmissions,
        clinicalEntities: previous.clinicalSubmissions.clinicalEntities.map((entity) => ({
          ...entity,
          schemaErrors: file.clinicalType === entity.clinicalType ? [] : entity.schemaErrors,
        })),
      },
    }));
  };

  const handleSignOff = async () => {
    try {
      const userDidApprove = await getSignOffConfirmation();
      if (userDidApprove) {
        setGlobalLoading(true);
        await sleep();
        const { data: newData } = await signOffSubmission({
          variables: {
            programShortName,
            submissionVersion: data.clinicalSubmissions.version,
          },
        });

        if (newData.clinicalSubmissions.state === null) {
          Router.push(
            PROGRAM_DASHBOARD_PATH,
            PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, programShortName),
          );
          toaster.addToast({
            variant: 'SUCCESS',
            interactionType: 'CLOSE',
            title: 'Successful Clinical Submission!',
            content:
              'Your clinical data has been submitted. You will see the updates on your dashboard shortly.',
          });
        } else {
          setGlobalLoading(false);
        }
      }
    } catch (err) {
      await refetch();
      commonToaster.unknownErrorWithReloadMessage();
      setGlobalLoading(false);
    }
  };

  const { errorReportColumns, errorTableColumns } = getErrorColumns(NOTIFICATION_VARIANTS.ERROR);
  const { errorReportColumns: warningReportColumns, errorTableColumns: warningTableColumns } =
    getErrorColumns(NOTIFICATION_VARIANTS.WARNING);
  const errorData = allDataErrors.map(toDisplayError);
  const warningData = allDataWarnings.map(toDisplayError);

  const containerRef_tableV6 = createRef<HTMLDivElement>();

  const ErrorTable = FEATURE_REACT_TABLE_V8_ENABLED ? (
    <TableV8 columns={errorTableColumns} data={errorData} {...errorNotificationTableProps} />
  ) : (
    <div ref={containerRef_tableV6}>
      <Table
        parentRef={containerRef_tableV6}
        columns={errorTableColumns.map(
          ({ accessorKey, header, maxSize }: ErrorTableColumnProperties) => ({
            style: {
              whiteSpace: 'pre-line',
            },
            // react table v6 property name conversion
            accessor: accessorKey,
            Header: header,
            width: maxSize,
          }),
        )}
        data={errorData}
      />
    </div>
  );

  const WarningTable = FEATURE_REACT_TABLE_V8_ENABLED ? (
    <TableV8 columns={warningTableColumns} data={warningData} {...errorNotificationTableProps} />
  ) : (
    <div ref={containerRef_tableV6}>
      <Table
        parentRef={containerRef_tableV6}
        columns={warningTableColumns.map(
          ({ accessorKey, header, maxSize }: ErrorTableColumnProperties) => ({
            style: {
              whiteSpace: 'pre-line',
            },
            // react table v6 property name conversion
            accessor: accessorKey,
            Header: header,
            width: maxSize,
          }),
        )}
        data={warningData}
      />
    </div>
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      {<SubmissionSystemLockedNotification />}
      {signOffModalShown && (
        <ModalPortal>
          <SignOffValidationModal
            hasUpdate={hasUpdate}
            clinicalSubmissions={data.clinicalSubmissions}
            onActionClick={onSignOffApproved}
            onCloseClick={onSignOffCanceled}
            onCancelClick={onSignOffCanceled}
          />
        </ModalPortal>
      )}
      {!isPendingApproval && !loadingClinicalSubmission && (
        <Container css={containerStyle}>
          <Instruction
            uploadEnabled={!isSubmissionSystemDisabled}
            signOffEnabled={!isSubmissionSystemDisabled && isReadyForSignoff}
            validationEnabled={
              !isSubmissionSystemDisabled && isReadyForValidation && !hasDataError && !isValidated
            }
            onUploadFileSelect={handleSubmissionFilesUpload}
            onValidateClick={handleSubmissionValidation}
            onSignOffClick={handleSignOff}
            clinicalTypes={data.clinicalSubmissions.clinicalEntities.map(
              ({ clinicalType }) => clinicalType,
            )}
          />
        </Container>
      )}
      {isPendingApproval && !loadingClinicalSubmission && (
        <Container
          css={css`
            padding: 24px;
          `}
        >
          <div
            css={css`
              padding-bottom: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Typography
              variant="subtitle"
              color="primary"
              css={css`
                margin: 0px;
              `}
            >
              Submission Summary
            </Typography>
            <Typography variant="data" color="black" as="div">
              Signed off on{' '}
              <strong>{displayDateAndTime(data.clinicalSubmissions.updatedAt)}</strong> by{' '}
              <strong>{data.clinicalSubmissions.updatedBy}</strong>
            </Typography>
          </div>
          <SubmissionSummaryTable clinicalSubmissions={data.clinicalSubmissions} />
        </Container>
      )}
      {
        <SchemaInvalidSubmissionNotification
          marginTop={20}
          programShortName={programShortName}
          isClinicalSubmissionPage={true}
        />
      }
      {data.clinicalSubmissions.fileErrors.map(({ fileNames, message }, i) => (
        <Notification
          key={i}
          css={css`
            margin-top: 20px;
          `}
          size="SM"
          variant="ERROR"
          interactionType="CLOSE"
          title={`${fileNames.length} of ${(
            currentFileList.fileList || []
          ).length.toLocaleString()} files failed to upload: ${fileNames.join(', ')}`}
          content={message}
          onInteraction={onErrorClose(i)}
        />
      ))}
      {hasDataError && (
        <div
          id="error-submission-workspace"
          css={css`
            margin-top: 20px;
          `}
        >
          <ErrorNotification
            level={NOTIFICATION_VARIANTS.ERROR}
            title={`${allDataErrors.length.toLocaleString()} error(s) found in submission workspace`}
            subtitle="Your submission cannot yet be signed off. Please correct the following errors and reupload the corresponding files."
            reportData={allDataErrors.map(toDisplayError)}
            reportColumns={errorReportColumns}
            tableComponent={ErrorTable}
          />
        </div>
      )}
      {hasDataWarning && (
        <div
          id="warning-submission-workspace"
          css={css`
            margin-top: 20px;
          `}
        >
          <ErrorNotification
            level={NOTIFICATION_VARIANTS.WARNING}
            title={`${allDataWarnings.length.toLocaleString()} warning(s) found in submission workspace`}
            subtitle="Your submission has the following warnings, check them to make sure the changes are as intended."
            reportData={allDataWarnings.map(toDisplayError)}
            reportColumns={warningReportColumns}
            tableComponent={WarningTable}
          />
        </div>
      )}
      <Container
        css={css`
          ${containerStyle}
          min-height: 100px;
          position: relative;
          padding: 0px;
          min-height: 350px;
          display: flex;
          flex: 1;
        `}
      >
        {loadingClinicalSubmission ? (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            `}
          >
            <DnaLoader />
          </div>
        ) : (
          <FilesNavigator
            submissionState={data.clinicalSubmissions.state}
            clearDataError={handleClearSchemaError}
            fileStates={fileNavigatorFiles}
            selectedClinicalEntityType={selectedClinicalEntityType || tabFromData}
            onFileSelect={setSelectedClinicalEntityType}
            submissionVersion={data.clinicalSubmissions.version}
            programShortName={programShortName}
          />
        )}
      </Container>
    </div>
  );
};

export default PageContent;
