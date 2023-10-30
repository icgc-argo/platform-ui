/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { Button, css, Legend, Tag, TitleBar, Tooltip, useTheme } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import { ComponentType, useState } from 'react';

import sqonBuilder from 'sqon-builder';
import { FileCentricDocumentFields } from '../file-repository/types';
import DownloadDropdown from './DownloadDropdown';
import urljoin from 'url-join';
import { DownloadIcon } from './common';
import {
  API_PATH_DOWNLOAD_FILE,
  API_PATH_DOWNLOAD_MANIFEST,
} from 'global/constants/gatewayApiPaths';

const { FEATURE_CLINICAL_DOWNLOAD, MAX_FILE_DOWNLOAD_SIZE } = getConfig();

const FileDownloadTooltip = ({
  isDownloadEnabled,
  fileSize,
}: {
  isDownloadEnabled: boolean;
  fileSize: number;
}) => {
  const { egoJwt } = useAuthContext();
  const isUserLoggedIn = !!egoJwt;

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

export const FileTitleBar: ComponentType<{
  programShortName: string;
  fileId: string;
  isFileDownloadEnabled: boolean;
  isClinicalDownlaodEnabled: boolean;
  accessTier?: string;
  fileSize?: number;
  fileObjectId?: string;
}> = ({
  programShortName,
  fileId,
  isFileDownloadEnabled,
  isClinicalDownlaodEnabled,
  accessTier,
  fileSize,
  fileObjectId,
}) => {
  const theme = useTheme();
  const { downloadFileWithEgoToken } = useAuthContext();
  const { GATEWAY_API_ROOT } = getConfig();
  const filter = sqonBuilder.has(FileCentricDocumentFields['file_id'], fileId).build();
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
        {FEATURE_CLINICAL_DOWNLOAD ? (
          <DownloadDropdown
            objectId={fileObjectId}
            fileDownloadEnabled={isFileDownloadEnabled}
            clinicalDownloadEnabled={isClinicalDownlaodEnabled}
          />
        ) : (
          <>
            <Tooltip
              disabled={isFileDownloadEnabled}
              unmountHTMLWhenHide
              position="bottom"
              interactive
              html={FileDownloadTooltip({ isDownloadEnabled: isFileDownloadEnabled, fileSize })}
            >
              <Button
                css={css`
                  margin-right: 8px;
                `}
                disabled={!isFileDownloadEnabled || isDownloading}
                onClick={async () => {
                  setIsDownloading(true);

                  const downloadUrl = urljoin(
                    GATEWAY_API_ROOT,
                    API_PATH_DOWNLOAD_FILE,
                    fileObjectId,
                  );

                  await downloadFileWithEgoToken(downloadUrl)
                    .catch((err) => console.error(err))
                    .finally(() => setIsDownloading(false));
                }}
              >
                <DownloadIcon />
                FILE
              </Button>
            </Tooltip>

            <Button
              onClick={() => {
                const downloadUrl = urljoin(
                  GATEWAY_API_ROOT,
                  API_PATH_DOWNLOAD_MANIFEST,
                  `?filter=${encodeURIComponent(JSON.stringify(filter))}`,
                );
                downloadFileWithEgoToken(downloadUrl);
              }}
            >
              <DownloadIcon />
              MANIFEST
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
