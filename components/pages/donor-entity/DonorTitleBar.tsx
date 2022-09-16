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

import { css } from '@emotion/core';
import { Button, Icon, Legend, Link, TitleBar, useTheme } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { MANIFEST_DOWNLOAD_PATH } from 'global/constants/gatewayApiPaths';
import useAuthContext from 'global/hooks/useAuthContext';
import sqonBuilder from 'sqon-builder';
import urlJoin from 'url-join';
import { DownloadIcon } from '../file-entity/common';
import { FileCentricDocumentField } from '../file-repository/types';

export const DonorTitleBar: React.ComponentType<{
  programId: string;
  donorId: string;
  isDownloadEnabled: boolean;
}> = ({ programId, donorId, isDownloadEnabled }) => {
  const theme = useTheme();
  const { downloadFileWithEgoToken } = useAuthContext();
  const { GATEWAY_API_ROOT } = getConfig();
  const filter = sqonBuilder.has(FileCentricDocumentField['donor_id'], donorId).build();

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
          <div>{programId}</div>
          <div>Donor: {donorId}</div>
        </TitleBar>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Legend />
        <Link
          css={css`
            padding: 5px 10px;
            font-size: ${theme.typography.data.fontSize};
            font-weight: ${theme.typography.label.fontWeight};
          `}
          underline={false}
          target="_blank"
          href="https://docs.icgc-argo.org/dictionary"
        >
          <Icon
            name={'info'}
            fill="accent2_dark"
            height="14px"
            css={css`
              margin-left: 5px;
              margin-right: 0px;
              position: relative;
              top: 3px;
              right: 3px;
            `}
          />
          DATA DICTIONARY
          <Icon
            name={'chevron_right'}
            fill="accent2_dark"
            height="9px"
            css={css`
              margin-left: 5px;
              margin-right: 0px;
            `}
          />
        </Link>
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
          ALL CLINICAL DATA
        </Button>
      </div>
    </div>
  );
};
