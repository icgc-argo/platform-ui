import {
  createColumnHelper,
  NotificationVariant,
  NOTIFICATION_VARIANTS,
  Table,
  TableV8,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { createRef } from 'react';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

export type ErrorNotificationDefaultColumns = {
  donorId: string;
  field: string;
  message: string;
  row: number;
  value: string;
};

export const errorNotificationTableProps = {
  withHeaders: true,
  withResize: true,
  withSorting: true,
  withStripes: true,
  withRowHighlight: true,
};

export const getDefaultColumns = (
  level: NotificationVariant,
): {
  id: keyof ErrorNotificationDefaultColumns;
  header: string;
  maxSize?: number;
}[] => {
  const variant = level === NOTIFICATION_VARIANTS.ERROR ? 'Error' : 'Warning';
  return [
    { id: 'row', header: 'Line #', maxSize: 70 },
    {
      id: 'donorId',
      header: 'Submitter Donor ID',
      maxSize: 160,
    },
    {
      id: 'field',
      header: `Field with ${variant}`,
      maxSize: 200,
    },
    {
      id: 'value',
      header: `${variant} Value`,
      maxSize: 130,
    },
    {
      id: 'message',
      header: `${variant} Description`,
    },
  ];
};

const ErrorNotificationDefaultTable = ({
  data,
  level,
}: {
  data: ErrorNotificationDefaultColumns[];
  level: NotificationVariant;
}) => {
  const columnHelper = createColumnHelper<ErrorNotificationDefaultColumns>();
  const defaultColumns = getDefaultColumns(level);
  const tableColumns = defaultColumns.map((column) => columnHelper.accessor(column.id, column));

  const containerRef_legacy = createRef<HTMLDivElement>();

  return FEATURE_REACT_TABLE_V8_ENABLED ? (
    <TableV8 columns={tableColumns} data={data} {...errorNotificationTableProps} />
  ) : (
    <div ref={containerRef_legacy}>
      <Table
        parentRef={containerRef_legacy}
        columns={tableColumns.map(
          ({
            accessorKey,
            header,
            size,
          }: {
            accessorKey: string;
            header: string;
            size: number;
          }) => ({
            style: {
              whiteSpace: 'pre-line',
            },
            // react table v6 property name conversion
            accessor: accessorKey,
            Header: header,
            width: size,
          }),
        )}
        data={data}
      />
    </div>
  );
};

export default ErrorNotificationDefaultTable;
