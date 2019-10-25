import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { ClinicalSubmissionEntityFile, ClinicalSubmissionQueryData } from '../types';
import FileRecordTable from './FileRecordTable';
import { Col } from 'react-grid-system';
import { useToaster } from 'global/hooks/toaster';
import NoData from 'uikit/NoData';
import ErrorNotification from '../ErrorNotification';
import Button from 'uikit/Button';
import noDataSvg from 'static/illustration_heart.svg';
import orderBy from 'lodash/orderBy';
import head from 'lodash/head';

export default ({
  fileStates,
  clearDataError,
  submissionState,
  selectedFileIndex,
  onFileSelect,
}: {
  submissionState: ClinicalSubmissionQueryData['clinicalSubmissions']['state'];
  fileStates: Array<ClinicalSubmissionEntityFile>;
  clearDataError: (file: ClinicalSubmissionEntityFile) => Promise<any>;
  selectedFileIndex: number;
  onFileSelect: (i: number) => void;
}) => {
  const isPendingApproval = submissionState === 'PENDING_APPROVAL';
  const toaster = useToaster();
  const onFileClick = (clinicalType: string) => e => {
    onFileSelect(fileStates.findIndex(file => clinicalType === file.clinicalType));
  };
  const selectedFile = fileStates[selectedFileIndex];
  const onClearClick = () => {
    toaster.addToast({
      title: 'DUMMY',
      content: "I'm just a dummy placeholder behaviour",
    });
  };
  const onErrorClearClick = () => {
    clearDataError(selectedFile);
  };
  const shouldShowError = !!selectedFile && !!selectedFile.schemaErrors.length;
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
                <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
              )}
            </VerticalTabs.Item>
          ))}
        </VerticalTabs>
      </div>
      <Col style={{ position: 'relative' }}>
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
              errors={selectedFile.schemaErrors}
              subtitle={
                'Your file cannot be processed. Please correct the following errors and reupload your file.'
              }
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
                <Button variant="text" size="sm" onClick={onClearClick}>
                  clear
                </Button>
              )}
            </div>
            <FileRecordTable
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
          <NoData
            title="You do not have any data uploaded."
            subtitle="Follow the instructions above to get started."
          >
            <img alt="no data found" src={noDataSvg} />
          </NoData>
        )}
      </Col>
    </div>
  );
};
