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

import {
  DownloadButtonProps,
  DropdownButton,
  Icon,
  TOAST_VARIANTS,
  css,
  useTheme,
} from '@icgc-argo/uikit';
import useCommonToasters from 'components/useCommonToasters';
import { getConfig } from 'global/config';
import {
  API_PATH_DOWNLOAD_CLINICALFORFILES,
  API_PATH_DOWNLOAD_FILE,
  API_PATH_DOWNLOAD_MANIFEST,
} from 'global/constants/gatewayApiPaths';
import useAuthContext from 'global/hooks/useAuthContext';
import { Values } from 'global/utils/typeUtils';
import { ComponentType, useState } from 'react';
import SqonBuilder from 'sqon-builder';
import urljoin from 'url-join';
import { FileCentricDocumentFields } from '../file-repository/types';
import {
  instructionBoxButtonContentStyle,
  instructionBoxButtonIconStyle,
} from '../submission-system/common';
import { sortByField } from 'global/utils/arrayUtils';

const DropdownOptions = {
  CLINICAL: 'CLINICAL',
  FILE: 'FILE',
  MANIFEST: 'MANIFEST',
};
type DropdownOption = Values<typeof DropdownOptions>;

const DownloadDropdown: ComponentType<{
  objectId: string;
  fileDownloadEnabled: boolean;
  clinicalDownloadEnabled: boolean;
}> = (props) => {
  const { FEATURE_CLINICAL_DOWNLOAD, GATEWAY_API_ROOT } = getConfig();
  const theme = useTheme();
  const toaster = useCommonToasters();
  const [loading, setLoading] = useState(false);
  const { downloadFileWithEgoToken } = useAuthContext();

  const onItemClick: DownloadButtonProps<DropdownOption>['onItemClick'] = (item) => {
    setLoading(true);

    const fileFilterSqon: string = SqonBuilder.has(
      FileCentricDocumentFields.object_id,
      props.objectId,
    ).build();

    switch (item.value) {
      case DropdownOptions.MANIFEST: {
        const downloadUrl = urljoin(
          GATEWAY_API_ROOT,
          API_PATH_DOWNLOAD_MANIFEST,
          `?filter=${encodeURIComponent(JSON.stringify(fileFilterSqon))}`,
        );
        downloadFileWithEgoToken(downloadUrl)
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            toaster.onDownloadError(err.message);
          });
        break;
      }
      case DropdownOptions.FILE: {
        const downloadUrl = urljoin(GATEWAY_API_ROOT, API_PATH_DOWNLOAD_FILE, props.objectId);
        downloadFileWithEgoToken(downloadUrl)
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            toaster.onDownloadError(err.message);
          });
        break;
      }
      case DropdownOptions.CLINICAL: {
        const downloadUrl = urljoin(GATEWAY_API_ROOT, API_PATH_DOWNLOAD_CLINICALFORFILES);

        downloadFileWithEgoToken(downloadUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            objectIds: [props.objectId],
          }),
        })
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

  const menuItems: DownloadButtonProps<DropdownOption>['menuItems'] = [
    {
      display: 'File Manifest',
      value: DropdownOptions.MANIFEST,
    },
  ];

  if (props.clinicalDownloadEnabled && FEATURE_CLINICAL_DOWNLOAD) {
    menuItems.push({
      display: 'Clinical Data',
      value: DropdownOptions.CLINICAL,
    });
  }

  if (props.fileDownloadEnabled) {
    menuItems.push({
      display: 'File',
      value: DropdownOptions.FILE,
    });
  }

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
      menuItems={menuItems.sort(sortByField('display'))}
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

export default DownloadDropdown;
