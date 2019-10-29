import React from 'react';
import { css } from 'uikit';
import Button from 'uikit/Button';
import Notification from 'uikit/notifications/Notification';
import Table, { TableColumnConfig } from 'uikit/Table';
import { ClinicalSubmissionError } from './program-clinical-submission/types';
import { exportToTsv } from 'global/utils/common';
import Icon from 'uikit/Icon';
import { instructionBoxButtonIconStyle, instructionBoxButtonContentStyle } from './common';
import { ClinicalRegistrationError } from './program-sample-registration/types';
import union from 'lodash/union';

export const defaultColumns: TableColumnConfig<{ [k: string]: any }>[] = [
  {
    accessor: 'row',
    Header: 'Row #',
    maxWidth: 70,
  },
  {
    accessor: 'donorId',
    Header: 'Submitter Donor ID',
    maxWidth: 160,
  },
  {
    accessor: 'field',
    Header: 'Field with Error',
    maxWidth: 200,
  },
  {
    accessor: 'value',
    Header: 'Error Value',
    maxWidth: 130,
  },
  {
    accessor: 'message',
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
  columnConfig: Array<{ [k: string]: any }>;
  errors: Array<Error>;
  onClearClick: React.ComponentProps<typeof Button>['onClick'];
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
            <Button isAsync variant="text" size="sm" onClick={onClearClick}>
              Clear
            </Button>
          </div>
        </div>
      }
      content={
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <div>{subtitle}</div>
          <Table
            NoDataComponent={() => null}
            showPagination={false}
            columns={columnConfig}
            data={errors}
          />
        </div>
      }
    />
  );
};
