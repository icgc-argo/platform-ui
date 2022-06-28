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

import React, { ReactNode } from 'react';
import { TableProps } from 'react-table';
import { css } from '@icgc-argo/uikit';
import Button from '@icgc-argo/uikit/Button';
import Notification, {
  NotificationVariant,
  NOTIFICATION_VARIANTS,
} from '@icgc-argo/uikit/notifications/Notification';
import Table, { TableColumnConfig } from '@icgc-argo/uikit/Table';
import { exportToTsv } from 'global/utils/common';
import Icon from '@icgc-argo/uikit/Icon';
import { instructionBoxButtonIconStyle, instructionBoxButtonContentStyle } from './common';
import union from 'lodash/union';

export const getDefaultColumns = (level: NotificationVariant) => {
  const variant = level === NOTIFICATION_VARIANTS.ERROR ? 'Error' : 'Warning';
  return [
    {
      accessor: 'row' as 'row',
      Header: 'Line #',
      maxWidth: 70,
    },
    {
      accessor: 'donorId' as 'donorId',
      Header: 'Submitter Donor ID',
      maxWidth: 160,
    },
    {
      accessor: 'field' as 'field',
      Header: `Field with ${variant}`,
      maxWidth: 200,
    },
    {
      accessor: 'value' as 'value',
      Header: `${variant} Value`,
      maxWidth: 130,
    },
    {
      accessor: 'message' as 'message',
      Header: `${variant} Description`,
    },
  ];
};

const ErrorNotification = <Error extends { [k: string]: any }>({
  level,
  title,
  errors,
  subtitle,
  columnConfig,
  onClearClick,
  tsvExcludeCols = [],
  tableProps,
}: {
  level: NotificationVariant;
  title: string;
  subtitle: ReactNode;
  columnConfig: Array<
    TableColumnConfig<Error> & {
      accessor: keyof Error | string;
    }
  >;
  errors: Array<Error>;
  onClearClick?: React.ComponentProps<typeof Button>['onClick'];
  tsvExcludeCols?: Array<keyof Error>;
  tableProps?: Partial<TableProps>;
}) => {
  const onDownloadClick = () => {
    exportToTsv(errors, {
      exclude: union(tsvExcludeCols, ['__typename' as keyof Error]),
      order: columnConfig.map((entry) => entry.accessor),
      fileName: `${level}_report.tsv`,
      headerDisplays: columnConfig.reduce<{}>(
        (acc, { accessor, Header }) => ({
          ...acc,
          [accessor]: Header as string,
        }),
        {},
      ),
    });
  };

  return (
    <Notification
      variant={level}
      interactionType="NONE"
      title={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          {title}
          <div
            css={css`
              display: flex;
            `}
          >
            <Button variant="secondary" size="sm" onClick={onDownloadClick}>
              <span css={instructionBoxButtonContentStyle}>
                <Icon
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                  css={instructionBoxButtonIconStyle}
                />
                {level === NOTIFICATION_VARIANTS.ERROR ? `Error` : `Warning`} Report
              </span>
            </Button>
            {!!onClearClick && (
              <Button
                isAsync
                id="button-clear-selected-file-upload"
                variant="text"
                size="sm"
                onClick={onClearClick}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      }
      contentProps={{
        css: css`
          overflow: hidden;
        `,
      }}
      content={(() => {
        const containerRef = React.createRef<HTMLDivElement>();
        return (
          <div
            ref={containerRef}
            css={css`
              margin-top: 10px;
              width: 100%;
            `}
          >
            <div>{subtitle}</div>
            <Table
              parentRef={containerRef}
              NoDataComponent={() => null}
              columns={columnConfig.map((col) => ({
                ...col,
                style: {
                  whiteSpace: 'pre-line',
                  ...(col.style || {}),
                },
              }))}
              data={errors}
              showPagination
              {...tableProps}
            />
          </div>
        );
      })()}
    />
  );
};

export default ErrorNotification;
