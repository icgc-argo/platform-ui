import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { ClinicalSubmissionEntityFile, ClinicalSubmissionQueryData } from '../types';
import FileRecordTable from './FileRecordTable';
import { Col } from 'react-grid-system';
import { useToaster } from 'global/hooks/toaster';
import NoData from 'uikit/NoData';
import ErrorNotification, { defaultColumns } from '../../ErrorNotification';
import Button from 'uikit/Button';
import noDataSvg from 'static/illustration_heart.svg';
import Icon from 'uikit/Icon';
import CLEAR_SUBMISSION_MUTATION from '../gql/CLEAR_SUBMISSION_MUTATION.gql';
import { useMutation } from '@apollo/react-hooks';
import { ClearSubmissionMutationVariables } from '../types';
import useCommonToasters from 'components/useCommonToasters';
import { useClinicalSubmissionQuery } from '..';
import { toDisplayError } from 'global/utils/clinicalUtils';
import { useSubmissionSystemDisabled } from '../../SubmissionSystemLockedNotification';

export default ({
  fileStates,
  clearDataError,
  submissionState,
  selectedClinicalEntityType,
  onFileSelect,
  programShortName,
  submissionVersion,
}: {
  submissionState: ClinicalSubmissionQueryData['clinicalSubmissions']['state'];
  fileStates: Array<ClinicalSubmissionEntityFile>;
  clearDataError: (file: ClinicalSubmissionEntityFile) => Promise<any>;
  selectedClinicalEntityType: string;
  onFileSelect: (clinicalEntityType: string) => void;
  submissionVersion: ClinicalSubmissionQueryData['clinicalSubmissions']['version'];
  programShortName: ClinicalSubmissionQueryData['clinicalSubmissions']['programShortName'];
}) => {
  const commonToaster = useCommonToasters();
  const [clearClinicalEntitySubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ClearSubmissionMutationVariables
  >(CLEAR_SUBMISSION_MUTATION);

  const { refetch: refetchClinicalSubmission } = useClinicalSubmissionQuery(programShortName);
  const isPendingApproval = submissionState === 'PENDING_APPROVAL';
  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const toaster = useToaster();
  const onFileClick = (clinicalType: string) => e => {
    onFileSelect(fileStates.find(file => clinicalType === file.clinicalType).clinicalType);
  };
  const selectedFile = fileStates.find(file => file.clinicalType === selectedClinicalEntityType);
  const onClearClick = (clinicalType: string) => async e => {
    const fileType: string = fileStates.find(file => clinicalType === file.clinicalType)
      .clinicalType;

    try {
      await clearClinicalEntitySubmission({
        variables: {
          programShortName,
          submissionVersion,
          fileType,
        },
      });
      toaster.addToast({
        variant: 'SUCCESS',
        interactionType: 'CLOSE',
        title: 'Cleared',
        content: `Uploaded ${fileType.toUpperCase()} file has been cleared.`,
      });
    } catch (err) {
      await refetchClinicalSubmission();
      commonToaster.unknownErrorWithReloadMessage();
    }
  };
  const onErrorClearClick = () => {
    clearDataError(selectedFile);
  };
  const shouldShowError = !!selectedFile && !!selectedFile.schemaErrors.length;

  const isSubmissionValidated = ([
    'INVALID',
    'VALID',
    'PENDING_APPROVAL',
  ] as typeof submissionState[]).includes(submissionState);
  return !selectedFile ? (
    <NoData
      css={css`
        width: 100%;
      `}
    />
  ) : (
    <div
      css={css`
        position: relative;
        width: 100%;
        display: flex;
      `}
    >
      <div
        css={css`
          width: 170px;
          max-width: 170px;
          min-width: 170px;
          overflow: visible;
        `}
      >
        <VerticalTabs
          css={css`
            height: 100%;
          `}
        >
          {fileStates.map(fileState => (
            <VerticalTabs.Item
              key={fileState.clinicalType}
              active={selectedFile.clinicalType === fileState.clinicalType}
              onClick={onFileClick(fileState.clinicalType)}
            >
              <div
                css={css`
                  text-align: left;
                `}
              >
                {fileState.displayName}
              </div>
              {!!fileState.recordsCount &&
                (fileState.status !== 'NONE' && fileState.status !== 'ERROR' && (
                  <VerticalTabs.Tag variant={fileState.status}>
                    {fileState.recordsCount}
                  </VerticalTabs.Tag>
                ))}
              {fileState.status === 'ERROR' && (
                <VerticalTabs.Tag variant="ERROR">
                  <Icon name="exclamation" fill="#fff" height="10px" width="10px" />
                </VerticalTabs.Tag>
              )}
            </VerticalTabs.Item>
          ))}
        </VerticalTabs>
      </div>
      <Col style={{ position: 'relative', overflow: 'hidden' }}>
        {shouldShowError ? (
          <div
            css={css`
              padding: 16px;
            `}
          >
            <ErrorNotification
              onClearClick={onErrorClearClick}
              title={`${
                selectedFile.schemaErrors.length
              } errors found in uploaded ${selectedFile.displayName.toLowerCase()} file`}
              errors={selectedFile.schemaErrors.map(toDisplayError)}
              subtitle={
                'Your file cannot be processed. Please correct the following errors and reupload your file.'
              }
              columnConfig={defaultColumns}
            />
          </div>
        ) : !!selectedFile.records.length ? (
          <>
            <div
              css={css`
                padding: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Typography
                variant="subtitle2"
                color="primary"
                as="h2"
                css={css`
                  margin: 0px;
                  margin-left: 10px;
                `}
              >
                {selectedFile.displayName} File Preview
              </Typography>
              {!isPendingApproval && (
                <Button
                  id="button-clear-selected-file" // For Selenium
                  variant="text"
                  size="sm"
                  onClick={onClearClick(selectedFile.clinicalType)}
                  disabled={isSubmissionSystemDisabled}
                >
                  clear
                </Button>
              )}
            </div>
            <FileRecordTable
              isSubmissionValidated={isSubmissionValidated}
              isPendingApproval={isPendingApproval}
              file={selectedFile}
              submissionData={{
                fileName: selectedFile.fileName,
                creator: selectedFile.creator,
                createdAt: selectedFile.createdAt,
              }}
            />
          </>
        ) : (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            `}
          >
            <NoData
              title="You do not have any data uploaded."
              subtitle="Follow the instructions above to get started."
            >
              <img alt="no data found" src={noDataSvg} />
            </NoData>
          </div>
        )}
      </Col>
    </div>
  );
};
