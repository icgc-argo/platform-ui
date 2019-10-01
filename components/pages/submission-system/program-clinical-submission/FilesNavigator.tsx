import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';

export type FileState = {
  id: string;
  displayName: string;
  fileCount?: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'NONE';
};
export default ({ fileStates }: { fileStates: Array<FileState> }) => {
  const [selectedFile, setSelectedFile] = React.useState<FileState>(fileStates[0]);
  const onFileClick = fileState => e => {
    setSelectedFile(fileState);
  };
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={css`
          width: 170px;
          height: 100%;
          overflow: visible;
        `}
      >
        <VerticalTabs>
          {fileStates.map(fileState => (
            <VerticalTabs.Item
              key={fileState.id}
              active={selectedFile.id === fileState.id}
              onClick={onFileClick(fileState)}
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
                    {fileState.fileCount}
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
      <div
        css={css`
          padding: 10px;
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
    </div>
  );
};
