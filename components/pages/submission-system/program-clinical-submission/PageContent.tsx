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
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import UPLOAD_CLINICAL_SUBMISSION from './gql/UPLOAD_CLINICAL_SUBMISSION.gql';
import VALIDATE_SUBMISSION_MUTATION from './gql/VALIDATE_SUBMISSION_MUTATION.gql';
import SIGN_OFF_SUBMISSION_MUTATION from './gql/SIGN_OFF_SUBMISSION_MUTATION.gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DnaLoader from 'uikit/DnaLoader';
import { displayDateAndTime, insertAt } from 'global/utils/common';
import { capitalize } from 'global/utils/stringUtils';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification, { defaultColumns } from '../ErrorNotification';
import { ModalPortal } from 'components/ApplicationRoot';
import SignOffValidationModal from './SignOffValidationModal';
import SubmissionSummaryTable from './SubmissionSummaryTable';
import useUserConfirmationModalState from './useUserConfirmationModalState';
import Typography from 'uikit/Typography';
import { sleep } from 'global/utils/common';
import { useRouter } from 'next/router';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import orderBy from 'lodash/orderBy';
import head from 'lodash/head';
import map from 'lodash/map';
import memoize from 'lodash/memoize';
import uniq from 'lodash/uniq';
import useCommonToasters from 'components/useCommonToasters';
import { useClinicalSubmissionQuery } from '.';
import { number } from 'yup';
import useUrlParamState from 'global/hooks/useUrlParamState';

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
      : !!gqlFile.records && isSubmissionValidated
      ? 'SUCCESS'
      : 'WARNING',
  };
};

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [pageLoaderShown, setPageLoaderShown] = React.useState<boolean>(false);
  const router = useRouter();
  const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);
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
      setSelectedClinicalEntityType(selectedClinicalEntityType || defaultClinicalEntityIndex);
    },
  });

  const fileNavigatorFiles = map(
    orderBy(data.clinicalSubmissions.clinicalEntities, e => e.clinicalType),
    gqlClinicalEntityToClinicalSubmissionEntityFile(data.clinicalSubmissions.state),
  );

  const defaultClinicalEntityIndex = React.useMemo((): string | null => {
    const fileToClinicalEntityType = (file: File): string =>
      data.clinicalSubmissions.clinicalEntities
        .map(e => e.clinicalType)
        .find(entityType => !!file.name.match(new RegExp(`^${entityType}.*\\.tsv`)));
    const lastUploadedEntityTypes = uniq(map(currentFileList, fileToClinicalEntityType));
    const fileToFocusOn = head(
      orderBy(fileNavigatorFiles, file => {
        const wasLastUploaded = lastUploadedEntityTypes.includes(file.clinicalType);
        switch (file.status) {
          case 'ERROR':
            return wasLastUploaded ? 0 : fileNavigatorFiles.length;
          case 'UPDATE':
            return wasLastUploaded ? 1 : fileNavigatorFiles.length;
          case 'WARNING':
            return wasLastUploaded ? 2 : fileNavigatorFiles.length;
          case 'SUCCESS':
            return wasLastUploaded ? 3 : fileNavigatorFiles.length;
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
    defaultClinicalEntityIndex,
  );

  const [uploadClinicalSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    UploadFilesMutationVariables
  >(UPLOAD_CLINICAL_SUBMISSION, {
    onCompleted: () => {
      setSelectedClinicalEntityType(defaultClinicalEntityIndex);
    },
  });
  const [validateSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ValidateSubmissionMutationVariables
  >(VALIDATE_SUBMISSION_MUTATION);
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
  const hasSchemaError =
    !!data.clinicalSubmissions.clinicalEntities.length &&
    data.clinicalSubmissions.clinicalEntities.some(({ schemaErrors }) => !!schemaErrors.length);
  const hasSomeEntity = data.clinicalSubmissions.clinicalEntities.some(
    ({ records }) => !!records.length,
  );
  const isReadyForValidation = hasSomeEntity && !hasSchemaError;
  const isReadyForSignoff = isReadyForValidation && data.clinicalSubmissions.state === 'VALID';
  const isPendingApproval = data.clinicalSubmissions.state === 'PENDING_APPROVAL';
  const hasUpdate = data.clinicalSubmissions.clinicalEntities.some(
    clinicalEntity => !!clinicalEntity.dataUpdates.length,
  );
  const isValidated = data.clinicalSubmissions.state !== 'OPEN';

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
    setCurrentFileList(files);
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
          router.push(PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, programShortName));
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
      {pageLoaderShown && (
        <ModalPortal>
          <DnaLoader />
        </ModalPortal>
      )}
      {!isPendingApproval && !loadingClinicalSubmission && (
        <Container css={containerStyle}>
          <Instruction
            uploadEnabled
            signOffEnabled={isReadyForSignoff}
            validationEnabled={isReadyForValidation && !hasDataError && !isValidated}
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
      {data.clinicalSubmissions.fileErrors.map(({ fileNames, msg }, i) => (
        <Notification
          key={i}
          css={css`
            margin-top: 20px;
          `}
          size="SM"
          variant="ERROR"
          interactionType="CLOSE"
          title={`${fileNames.length} of ${
            (currentFileList || []).length
          } files failed to upload: ${fileNames.join(', ')}`}
          content={msg}
          onInteraction={onErrorClose(i)}
        />
      ))}
      {hasDataError && (
        <div
          css={css`
            margin-top: 20px;
          `}
        >
          <ErrorNotification
            onClearClick={handleDataErrorClearance}
            title={`${allDataErrors.length} errors found in submission workspace`}
            subtitle="Your submission cannot yet be signed off and sent to DCC. Please correct the following errors and reupload the corresponding files."
            errors={allDataErrors}
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
