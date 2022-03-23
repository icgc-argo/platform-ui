/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'uikit/ThemeProvider';
import Tag from 'uikit/Tag';
import TitleBar from 'uikit/TitleBar';
import Tooltip from 'uikit/Tooltip';
import Button from 'uikit/Button';
import Legend from 'uikit/Legend';
import { DownloadIcon } from './common';
import urlJoin from 'url-join';
import { MANIFEST_DOWNLOAD_PATH } from 'global/constants/gatewayApiPaths';
import { getConfig } from 'global/config';
import { FileCentricDocumentField } from '../file-repository/types';
import sqonBuilder from 'sqon-builder';
import useAuthContext from 'global/hooks/useAuthContext';
import { get } from 'lodash';

const FileDownloadTooltip = ({
  isDownloadEnabled,
  fileSize,
}: {
  isDownloadEnabled: boolean;
  fileSize: number;
}) => {
  const { egoJwt } = useAuthContext();
  const isUserLoggedIn = !!egoJwt;
  const { MAX_FILE_DOWNLOAD_SIZE } = getConfig();

  if (isDownloadEnabled) {
    return null;
  }

  if (fileSize > MAX_FILE_DOWNLOAD_SIZE) {
    return (
      <div>
        <span>
          File is too large to download
          <br />
          from the browser. Please
          <br />
          use the manifest.
        </span>
      </div>
    );
  }

  if (isUserLoggedIn) {
    return (
      <div>
        <span>
          DACO approval is required to
          <br />
          download controlled files.
        </span>
      </div>
    );
  }

  return (
    <div>
      <span>
        Please log in to access
        <br />
        controlled files.
      </span>
    </div>
  );
};

export const FileTitleBar: React.ComponentType<{
  programShortName: string;
  fileId: string;
  isDownloadEnabled: boolean;
  accessTier?: string;
  fileSize?: number;
  fileObjectId?: string;
}> = ({ programShortName, fileId, isDownloadEnabled, accessTier, fileSize, fileObjectId }) => {
  const theme = useTheme();
  const { downloadFileWithEgoToken, fetchWithEgoToken } = useAuthContext();
  const { GATEWAY_API_ROOT } = getConfig();
  const filter = sqonBuilder.has(FileCentricDocumentField['file_id'], fileId).build();
  const [isDownloading, setIsDownloading] = useState(false);

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
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <TitleBar
          css={css`
            display: inline-flex;
            padding-right: 18px;
          `}
        >
          <div>{programShortName}</div>
          <div>File: {fileId}</div>
        </TitleBar>
        {accessTier && <Tag>{accessTier}</Tag>}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Legend />

        <Tooltip
          disabled={isDownloadEnabled}
          unmountHTMLWhenHide
          position="bottom"
          interactive
          html={FileDownloadTooltip({ isDownloadEnabled, fileSize })}
        >
          <Button
            css={css`
              margin-right: 8px;
            `}
            disabled={!isDownloadEnabled || isDownloading}
            onClick={async () => {
              setIsDownloading(true);

              const downloadUrl = urlJoin(
                GATEWAY_API_ROOT,
                'storage-api/get-download-url',
                fileObjectId,
              );
              const fileDownloadUrl = await fetchWithEgoToken(downloadUrl)
                .then((res) => res.json())
                .then((data) => get(data, 'url', undefined))
                .catch((err) => console.error(err));

              if (fileDownloadUrl) {
                // because of CORS we can't just use a redirect, so instead
                // we add a temporary anchor tag to the page and click it
                const tempLink = document.createElement('a');
                tempLink.href = fileDownloadUrl;
                tempLink.setAttribute('target', '_blank');
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
              }

              setIsDownloading(false);
            }}
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
            downloadFileWithEgoToken(downloadUrl);
          }}
        >
          <DownloadIcon />
          MANIFEST
        </Button>
      </div>
    </div>
  );
};
