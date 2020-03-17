import * as React from 'react';
import { css } from 'uikit';
import { usePageQuery } from 'global/hooks/usePageContext';
import Instruction from './Instruction';
import Container from 'uikit/Container';
import { containerStyle } from '../common';
import FilesNavigator from './FilesNavigator';
import {
  ClinicalSubmissionEntityFile,
  GqlClinicalEntity,
  ClinicalSubmissionQueryData,
  ValidateSubmissionMutationVariables,
  UploadFilesMutationVariables,
  SignOffSubmissionMutationVariables,
  ClinicalSubmissionError,
} from './types';
import Notification from 'uikit/notifications/Notification';
import UPLOAD_CLINICAL_SUBMISSION from './gql/UPLOAD_CLINICAL_SUBMISSION.gql';
import VALIDATE_SUBMISSION_MUTATION from './gql/VALIDATE_SUBMISSION_MUTATION.gql';
import SIGN_OFF_SUBMISSION_MUTATION from './gql/SIGN_OFF_SUBMISSION_MUTATION.gql';
import { useMutation } from '@apollo/react-hooks';
import DnaLoader from 'uikit/DnaLoader';
import { displayDateAndTime } from 'global/utils/common';
import { capitalize } from 'global/utils/stringUtils';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification, { defaultColumns } from '../ErrorNotification';
import { ModalPortal, useGlobalLoadingState } from 'components/ApplicationRoot';
import SignOffValidationModal from './SignOffValidationModal';
import SubmissionSummaryTable from './SubmissionSummaryTable';
import useUserConfirmationModalState from './useUserConfirmationModalState';
import Typography from 'uikit/Typography';
import { sleep } from 'global/utils/common';
import Router from 'next/router';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import orderBy from 'lodash/orderBy';
import head from 'lodash/head';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import useCommonToasters from 'components/useCommonToasters';
import { useClinicalSubmissionQuery } from '.';
import useUrlParamState from 'global/hooks/useUrlParamState';
import { toDisplayError } from 'global/utils/clinicalUtils';
import { SchemaInvalidSubmissionNotification } from '../SchemaInvalidSubmissionNotification';
import {
  SubmissionSystemLockedNotification,
  useSubmissionSystemDisabled,
} from '../SubmissionSystemLockedNotification';

const gqlClinicalEntityToClinicalSubmissionEntityFile = (
  submissionState: ClinicalSubmissionQueryData['clinicalSubmissions']['state'],
) => (gqlFile: GqlClinicalEntity): ClinicalSubmissionEntityFile => {
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

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { setLoading: setPageLoaderShown } = useGlobalLoadingState();
  const [currentFileList, setCurrentFileList] = React.useState<{
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

  const {
    data,
    loading: loadingClinicalSubmission,
    updateQuery: updateClinicalSubmissionQuery,
    refetch,
  } = useClinicalSubmissionQuery(programShortName, {
    onCompleted: () => {
      setSelectedClinicalEntityType(defaultClinicalEntityType);
    },
  });

  const fileNavigatorFiles = map(
    orderBy(data.clinicalSubmissions.clinicalEntities, e => e.clinicalType),
    gqlClinicalEntityToClinicalSubmissionEntityFile(data.clinicalSubmissions.state),
  );

  const defaultClinicalEntityType = React.useMemo((): string | null => {
    const fileToClinicalEntityType = (file: File): string =>
      data.clinicalSubmissions.clinicalEntities
        .map(e => e.clinicalType)
        .find(entityType => !!file.name.match(new RegExp(`^${entityType}.*\\.tsv`)));
    const lastUploadedEntityTypes =
      currentFileList.shortName === programShortName
        ? uniq(map(currentFileList.fileList, fileToClinicalEntityType))
        : [];

    const fileToFocusOn = head(
      orderBy(fileNavigatorFiles, file => {
        const wereFilesUploaded = lastUploadedEntityTypes.length > 0;
        const applyPriorityRule = wereFilesUploaded
          ? lastUploadedEntityTypes.includes(file.clinicalType)
          : true;
        switch (file.status) {
          case 'ERROR':
            return applyPriorityRule ? 0 : fileNavigatorFiles.length;
          case 'UPDATE':
            return applyPriorityRule ? 1 : fileNavigatorFiles.length;
          case 'WARNING':
            return applyPriorityRule ? 2 : fileNavigatorFiles.length;
          case 'SUCCESS':
            return applyPriorityRule ? 3 : fileNavigatorFiles.length;
          case 'NONE':
            return fileNavigatorFiles.length;
          default:
            return fileNavigatorFiles.length;
        }
      }),
    );
    return fileNavigatorFiles.length ? fileToFocusOn.clinicalType : null;
  }, [data]);

  const [selectedClinicalEntityType, setSelectedClinicalEntityType] = useUrlParamState(
    'tab',
    defaultClinicalEntityType,
    {
      serialize: v => v,
      deSerialize: v => v,
    },
  );

  const [uploadClinicalSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    UploadFilesMutationVariables
  >(UPLOAD_CLINICAL_SUBMISSION, {
    onCompleted: () => {
      setSelectedClinicalEntityType(defaultClinicalEntityType);
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

  const allDataErrors = React.useMemo(
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
          ...entity.dataErrors.map(err => ({
            ...err,
            fileName: entity.batchName,
          })),
        ],
        [],
      ),
    [data],
  );

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
    clinicalEntity => !!clinicalEntity.dataUpdates.length,
  );
  const isValidated = data.clinicalSubmissions.state !== 'OPEN';

  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const onErrorClose: (
    index: number,
  ) => React.ComponentProps<typeof Notification>['onInteraction'] = index => ({ type }) => {
    if (type === 'CLOSE') {
      updateClinicalSubmissionQuery(previous => ({
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

  const handleClearSchemaError: React.ComponentProps<
    typeof FilesNavigator
  >['clearDataError'] = async file => {
    await updateClinicalSubmissionQuery(previous => ({
      ...previous,
      clinicalSubmissions: {
        ...previous.clinicalSubmissions,
        clinicalEntities: previous.clinicalSubmissions.clinicalEntities.map(entity => ({
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
        setPageLoaderShown(true);
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
            content: 'Your clinical data has been submitted.',
          });
        } else {
          setPageLoaderShown(false);
        }
      }
    } catch (err) {
      await refetch();
      commonToaster.unknownErrorWithReloadMessage();
      setPageLoaderShown(false);
    }
  };

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
              !isSubmissionSystemDisabled && (isReadyForValidation && !hasDataError && !isValidated)
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
          title={`${fileNames.length} of ${
            (currentFileList.fileList || []).length
          } files failed to upload: ${fileNames.join(', ')}`}
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
            title={`${allDataErrors.length} error(s) found in submission workspace`}
            subtitle="Your submission cannot yet be signed off. Please correct the following errors and reupload the corresponding files."
            errors={allDataErrors.map(toDisplayError)}
            columnConfig={[
              {
                accessor: 'fileName',
                Header: 'File',
                maxWidth: 150,
              },
              ...defaultColumns,
            ]}
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
            selectedClinicalEntityType={selectedClinicalEntityType}
            onFileSelect={setSelectedClinicalEntityType}
            submissionVersion={data.clinicalSubmissions.version}
            programShortName={programShortName}
          />
        )}
      </Container>
    </div>
  );
};
