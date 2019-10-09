import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { ClinicalSubmissionEntityFile } from '../types';
import FileRecordTable from './FileRecordTable';
import { Col } from 'react-grid-system';
import { useToaster } from 'global/hooks/toaster';
import NoData from 'uikit/NoData';
import ErrorNotification from '../ErrorNotification';
import Button from 'uikit/Button';

export default ({
  fileStates,
  clearDataError,
}: {
  fileStates: Array<ClinicalSubmissionEntityFile>;
  clearDataError: (file: ClinicalSubmissionEntityFile) => Promise<any>;
}) => {
  const toaster = useToaster();
  const [selectedFileIndex, setSelectedFileIndex] = React.useState<number>(0);
  const onFileClick = (clinicalType: string) => e => {
    setSelectedFileIndex(fileStates.findIndex(file => clinicalType === file.clinicalType));
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
    <NoData />
  ) : (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      <div
        css={css`
          width: 170px;
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
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    text-align: left;
                  `}
                >
                  {fileState.displayName}
                </div>
                {fileState.status !== 'NONE' && fileState.status !== 'ERROR' && (
                  <VerticalTabs.Tag variant={fileState.status}>
                    {fileState.recordsCount}
                  </VerticalTabs.Tag>
                )}
                {fileState.status === 'ERROR' && (
                  <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
                )}
              </div>
            </VerticalTabs.Item>
          ))}
        </VerticalTabs>
      </div>
      <Col>
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
              `}
            >
              <Typography
                variant="subtitle"
                color="primary"
                as="div"
                css={css`
                  margin-left: 10px;
                `}
              >
                {selectedFile.displayName} File Preview
              </Typography>
              <Button variant="text" size="sm" onClick={onClearClick}>
                clear
              </Button>
            </div>
            <FileRecordTable
              file={selectedFile}
              submissionData={{
                fileName: 'some file',
                creator: 'Someone',
                createdAt: 'sometime',
              }}
            />
          </>
        ) : (
          <NoData />
        )}
      </Col>
    </div>
  );
};
