import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
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
  ClinicalError,
  ClinicalSubmissionEntityFile,
  GqlClinicalEntity,
  ClinicalSubmissionQueryData,
  ValidateSubmissionMutationVariables,
  UploadFilesMutationVariables,
  ApproveSubmissionMutationVariables,
} from './types';
import Notification from 'uikit/notifications/Notification';
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import UPLOAD_CLINICAL_SUBMISSION from './gql/UPLOAD_CLINICAL_SUBMISSION.gql';
import VALIDATE_SUBMISSION_MUTATION from './gql/VALIDATE_SUBMISSION_MUTATION.gql';
import APPROVE_SUBMISSION_MUTATION from './gql/APPROVE_SUBMISSION_MUTATION.gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DnaLoader from 'uikit/DnaLoader';
import { capitalize } from 'global/utils/stringUtils';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification from './ErrorNotification';
import { ModalPortal } from 'components/ApplicationRoot';
import SignOffValidationModal, { useSignOffValidationModalState } from './SignOffValidationModal';

const gqlClinicalEntityToClinicalSubmissionEntityFile = (
  data: GqlClinicalEntity,
): ClinicalSubmissionEntityFile => {
  return {
    createdAt: data.createdAt,
    creator: data.creator,
    fileName: data.batchName,
    schemaErrors: data.schemaErrors,
    dataErrors: data.dataErrors,
    dataUpdates: data.dataUpdates,
    displayName: capitalize((data.clinicalType || '').split('_').join(' ')),
    clinicalType: data.clinicalType,
    records: data.records,
    recordsCount: data.records.length,
    status: !!data.dataErrors.length ? 'ERROR' : !!data.dataUpdates.length ? 'SUCCESS' : 'WARNING',
  };
};

const useClinicalErrorState = (data: ClinicalSubmissionQueryData) => {
  const [clinicalErrors, setClinicalErrors] = React.useState<ClinicalError[]>([]);
  React.useEffect(() => {
    setClinicalErrors(data.clinicalSubmissions.fileErrors);
  }, [data.clinicalSubmissions.fileErrors]);
  return {
    clinicalErrors,
    removeClinicalErrorWithCode: (_code: string) =>
      setClinicalErrors(clinicalErrors.filter(({ code }) => code !== _code)),
  };
};

export default function ProgramClinicalSubmission() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);
  const [mutationDisabled, setMutationDisabled] = React.useState(false);
  const {
    signOffModalShown,
    getUserApproval,
    onApprove: onSignOffApproved,
    onCancel: onSignOffCanceled,
  } = useSignOffValidationModalState();
  const toaster = useToaster();

  const placeHolderResponse: ClinicalSubmissionQueryData = {
    clinicalSubmissions: {
      version: null,
      clinicalEntities: [],
      fileErrors: [],
      id: '',
      state: 'OPEN',
      __typename: 'ClinicalSubmissionData',
    },
  };

  const {
    data = placeHolderResponse,
    loading: loadingClinicalSubmission,
    updateQuery: updateClinicalSubmissionQuery,
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
  const [approveSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ApproveSubmissionMutationVariables
  >(APPROVE_SUBMISSION_MUTATION);

  const { clinicalErrors, removeClinicalErrorWithCode } = useClinicalErrorState(data);

  const allDataErrors = data.clinicalSubmissions.clinicalEntities.reduce<
    React.ComponentProps<typeof ErrorNotification>['errors']
  >(
    (acc, entity) => [
      ...acc,
      ...entity.dataErrors.map(err => ({
        ...err,
        clinicalType: entity.clinicalType,
      })),
    ],
    [],
  );

  const hasDataError = !!allDataErrors.length;
  const hasSchemaError =
    !!data.clinicalSubmissions.clinicalEntities.length &&
    data.clinicalSubmissions.clinicalEntities.some(({ schemaErrors }) => !!schemaErrors.length);
  const hasSomeEntity = !!data.clinicalSubmissions.clinicalEntities.some(
    ({ records }) => !!records.length,
  );
  const hasFileError = !!data.clinicalSubmissions.fileErrors.length;
  const isReadyForValidation = hasSomeEntity && !hasSchemaError;
  const isReadyForSignoff = isReadyForValidation && data.clinicalSubmissions.state === 'VALID';

  const onErrorClose: (
    code: string,
  ) => React.ComponentProps<typeof Notification>['onInteraction'] = code => ({ type }) => {
    if (type === 'CLOSE') {
      removeClinicalErrorWithCode(code);
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

  const handleSubmissionValidation = async () => {
    try {
      await validateSubmission({
        variables: {
          programShortName,
          submissionVersion: data.clinicalSubmissions.version,
        },
      });
    } catch (err) {
      toaster.addToast({
        title: 'We could not validate your submission',
        content:
          'Someone else might be working on the same submission. Please refresh your browser to see the latest version of this submission. \nIf the issue continues, please contact us.',
        variant: 'ERROR',
        timeout: Infinity,
      });
      setMutationDisabled(true);
    }
  };

  const handleSignOff = async () => {
    try {
      await getUserApproval()
        .then(
          (): Promise<any> =>
            approveSubmission({
              variables: {
                programShortName,
                submissionVersion: data.clinicalSubmissions.version,
              },
            }),
        )
        .catch(() => {
          console.log('sign off canceled');
        });
    } catch (err) {
      toaster.addToast({
        title: 'Your submission could not be signed off on',
        content:
          'Someone else might be working on the same submission. Please refresh your browser to see the latest version of this submission. \nIf the issue continues, please contact us.',
        variant: 'ERROR',
        timeout: Infinity,
      });
      setMutationDisabled(true);
    }
  };

  return (
    <>
      {signOffModalShown && (
        <ModalPortal>
          <SignOffValidationModal
            clinicalSubmissions={data.clinicalSubmissions}
            onActionClick={onSignOffApproved}
            onCloseClick={onSignOffCanceled}
            onCancelClick={onSignOffCanceled}
          />
        </ModalPortal>
      )}
      <SubmissionLayout
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
                        isReadyForSignoff
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
                      state={isReadyForSignoff ? 'pending' : 'disabled'}
                    />
                  </Progress>
                )}
              </Row>
            </TitleBar>
            <Row nogutter align="center">
              <Button
                variant="text"
                disabled
                css={css`
                  margin-right: 10px;
                `}
              >
                Clear submission
              </Button>
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
        <Container css={containerStyle}>
          <Instruction
            signOffEnabled={isReadyForSignoff && !mutationDisabled}
            validationEnabled={isReadyForValidation && !hasDataError && !mutationDisabled}
            uploadEnabled={!mutationDisabled}
            onUploadFileSelect={handleSubmissionFilesUpload}
            onValidateClick={handleSubmissionValidation}
            onSignOffClick={handleSignOff}
          />
        </Container>
        {clinicalErrors.map(({ code, fileNames, msg }) => (
          <Notification
            key={code}
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
            onInteraction={onErrorClose(code)}
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
              clearDataError={async file => {
                await updateClinicalSubmissionQuery(previous => ({
                  ...previous,
                  clinicalSubmissions: {
                    ...previous.clinicalSubmissions,
                    clinicalEntities: previous.clinicalSubmissions.clinicalEntities.map(entity => ({
                      ...entity,
                      dataErrors:
                        file.clinicalType === entity.clinicalType ? [] : entity.dataErrors,
                    })),
                  },
                }));
              }}
              fileStates={data.clinicalSubmissions.clinicalEntities.map(
                gqlClinicalEntityToClinicalSubmissionEntityFile,
              )}
            />
          )}
        </Container>
      </SubmissionLayout>
    </>
  );
}
