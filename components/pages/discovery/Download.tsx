/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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
import useCommonToasters from 'components/useCommonToasters';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import { useState } from 'react';
import urljoin from 'url-join';
import useFiltersContext from '../file-repository/hooks/useFiltersContext';

const DownloadOptionValues = {
  SCORE_MANIFEST: 'SCORE_MANIFEST',
  CLINICAL_DATA: 'CLINICAL_DATA',
} as const;

type DownloadOption = (typeof DownloadOptionValues)[keyof typeof DownloadOptionValues];

const menuItems: DownloadButtonProps<DownloadOption>['menuItems'] = [
  {
    display: 'Clinical Data',
    value: DownloadOptionValues.CLINICAL_DATA,
  },
  {
    display: 'File Manifest',
    value: DownloadOptionValues.SCORE_MANIFEST,
  },
];

export const Download = ({ children }) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState<boolean>();
  const { filters } = useFiltersContext();
  const { GATEWAY_API_ROOT } = getConfig();
  const toaster = useCommonToasters();
  const { downloadFileWithEgoToken } = useAuthContext();

  const clinicalDataUrl = urljoin(
    GATEWAY_API_ROOT,
    'clinical/api/donors/data-for-files-discovery',
    `?filter=${encodeURIComponent(JSON.stringify(filters))}`,
  );

  const tsvUrl = urljoin(
    GATEWAY_API_ROOT,
    'data-discovery-tsv/score-manifest',
    `?filter=${encodeURIComponent(JSON.stringify(filters))}`,
  );

  const onItemClick: DownloadButtonProps<DownloadOption>['onItemClick'] = async (item) => {
    setLoading(true);
    const downloadURL =
      item.value === DownloadOptionValues.CLINICAL_DATA
        ? clinicalDataUrl
        : item.value === DownloadOptionValues.SCORE_MANIFEST
        ? tsvUrl
        : '';
    try {
      await downloadFileWithEgoToken(downloadURL);
    } catch (error) {
      setLoading(false);
      toaster.onDownloadError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownButton<DownloadOption>
      css={css`
        margin-right: 8px;
        width: 144px;
        :disabled {
          background-color: ${theme.button.colors.secondary.hover};
          color: ${theme.button.textColors.secondary.default};
        }
      `}
      variant="secondary"
      size="sm"
      onItemClick={onItemClick}
      menuItems={menuItems}
      isLoading={isLoading}
      showLoaderWithChildren
    >
      <span
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {!isLoading && <Icon name="download" fill="accent2_dark" height="12px" />}
        {children}
        <Icon
          name="chevron_down"
          fill="accent2_dark"
          height="9px"
          css={css`
            margin-left: 5px;
            margin-right: 0px;
          `}
        />
      </span>
    </DropdownButton>
  );
};
