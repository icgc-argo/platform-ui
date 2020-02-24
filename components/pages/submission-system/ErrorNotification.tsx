import React from 'react';
import { css } from 'uikit';
import Button from 'uikit/Button';
import Notification from 'uikit/notifications/Notification';
import Table, { TableColumnConfig } from 'uikit/Table';
import { exportToTsv } from 'global/utils/common';
import Icon from 'uikit/Icon';
import { instructionBoxButtonIconStyle, instructionBoxButtonContentStyle } from './common';
import union from 'lodash/union';
import { toDisplayRowIndex } from 'global/utils/clinicalUtils';

export const defaultColumns = [
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
    Header: 'Field with Error',
    maxWidth: 200,
  },
  {
    accessor: 'value' as 'value',
    Header: 'Error Value',
    maxWidth: 130,
  },
  {
    accessor: 'message' as 'message',
    Header: 'Error Description',
  },
];

export default <Error extends { [k: string]: any }>({
  title,
  errors,
  subtitle,
  columnConfig,
  onClearClick,
  tsvExcludeCols = [],
}: {
  title: string;
  subtitle: string;
  columnConfig: Array<
    TableColumnConfig<Error> & {
      accessor: keyof Error;
    }
  >;
  errors: Array<Error>;
  onClearClick?: React.ComponentProps<typeof Button>['onClick'];
  tsvExcludeCols?: Array<keyof Error>;
}) => {
  const onDownloadClick = () => {
    exportToTsv(errors, {
      exclude: union(tsvExcludeCols, ['__typename' as keyof Error]),
      order: columnConfig.map(entry => entry.accessor),
      fileName: 'error_report.tsv',
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
      variant="ERROR"
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
                Error Report
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
              showPagination={false}
              columns={columnConfig.map(col => ({
                ...col,
                style: {
                  whiteSpace: 'pre-line',
                  ...(col.style || {}),
                },
              }))}
              data={errors}
            />
          </div>
        );
      })()}
    />
  );
};
