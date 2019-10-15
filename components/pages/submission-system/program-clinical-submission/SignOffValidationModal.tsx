import * as React from 'react';
import { css } from 'uikit';
import { GqlClinicalSubmissionData } from './types';
import { capitalize } from 'global/utils/stringUtils';
import Modal from 'uikit/Modal';
import Typography from 'uikit/Typography';
import Table, { TableColumnConfig } from 'uikit/Table';
import { StatArea } from '../common';
import { FILE_STATE_COLORS } from './FilesNavigator/FileRecordTable';
import { useTheme } from 'uikit/ThemeProvider';

export const useSignOffValidationModalState = () => {
  const [signOffModalShown, setSignOffModalShown] = React.useState(false);
  const [{ onApprove, onCancel }, setSignOffFlow] = React.useState({
    onApprove: () => setSignOffModalShown(false),
    onCancel: () => setSignOffModalShown(false),
  });

  const getUserApproval = () =>
    new Promise((resolve, reject) => {
      setSignOffModalShown(true);
      setSignOffFlow({
        onApprove: () => {
          setSignOffModalShown(false);
          resolve();
        },
        onCancel: () => {
          setSignOffModalShown(false);
          reject();
        },
      });
    });
  return {
    signOffModalShown,
    getUserApproval,
    onApprove,
    onCancel,
  };
};

const defaultStats: GqlClinicalSubmissionData['clinicalEntities'][0]['stats'] = {
  errorsFound: [],
  new: [],
  noUpdate: [],
  updated: [],
};

export default ({
  clinicalSubmissions,
  onCloseClick,
  onActionClick,
  onCancelClick,
}: {
  clinicalSubmissions: GqlClinicalSubmissionData;
  onCloseClick: React.ComponentProps<typeof Modal>['onCloseClick'];
  onActionClick: React.ComponentProps<typeof Modal>['onActionClick'];
  onCancelClick: React.ComponentProps<typeof Modal>['onCancelClick'];
}) => {
  const theme = useTheme();

  const FIRST_COLUMN_ACCESSOR = '__';

  type Entry = {
    [k: string]: number | JSX.Element;
  };

  const newDataRow: Entry = {
    [FIRST_COLUMN_ACCESSOR]: (
      <>
        <StatArea.StarIcon fill={FILE_STATE_COLORS.NEW} />
        New
      </>
    ),
    ...clinicalSubmissions.clinicalEntities.reduce<{ [k: string]: string }>(
      (acc, entity) => ({
        ...acc,
        [entity.clinicalType]: String((entity.stats || defaultStats).new.length),
      }),
      {},
    ),
  };

  const updatedDataRow: Entry = {
    [FIRST_COLUMN_ACCESSOR]: (
      <>
        <StatArea.StarIcon fill={FILE_STATE_COLORS.UPDATED} />
        Updated
      </>
    ),
    ...clinicalSubmissions.clinicalEntities.reduce<{ [k: string]: string }>(
      (acc, entity) => ({
        ...acc,
        [entity.clinicalType]: String((entity.stats || defaultStats).updated.length),
      }),
      {},
    ),
  };

  const columns: TableColumnConfig<Entry>[] = [
    // this is the first column
    {
      accessor: FIRST_COLUMN_ACCESSOR,
      width: 100,
    },
    ...clinicalSubmissions.clinicalEntities.map(
      entity =>
        ({
          accessor: entity.clinicalType,
          Header: capitalize(entity.clinicalType.split('_').join(' ')),
        } as TableColumnConfig<Entry>),
    ),
  ];

  return (
    <Modal
      actionButtonText="yes, sign off"
      title="Are you sure you want to sign-off your clinical submission?"
      onCloseClick={onCloseClick}
      onActionClick={onActionClick}
      onCancelClick={onCancelClick}
    >
      <div>
        The DCC will be notified of the following updates to previously released data and your
        submission will be locked. Once your submission is approved by the DCC, your clinical data
        will be placed in a queue for the next release.
      </div>
      <div
        css={css`
          margin: 10px 5px;
        `}
      >
        <Typography color="secondary" bold variant="sectionHeader">
          Clinical Submission Summary
        </Typography>
      </div>
      <Table
        stripped={false}
        highlight={false}
        resizable={false}
        showPagination={false}
        sortable={false}
        getTdProps={(_, row, column) => {
          const isUpdateRow = row.index === 1;
          const isFirstColumn = column.id === FIRST_COLUMN_ACCESSOR;
          return {
            style: {
              background:
                row.original[column.id] > 0 || isFirstColumn
                  ? isUpdateRow
                    ? theme.colors.accent3_3
                    : theme.colors.accent2_4
                  : null,
            } as React.CSSProperties,
          };
        }}
        columns={columns}
        data={[newDataRow, updatedDataRow]}
      />
    </Modal>
  );
};
