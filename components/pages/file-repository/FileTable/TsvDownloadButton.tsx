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

enum DownloadOptionValues {
  ALL_FILES = 'ALL_FILES',
  SCORE_MANIFEST = 'SCORE_MANIFEST',
  CLINICAL_DATA = 'CLINICAL_DATA',
  FILE_TABLE = 'FILE_TABLE',
}

export default ({
  allFilesSelected,
  selectedRows,
}: {
  allFilesSelected: boolean;
  selectedRows: string[];
}) => {
  const theme = useTheme();
  const { GATEWAY_API_ROOT } = getConfig();
  const menuItems: DownloadButtonProps<DownloadOptionValues>['menuItems'] = [
    {
      display:
        allFilesSelected || selectedRows.length === 0
          ? 'All Files'
          : `${pluralize('file', selectedRows.length, true)} selected`,
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
  const onItemClick: DownloadButtonProps<DownloadOptionValues>['onItemClick'] = item => {
    switch (item.value) {
      case DownloadOptionValues.SCORE_MANIFEST:
        window.location.assign(urlJoin(GATEWAY_API_ROOT, '/file-centric-tsv/score-manifest'));
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
