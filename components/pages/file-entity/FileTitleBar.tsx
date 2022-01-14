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

import { useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'uikit/ThemeProvider';
import Tag from 'uikit/Tag';
import TitleBar from 'uikit/TitleBar';
import Tooltip from 'uikit/Tooltip';
import Button from 'uikit/Button';
import DropdownButton, { DownloadButtonProps } from 'uikit/DropdownButton';
import Icon from 'uikit/Icon';
import { DownloadIcon } from './common';
import urlJoin from 'url-join';
import { MANIFEST_DOWNLOAD_PATH } from 'global/constants/gatewayApiPaths';
import { getConfig } from 'global/config';
import { FileCentricDocumentField } from '../file-repository/types';
import sqonBuilder from 'sqon-builder';

enum DownloadOptionValues {
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export const FileTitleBar: React.ComponentType<{
  programShortName: string;
  fileId: string;
  isDownloadEnabled: boolean;
  accessTier?: string;
}> = ({ programShortName, fileId, isDownloadEnabled, accessTier }) => {
  const theme = useTheme();
  const { GATEWAY_API_ROOT } = getConfig();
  const filter = sqonBuilder.has(FileCentricDocumentField['file_id'], fileId).build();
  const menuItems: DownloadButtonProps<DownloadOptionValues>['menuItems'] = [
    {
      value: DownloadOptionValues.NOT_APPLICABLE,
      display: (
        <div>
          <div className="legend--symbol">N/A</div>
          <div className="legend--text">Not Applicable</div>
        </div>
      ),
    },
    {
      value: DownloadOptionValues.NOT_AVAILABLE,
      display: (
        <div>
          <div className="legend--symbol">--</div>
          <div className="legend--text">Not Available</div>
        </div>
      ),
    },
  ];
  const [isLegendOpen, setLegendOpen] = useState(false);
  const onClick = (e, { toggleMenuOpen }) => {
    setLegendOpen(toggleMenuOpen);
  };
  const toggleMenuHandler = () => {
    setLegendOpen(!isLegendOpen);
  };

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
        <DropdownButton
          css={css`
            margin-right: 8px;
            border: none;
          `}
          variant="secondary"
          menuItems={menuItems}
          controlledMenuShowState={isLegendOpen}
          onClick={onClick}
          onItemClick={toggleMenuHandler}
          onMouseEnter={toggleMenuHandler}
          onMouseLeave={toggleMenuHandler}
          menuStyles={`
            display: flex;
            flex-direction: column;
            flex-wrap: no-wrap;
            left: -50px;
            width: 130px;
            padding: 13px;
            .legend--symbol {
              margin-right: 13px;
              width: 20px;
              color: ${theme.colors.grey};
              font-style: italic;
            }
            .legend--text, .legend--symbol {
              display: inline-block;
            }
            :hover {
              cursor: default
            }
          `}
          menuItemStyles={`
            :hover {
              background: ${theme.colors.white};
            }
          `}
        >
          <span>
            <Icon
              name={'legend'}
              fill="accent2_dark"
              height="9px"
              css={css`
                margin-left: 5px;
                margin-right: 0px;
              `}
            />
            Legend
            <Icon
              name={isLegendOpen ? 'chevron_down' : 'chevron_right'}
              fill="accent2_dark"
              height="9px"
              css={css`
                margin-left: 5px;
                margin-right: 0px;
              `}
            />
          </span>
        </DropdownButton>

        {/* TODO: Move download into Legend component once available: https://github.com/icgc-argo/platform-ui/issues/2108 */}
        {/* <Tooltip
          disabled={isDownloadEnabled}
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
            disabled={!isDownloadEnabled}
          >
            <DownloadIcon />
            FILE
          </Button>
        </Tooltip> */}

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
