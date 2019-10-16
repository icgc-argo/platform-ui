import React from 'react';
import { css } from 'uikit';
import Button from 'uikit/Button';
import Notification from 'uikit/notifications/Notification';
import Table, { TableColumnConfig } from 'uikit/Table';
import { ClinicalSubmissionError } from './types';
import { exportToTsv } from 'global/utils/common';
import Icon from 'uikit/Icon';
import { instructionBoxButtonIconStyle, instructionBoxButtonContentStyle } from '../common';

const insertAt = <T extends any>(arr: T[]) => (i: number) => (element: T) => [
  ...arr.slice(0, i),
  element,
  ...arr.slice(i, arr.length),
];

export default ({
  title,
  errors,
  subtitle,
  showClinicalType,
  onClearClick,
}: {
  title: string;
  subtitle: string;
  errors: Array<
    ClinicalSubmissionError & {
      clinicalType?: string;
    }
  >;
  onClearClick: React.ComponentProps<typeof Button>['onClick'];
  showClinicalType?: boolean;
}) => {
  const defaultColumns: TableColumnConfig<typeof errors[0]>[] = [
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
      Header: 'Error Dscription',
    },
  ];
  const columnsWithClinicalType = insertAt(defaultColumns)(1)({
    accessor: 'clinicalType',
    Header: 'Clinical type',
  });
  const onDownloadClick = () => {
    exportToTsv(errors, {
      exclude: ['__typename'],
      order: columnsWithClinicalType.map(entry => entry.accessor),
      fileName: 'error_report.tsv',
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
            columns={showClinicalType ? columnsWithClinicalType : defaultColumns}
            data={errors}
          />
        </div>
      }
    />
  );
};
