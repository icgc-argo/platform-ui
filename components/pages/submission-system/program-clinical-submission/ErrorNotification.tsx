import React from 'react';
import { css } from 'uikit';
import Button from 'uikit/Button';
import Notification from 'uikit/notifications/Notification';
import Table from 'uikit/Table';
import { ClinicalSubmissionError } from './types';

export default ({
  title,
  errors,
  subtitle,
  showClinicalType,
  onClearClick,
}: {
  title: string;
  subtitle: string;
  errors: ClinicalSubmissionError[];
  showClinicalType?: boolean;
  onClearClick: React.ComponentProps<typeof Button>['onClick'];
}) => (
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
          columns={[
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
          ]}
          data={errors}
        />
      </>
    }
  />
);
