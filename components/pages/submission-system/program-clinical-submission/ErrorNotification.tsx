import React from 'react';
import { css } from 'uikit';
import Button from 'uikit/Button';
import Notification from 'uikit/notifications/Notification';
import Table from 'uikit/Table';
import { ClinicalSubmissionError } from './types';

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
  const defaultColumns: {
    accessor: keyof typeof errors[0];
    Header: React.ReactNode;
  }[] = [
    {
      accessor: 'row',
      Header: 'Row #',
    },
    {
      accessor: 'donorId',
      Header: 'Submitter Donor ID',
    },
    {
      accessor: 'field',
      Header: 'Field with Error',
    },
    {
      accessor: 'value',
      Header: 'Error Value',
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
            <Button variant="secondary" size="sm">
              Error Report
            </Button>
            <Button variant="text" size="sm" onClick={onClearClick}>
              Clear
            </Button>
          </div>
        </div>
      }
      content={
        <>
          <div>{subtitle}</div>
          <Table
            showPagination={false}
            columns={showClinicalType ? columnsWithClinicalType : defaultColumns}
            data={errors}
          />
        </>
      }
    />
  );
};
