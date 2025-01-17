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

import { css, DownloadButtonProps, DropdownButton, Icon, useTheme } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import {
  API_PATH_DOWNLOAD_FILETABLE,
  API_PATH_DOWNLOAD_MANIFEST,
} from 'global/constants/gatewayApiPaths';
import useAuthContext from 'global/hooks/useAuthContext';
import pluralize from 'pluralize';
import { useState } from 'react';

import useCommonToasters from 'components/useCommonToasters';
import { sortByField } from 'global/utils/arrayUtils';
import { hasDacoAccess } from 'global/utils/egoJwt';
import { default as urlJoin, default as urljoin } from 'url-join';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../../submission-system/common';
import useFiltersContext, { defaultFilters } from '../hooks/useFiltersContext';
import { FileCentricDocumentFields } from '../types';
import { fileRepoTableTSVColumns } from '../utils/constants';
import { RecursiveFilter } from '../utils/types';

enum DownloadOptionValues {
  ALL_FILES = 'ALL_FILES',
  SCORE_MANIFEST = 'SCORE_MANIFEST',
  CLINICAL_DATA = 'CLINICAL_DATA',
  FILE_TABLE = 'FILE_TABLE',
}

const { FEATURE_CLINICAL_DOWNLOAD, GATEWAY_API_ROOT } = getConfig();

const TsvDownloadButton = ({
  allFilesSelected,
  selectedFilesCount,
  selectedFilesObjectIds,
  unSelectedFilesObjectIds,
  allObjectIds,
}: {
  allFilesSelected: boolean;
  selectedFilesCount: number;
  selectedFilesObjectIds: string[];
  unSelectedFilesObjectIds: string[];
  allObjectIds: string[];
}) => {
  const theme = useTheme();
  const toaster = useCommonToasters();
  const { permissions } = useAuthContext();

  const { downloadFileWithEgoToken } = useAuthContext();
  const { filters: repoFilters } = useFiltersContext();
  const [loading, setLoading] = useState(false);

  // only show clinical download option if:
  // - download clinical feature is enabled
  // - user is logged in and has DACO access
  // - files are selected (TODO: download all by filter)
  const showClinicalDownload =
    FEATURE_CLINICAL_DOWNLOAD && hasDacoAccess(permissions) && selectedFilesCount > 0;

  const menuItems: DownloadButtonProps<DownloadOptionValues>['menuItems'] = [
    ...(!!selectedFilesCount
      ? [
          {
            display: `${selectedFilesCount.toLocaleString()} ${pluralize(
              'file',
              selectedFilesCount,
            )} selected`,
            value: DownloadOptionValues.ALL_FILES,
            css: css`
              color: ${theme.colors.secondary_dark};
              border-bottom: 1px solid ${theme.colors.grey_2};
              cursor: auto;
              &:hover {
                background: transparent;
              }
            `,
          },
        ]
      : []),
    ...(showClinicalDownload
      ? [
          {
            display: 'Clinical Data',
            value: DownloadOptionValues.CLINICAL_DATA,
          },
        ]
      : []),
    {
      display: 'File Manifest',
      value: DownloadOptionValues.SCORE_MANIFEST,
    },
    {
      display: 'Table (TSV)',
      value: DownloadOptionValues.FILE_TABLE,
    },
  ].sort(sortByField('display'));

  const downloadFilter: RecursiveFilter = {
    op: 'and',
    content: [
      repoFilters,
      selectedFilesObjectIds.length
        ? {
            op: 'in',
            content: {
              field: FileCentricDocumentFields['object_id'],
              value: selectedFilesObjectIds,
            },
          }
        : defaultFilters,
    ],
  };

  const allFilesDownloadFilter: RecursiveFilter = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'object_id',
          value: allObjectIds,
        },
      },
    ],
  };

  /*
   * Use either an endpoint for multiple files or an endpoint for all files
   */
  const getClinicalDownload = (type: 'ALL' | 'SELECTION') => {
    const downloadUrl =
      type === 'ALL'
        ? urljoin(
            GATEWAY_API_ROOT,
            'clinical/api/donors/data-for-all-files',
            `?filter=${encodeURIComponent(JSON.stringify(allFilesDownloadFilter))}`,
          )
        : urljoin(GATEWAY_API_ROOT, 'clinical/api/donors/data-for-files');

    const body =
      type === 'ALL'
        ? undefined
        : JSON.stringify({
            objectIds: selectedFilesObjectIds,
          });

    return downloadFileWithEgoToken(downloadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  };

  const onItemClick: DownloadButtonProps<DownloadOptionValues>['onItemClick'] = (item) => {
    setLoading(true);
    switch (item.value) {
      case DownloadOptionValues.SCORE_MANIFEST:
        const downloadUrl = urlJoin(
          GATEWAY_API_ROOT,
          API_PATH_DOWNLOAD_MANIFEST,
          `?filter=${encodeURIComponent(JSON.stringify(downloadFilter))}`,
        );
        downloadFileWithEgoToken(downloadUrl)
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            toaster.onDownloadError(err.message);
          });
        break;
      case DownloadOptionValues.FILE_TABLE:
        const tsvdownloadUrl = urlJoin(
          GATEWAY_API_ROOT,
          API_PATH_DOWNLOAD_FILETABLE,
          `?filter=${encodeURIComponent(
            JSON.stringify(downloadFilter),
          )}&columns=${encodeURIComponent(JSON.stringify(fileRepoTableTSVColumns))}`,
        );
        // window.location.assign(tsvdownloadUrl);
        downloadFileWithEgoToken(tsvdownloadUrl)
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            toaster.onDownloadError(err.message);
          });
        break;
      case DownloadOptionValues.CLINICAL_DATA: {
        const downloadFile = getClinicalDownload(allFilesSelected ? 'ALL' : 'SELECTION');

        downloadFile
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            toaster.onDownloadError(err.message);
          });
        break;
      }
      default:
        console.log(`Selection from download dropdown '${item.value}' has no action defined.`);
        setLoading(false);
        break;
    }
  };
  return (
    <DropdownButton
      css={css`
        margin-right: 8px;
        width: 160px;
        :disabled {
          background-color: ${theme.button.colors.secondary.hover};
          color: ${theme.button.textColors.secondary.default};
        }
      `}
      variant="secondary"
      size="sm"
      onItemClick={onItemClick}
      menuItems={menuItems}
      isLoading={loading}
      showLoaderWithChildren
    >
      <span css={instructionBoxButtonContentStyle}>
        {!loading && (
          <Icon
            name="download"
            fill="accent2_dark"
            height="12px"
            css={instructionBoxButtonIconStyle}
          />
        )}
        Download
        <Icon
          name="chevron_down"
          fill="accent2_dark"
          height="9px"
          css={css`
            ${instructionBoxButtonIconStyle}
            margin-left: 5px;
            margin-right: 0px;
          `}
        />
      </span>
    </DropdownButton>
  );
};

export default TsvDownloadButton;
