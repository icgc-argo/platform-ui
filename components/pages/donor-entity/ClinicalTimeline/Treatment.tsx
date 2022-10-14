import { css, Table, Typography } from '@icgc-argo/uikit';
import { createRef } from 'react';
import { TreatmentNode } from '../types';

const Treatment = ({ treatment }: { key: string; treatment: TreatmentNode }) => {
  const {
    node: { treatment_type: title, data: tableData },
  } = treatment;
  const tableCols = Object.keys(tableData[0]).map((k) => ({
    Header: k,
    accessor: k,
  }));
  const containerRef = createRef<HTMLDivElement>();

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
        <Table
          parentRef={containerRef}
          columns={tableCols}
          data={tableData}
          withOutsideBorder
          stripped
          showPagination={false}
          sortable={false}
        />
      </div>
    </div>
  );
};

export default Treatment;
