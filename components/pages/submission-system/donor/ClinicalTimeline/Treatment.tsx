import { css } from '@emotion/core';
import React, { createRef } from 'react';
import Table from '@icgc-argo/uikit/Table';
import Typography from '@icgc-argo/uikit/Typography';

export interface ITreatment {
  type: string;
  data: { [key: string]: any }[];
}
const Treatment = ({ treatment }: { treatment: ITreatment }) => {
  const title = treatment.type;
  const tableCols = Object.keys(treatment.data[0]).map((k) => ({ Header: k, accessor: k }));
  const tableData = treatment.data;
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
