import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { ClinicalSubmissionEntityFile } from '../types';
import FileRecordTable from './FileRecordTable';
import { Col } from 'react-grid-system';
import { useToaster } from 'global/hooks/toaster';

export default ({ fileStates }: { fileStates: Array<ClinicalSubmissionEntityFile> }) => {
  const toaster = useToaster();
  const [selectedFileIndex, setSelectedFileIndex] = React.useState<number>(0);
  const onFileClick = (fileId: string) => e => {
    setSelectedFileIndex(fileStates.findIndex(file => fileId === file.id));
  };
  const selectedFile = fileStates[selectedFileIndex];
  const onClearClick = () => {
    toaster.addToast({
      title: 'DUMMY',
      content: "I'm just a dummy placeholder behaviour",
    });
  };
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
          height: 100%;
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
              key={fileState.id}
              active={selectedFile.id === fileState.id}
              onClick={onFileClick(fileState.id)}
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
        <div
          css={css`
            padding: 8px;
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
        </div>
        <FileRecordTable
          file={selectedFile}
          submissionData={{
            fileName: 'some file',
            creator: 'Someone',
            createdAt: 'sometime',
          }}
        />
      </Col>
    </div>
  );
};
