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
  css,
  Icon,
  NOTIFICATION_VARIANTS,
  Notification,
  NotificationVariant,
} from '@icgc-argo/uikit';
import { exportToTsv } from 'global/utils/common';
import union from 'lodash/union';
import { ReactNode, ComponentProps, createRef } from 'react';

import { instructionBoxButtonContentStyle, instructionBoxButtonIconStyle } from './common';

export type ErrorNotificationDefaultColumns = {
  donorId: string;
  field: string;
  message: string;
  row: number;
  value: string;
};

export const getDefaultColumns = (
  level: NotificationVariant,
): {
  accessor: keyof ErrorNotificationDefaultColumns;
  header: string;
  maxSize?: number;
}[] => {
  const variant = level === NOTIFICATION_VARIANTS.ERROR ? 'Error' : 'Warning';
  return [
    { accessor: 'row', header: 'Line #', maxSize: 70 },
    {
      accessor: 'donorId',
      header: 'Submitter Donor ID',
      maxSize: 160,
    },
    {
      accessor: 'field',
      header: `Field with ${variant}`,
      maxSize: 200,
    },
    {
      accessor: 'value',
      header: `${variant} Value`,
      maxSize: 130,
    },
    {
      accessor: 'message',
      header: `${variant} Description`,
    },
  ];
};

export const errorNotificationTableProps = {
  withHeaders: true,
  withResize: true,
  withSorting: true,
  withStripes: true,
  withRowHighlight: true,
};

const ErrorNotification = <T extends { [k: string]: any }>({
  level,
  onClearClick,
  reportColumns = [],
  reportData = [],
  subtitle,
  TableComponent = <></>,
  title,
  tsvExcludeCols = [],
}: {
  level: NotificationVariant;
  onClearClick?: ComponentProps<typeof Button>['onClick'];
  reportColumns: { header: string; id: string }[];
  reportData: Array<T>;
  subtitle: ReactNode;
  TableComponent?: JSX.Element;
  title: string;
  tsvExcludeCols?: Array<keyof T>;
}) => {
  const onDownloadClick = () => {
    exportToTsv(reportData, {
      exclude: union(tsvExcludeCols, ['__typename']),
      order: reportColumns.map((entry) => entry.id),
      fileName: `${level}_report.tsv`,
      headerDisplays: reportColumns.reduce(
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
            {TableComponent}
          </div>
        );
      })()}
    />
  );
};

export default ErrorNotification;
