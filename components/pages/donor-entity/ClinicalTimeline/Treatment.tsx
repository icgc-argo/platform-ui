import { css, Table, TableV8, Typography } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { createRef } from 'react';
import { TreatmentNode } from '../types';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

const Treatment = ({ treatment }: { key: string; treatment: TreatmentNode }) => {
  const {
    node: { treatment_type: title, data: tableData },
  } = treatment;

  // react table v6
  const tableColumns_legacy = Object.keys(tableData[0]).map((k) => ({
    Header: k,
    accessor: k,
  }));
  const containerRef = createRef<HTMLDivElement>();

  // react table v8
  const tableColumns = Object.keys(tableData[0]).map((k) => ({
    header: () => k,
    accessorKey: k,
  }));

  return (
    <div
      css={css`
        margin: 14px 0 4px 0;
      `}
    >
      <Typography
        variant="navigation"
        as="div"
        css={css`
          margin-bottom: 4px;
        `}
      >
        {title}
      </Typography>
      <div ref={containerRef}>
        {FEATURE_REACT_TABLE_V8_ENABLED ? (
          <TableV8
            // @ts-expect-error TODO: fix old TS error, breaking build
            columns={tableColumns}
            data={tableData}
            withHeaders
            withSideBorders
            withStripes
          />
        ) : (
          <Table
            parentRef={containerRef}
            columns={tableColumns_legacy}
            data={tableData}
            withOutsideBorder
            stripped
            showPagination={false}
            sortable={false}
          />
        )}
      </div>
    </div>
  );
};

export default Treatment;
