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

import {
  Button,
  ColumnDef,
  createColumnHelper,
  css,
  Icon,
  NOTIFICATION_VARIANTS,
  Notification,
  NotificationVariant,
  Table,
  TableV8,
} from '@icgc-argo/uikit';
import { TableProps } from 'global/types/table';
import { exportToTsv } from 'global/utils/common';
import union from 'lodash/union';
import { ReactNode, ComponentProps, createRef } from 'react';

import { instructionBoxButtonContentStyle, instructionBoxButtonIconStyle } from './common';
import { getConfig } from 'global/config';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

export type ErrorNotificationDefaultColumns = {
  // type?: string;
  donorId: string;
  field: string;
  message: string;
  row: number;
  value: string;
};

export const getDefaultColumns = (level: NotificationVariant) => {
  const variant = level === NOTIFICATION_VARIANTS.ERROR ? 'Error' : 'Warning';
  const columnHelper = createColumnHelper<ErrorNotificationDefaultColumns>();

  const columns: ColumnDef<ErrorNotificationDefaultColumns>[] = [
    columnHelper.accessor('row', {
      header: 'Line #',
      maxSize: 70,
    }),
    columnHelper.accessor('donorId', {
      header: 'Submitter Donor ID',
      maxSize: 160,
    }),
    columnHelper.accessor('field', {
      header: `Field with ${variant}`,
      maxSize: 200,
    }),
    columnHelper.accessor('value', {
      header: `${variant} Value`,
      maxSize: 130,
    }),
    columnHelper.accessor('message', {
      header: `${variant} Description`,
    }),
  ];

  return columns;
};

const ErrorNotification = <T extends { [k: string]: any }>({
  level,
  title,
  tableData,
  subtitle,
  tableColumns,
  onClearClick,
  tsvExcludeCols = [],
  tableProps,
}: {
  level: NotificationVariant;
  title: string;
  subtitle: ReactNode;
  tableColumns: ColumnDef<T>[];
  tableData: Array<T>;
  onClearClick?: ComponentProps<typeof Button>['onClick'];
  tsvExcludeCols?: Array<keyof T>;
  tableProps?: Partial<TableProps>;
}) => {
  const onDownloadClick = () => {
    exportToTsv(tableData, {
      exclude: union(tsvExcludeCols, ['__typename']),
      order: tableColumns.map((entry) => entry.id),
      fileName: `${level}_report.tsv`,
      headerDisplays: tableColumns.reduce(
        (acc, { id, header }) => ({
          ...acc,
          [id]: header,
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
        const containerRef = createRef<HTMLDivElement>();
        return (
          <div
            ref={containerRef}
            css={css`
              margin-top: 10px;
              width: 100%;
            `}
          >
            <div>{subtitle}</div>
            {FEATURE_REACT_TABLE_V8_ENABLED ? (
              <TableV8
                columns={tableColumns}
                data={tableData}
                withHeaders
                withResize
                withSorting
                withStripes
                withRowHighlight
              />
            ) : (
              <Table
                parentRef={containerRef}
                NoDataComponent={() => null}
                columns={tableColumns.map((col) => ({
                  ...col,
                  style: {
                    whiteSpace: 'pre-line',
                  },
                  // react table v6 property name conversion
                  Header: col.header,
                  width: col.size,
                }))}
                data={tableData}
                showPagination
                {...tableProps}
              />
            )}
          </div>
        );
      })()}
    />
  );
};

export default ErrorNotification;
