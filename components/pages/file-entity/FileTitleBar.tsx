import { css } from '@emotion/core';
import { useTheme } from 'uikit/ThemeProvider';
import TitleBar from 'uikit/TitleBar';
import Tooltip from 'uikit/Tooltip';
import Button from 'uikit/Button';
import { DownloadIcon } from './common';

export const FileTitleBar: React.ComponentType<{
  programShortName: string;
  fileId: string;
  isUserLoggedIn: boolean;
}> = ({ programShortName, fileId, isUserLoggedIn }) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${theme.colors.primary};
        width: 100%;
      `}
    >
      <div>
        <TitleBar>
          <div>{programShortName}</div>
          <div>File: {fileId}</div>
        </TitleBar>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Tooltip
          disabled={isUserLoggedIn}
          unmountHTMLWhenHide
          position="left"
          interactive
          html={
            <div>
              <span>Please log in to access controlled files</span>
            </div>
          }
        >
          <Button
            css={css`
              margin-right: 8px;
            `}
            disabled={!isUserLoggedIn}
          >
            <DownloadIcon />
            FILE
          </Button>
        </Tooltip>

        <Button>
          <DownloadIcon />
          MANIFEST
        </Button>
      </div>
    </div>
  );
};
