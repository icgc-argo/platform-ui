import * as React from 'react';
import SubmissionLayout from '../layout';
import { css, styled } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { usePageQuery } from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
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
} from './types';
import Notification from 'uikit/notifications/Notification';
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import UPLOAD_CLINICAL_SUBMISSION from './gql/UPLOAD_CLINICAL_SUBMISSION.gql';
import VALIDATE_SUBMISSION_MUTATION from './gql/VALIDATE_SUBMISSION_MUTATION.gql';
import SIGN_OFF_SUBMISSION_MUTATION from './gql/SIGN_OFF_SUBMISSION_MUTATION.gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DnaLoader from 'uikit/DnaLoader';
import { displayDateAndTime } from 'global/utils/common';
import { capitalize } from 'global/utils/stringUtils';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification from './ErrorNotification';
import { ModalPortal } from 'components/ApplicationRoot';
import SignOffValidationModal, { useSignOffValidationModalState } from './SignOffValidationModal';
import SubmissionSummaryTable from './SubmissionSummaryTable';
import Typography from 'uikit/Typography';
import { ContentHeader } from 'uikit/PageLayout';
import { useTheme } from 'uikit/ThemeProvider';
import { sleep } from 'global/utils/common';
import { useRouter } from 'next/router';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';

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

export default function ProgramClinicalSubmission() {
  const theme = useTheme();
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [pageLoaderShown, setPageLoaderShown] = React.useState<boolean>(false);
  const router = useRouter();
  const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);
  const {
    signOffModalShown,
    getUserApproval,
    onApprove: onSignOffApproved,
    onCancel: onSignOffCanceled,
  } = useSignOffValidationModalState();
  const toaster = useToaster();

  const placeHolderResponse: ClinicalSubmissionQueryData = {
    clinicalSubmissions: {
      version: '',
      clinicalEntities: [],
      fileErrors: [],
      id: '',
      state: 'OPEN',
      updatedAt: '',
      updatedBy: '',
      __typename: 'ClinicalSubmissionData',
    },
  };

  const {
    data = placeHolderResponse,
    loading: loadingClinicalSubmission,
    updateQuery: updateClinicalSubmissionQuery,
    refetch,
  } = useQuery<ClinicalSubmissionQueryData>(CLINICAL_SUBMISSION_QUERY, {
    variables: {
      programShortName,
    },
  });

  const [uploadClinicalSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    UploadFilesMutationVariables
  >(UPLOAD_CLINICAL_SUBMISSION);
  const [validateSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ValidateSubmissionMutationVariables
  >(VALIDATE_SUBMISSION_MUTATION);
  const [signOffSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    SignOffSubmissionMutationVariables
  >(SIGN_OFF_SUBMISSION_MUTATION);

  const allDataErrors = data.clinicalSubmissions.clinicalEntities.reduce<
    React.ComponentProps<typeof ErrorNotification>['errors']
  >(
    (acc, entity) => [
      ...acc,
      ...entity.dataErrors.map(err => ({
        ...err,
        fileName: entity.batchName,
      })),
    ],
    [],
  );

  const hasDataError = !!allDataErrors.length;
  const hasSchemaError =
    !!data.clinicalSubmissions.clinicalEntities.length &&
    data.clinicalSubmissions.clinicalEntities.some(({ schemaErrors }) => !!schemaErrors.length);
  const hasSomeEntity = data.clinicalSubmissions.clinicalEntities.some(
    ({ records }) => !!records.length,
  );
  const hasFileError = !!data.clinicalSubmissions.fileErrors.length;
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
      showReloadToast();
    }
  };

  const handleSignOff = async () => {
    try {
      const userDidApprove = await getUserApproval();
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
      showReloadToast();
      setPageLoaderShown(false);
    }
  };

  return (
    <>
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
      <SubmissionLayout
        ContentHeaderComponent={styled(ContentHeader)`
          background: ${isPendingApproval ? theme.colors.accent3_4 : theme.colors.white};
        `}
        contentHeader={
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            `}
          >
            <TitleBar>
              <>{programShortName}</>
              <Row nogutter align="center">
                <div
                  css={css`
                    margin-right: 20px;
                  `}
                >
                  Submit Clinical Data
                </div>
                {!loadingClinicalSubmission && (
                  <Progress>
                    <Progress.Item
                      text="Upload"
                      state={
                        isReadyForValidation ? 'success' : hasSchemaError ? 'error' : 'disabled'
                      }
                    />
                    <Progress.Item
                      text="Validate"
                      state={
                        isReadyForSignoff || isPendingApproval
                          ? 'success'
                          : isReadyForValidation
                          ? hasDataError
                            ? 'error'
                            : 'pending'
                          : 'disabled'
                      }
                    />
                    <Progress.Item
                      text="Sign Off"
                      state={
                        isReadyForSignoff ? 'pending' : isPendingApproval ? 'success' : 'disabled'
                      }
                    />
                    {isPendingApproval && (
                      <Progress.Item
                        css={css`
                          width: 100px;
                        `}
                        text="Pending Approval"
                        state="locked"
                      />
                    )}
                  </Progress>
                )}
              </Row>
            </TitleBar>
            <Row nogutter align="center">
              {!isPendingApproval && (
                <Button
                  variant="text"
                  disabled
                  css={css`
                    margin-right: 10px;
                  `}
                >
                  Clear submission
                </Button>
              )}
              <Link
                bold
                withChevron
                uppercase
                underline={false}
                css={css`
                  font-size: 14px;
                `}
              >
                HELP
              </Link>
            </Row>
          </div>
        }
      >
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
              showClinicalType
              onClearClick={handleDataErrorClearance}
              title={`${allDataErrors.length} errors found in submission workspace`}
              subtitle="Your submission cannot yet be signed off and sent to DCC. Please correct the following errors and reupload the corresponding files."
              errors={allDataErrors}
            />
          </div>
        )}
        <Container
          css={css`
            ${containerStyle}
            min-height: 100px;
            position: relative;
            padding: 0px;
            min-height: calc(100vh - 240px);
            display: flex;
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
              clearDataError={async file => {
                await updateClinicalSubmissionQuery(previous => ({
                  ...previous,
                  clinicalSubmissions: {
                    ...previous.clinicalSubmissions,
                    clinicalEntities: previous.clinicalSubmissions.clinicalEntities.map(entity => ({
                      ...entity,
                      schemaErrors:
                        file.clinicalType === entity.clinicalType ? [] : entity.schemaErrors,
                    })),
                  },
                }));
              }}
              fileStates={data.clinicalSubmissions.clinicalEntities.map(
                gqlClinicalEntityToClinicalSubmissionEntityFile(data.clinicalSubmissions.state),
              )}
            />
          )}
        </Container>
      </SubmissionLayout>
    </>
  );
}
