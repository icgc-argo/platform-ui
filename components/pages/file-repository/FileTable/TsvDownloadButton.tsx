/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import DropdownButton, { DownloadButtonProps } from 'uikit/DropdownButton';
import pluralize from 'pluralize';
import { css } from '@emotion/core';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../../submission-system/common';
import { useTheme } from 'uikit/ThemeProvider';
import Icon from 'uikit/Icon';
import { getConfig } from 'global/config';
import urlJoin from 'url-join';
import { MANIFEST_DOWNLOAD_PATH } from 'global/constants/gatewayApiPaths';
import useFiltersContext, { defaultFilters } from '../hooks/useFiltersContext';
import { FileCentricDocumentField } from './types';
import { RecursiveFilter } from '../utils/types';

enum DownloadOptionValues {
  ALL_FILES = 'ALL_FILES',
  SCORE_MANIFEST = 'SCORE_MANIFEST',
  CLINICAL_DATA = 'CLINICAL_DATA',
  FILE_TABLE = 'FILE_TABLE',
}

export default ({
  allFilesSelected,
  selectedFilesObjectIds,
  unSelectedFilesObjectIds,
}: {
  allFilesSelected: boolean;
  selectedFilesObjectIds: string[];
  unSelectedFilesObjectIds: string[];
}) => {
  const theme = useTheme();
  const { GATEWAY_API_ROOT } = getConfig();
  const { filters: repoFilters } = useFiltersContext();
  const menuItems: DownloadButtonProps<DownloadOptionValues>['menuItems'] = [
    {
      display:
        allFilesSelected || selectedFilesObjectIds.length === 0
          ? 'All Files'
          : `${pluralize('file', selectedFilesObjectIds.length, true)} selected`,
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
    // only manifest download enabled for initial File Repo release
    // {
    //   display: 'Clinical Data',
    //   value: DownloadOptionValues.CLINICAL_DATA,
    // },
    {
      display: 'File Manifest',
      value: DownloadOptionValues.SCORE_MANIFEST,
    },
    // {
    //   display: 'File Table',
    //   value: DownloadOptionValues.FILE_TABLE,
    // },
  ];

  const downloadFilter: RecursiveFilter = {
    op: 'and',
    content: [
      repoFilters,
      allFilesSelected
        ? {
            op: 'not',
            content: [
              {
                op: 'in',
                content: {
                  field: FileCentricDocumentField['object_id'],
                  value: unSelectedFilesObjectIds,
                },
              },
            ],
          }
        : selectedFilesObjectIds.length
        ? {
            op: 'in',
            content: {
              field: FileCentricDocumentField['object_id'],
              value: selectedFilesObjectIds,
            },
          }
        : defaultFilters,
    ],
  };
  const onItemClick: DownloadButtonProps<DownloadOptionValues>['onItemClick'] = item => {
    switch (item.value) {
      case DownloadOptionValues.SCORE_MANIFEST:
        const downloadUrl = urlJoin(
          GATEWAY_API_ROOT,
          MANIFEST_DOWNLOAD_PATH,
          `?filter=${encodeURIComponent(JSON.stringify(downloadFilter))}`,
        );
        window.location.assign(downloadUrl);
        break;
      default:
        console.log(`${item.value} was selected`);
        break;
    }
  };
  return (
    <DropdownButton
      css={css`
        margin-right: 8px;
      `}
      variant="secondary"
      size="sm"
      onItemClick={onItemClick}
      menuItems={menuItems}
    >
      <span css={instructionBoxButtonContentStyle}>
        <Icon
          name="download"
          fill="accent2_dark"
          height="12px"
          css={instructionBoxButtonIconStyle}
        />
        Download
        <Icon
          name="chevron_down"
          fill="accent2_dark"
          height="9px"
          css={css`
            ${instructionBoxButtonIconStyle}
            margin-left: 5px;
          `}
        />
      </span>
    </DropdownButton>
  );
};
