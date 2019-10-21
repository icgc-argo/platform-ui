import * as React from 'react';
import { GqlClinicalSubmissionData } from './types';
import { capitalize } from 'global/utils/stringUtils';
import Table, { TableColumnConfig } from 'uikit/Table';
import { StatArea } from '../common';
import { FILE_STATE_COLORS } from './FilesNavigator/FileRecordTable';
import { useTheme } from 'uikit/ThemeProvider';

const defaultStats: GqlClinicalSubmissionData['clinicalEntities'][0]['stats'] = {
  errorsFound: [],
  new: [],
  noUpdate: [],
  updated: [],
};

export default ({ clinicalSubmissions }: { clinicalSubmissions: GqlClinicalSubmissionData }) => {
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
    <Table
      variant="STATIC"
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
  );
};
