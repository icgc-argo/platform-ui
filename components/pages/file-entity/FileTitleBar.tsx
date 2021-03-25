import { css } from '@emotion/core';
import { useTheme } from 'uikit/ThemeProvider';
import TitleBar from 'uikit/TitleBar';
import Tooltip from 'uikit/Tooltip';
import Button from 'uikit/Button';
import { DownloadIcon } from './common';
import urlJoin from 'url-join';
import { MANIFEST_DOWNLOAD_PATH } from 'global/constants/gatewayApiPaths';
import { getConfig } from 'global/config';
import { FileCentricDocumentField } from '../file-repository/types';
import sqonBuilder from 'sqon-builder';

export const FileTitleBar: React.ComponentType<{
  programShortName: string;
  fileId: string;
  isUserLoggedIn: boolean;
}> = ({ programShortName, fileId, isUserLoggedIn }) => {
  const theme = useTheme();
  const { GATEWAY_API_ROOT } = getConfig();
  const filter = sqonBuilder.has(FileCentricDocumentField['object_id'], fileId).build();

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

        <Button
          onClick={() => {
            const downloadUrl = urlJoin(
              GATEWAY_API_ROOT,
              MANIFEST_DOWNLOAD_PATH,
              `?filter=${encodeURIComponent(JSON.stringify(filter))}`,
            );
            window.location.assign(downloadUrl);
          }}
        >
          <DownloadIcon />
          MANIFEST
        </Button>
      </div>
    </div>
  );
};
