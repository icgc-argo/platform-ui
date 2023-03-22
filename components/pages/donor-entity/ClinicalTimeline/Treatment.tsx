import { ColumnDef, css, Table, TableV8, Typography } from '@icgc-argo/uikit';
import { createRef } from 'react';
import { getConfig } from 'global/config';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

// NOTE types based on dummy data
export type TreatmentTableColumns = {
  drug_rxnormcui: string;
  drug_name: string;
  cumulative_drug_dose: string;
  chemotherapy_dosage_units: string;
};
type TreatmentTableInput = {
  treatment_type: string;
  data: TreatmentTableColumns[];
};

const Treatment = ({ treatment }: { treatment: TreatmentTableInput }) => {
  const { treatment_type, data: tableData } = treatment;

  // react table v6
  const tableColumnsTableV6 = Object.keys(tableData[0]).map((k) => ({
    Header: k,
    accessor: k,
  }));
  const containerRef = createRef<HTMLDivElement>();

  // react table v8
  const tableColumns: ColumnDef<TreatmentTableColumns>[] = Object.keys(tableData[0]).map(
    (treatmentKey: keyof TreatmentTableColumns) => ({
      accessorKey: treatmentKey,
    }),
  );

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
        {treatment_type}
      </Typography>
      <div ref={containerRef}>
        {FEATURE_REACT_TABLE_V8_ENABLED ? (
          <TableV8
            columns={tableColumns}
            data={tableData}
            withHeaders
            withResize
            withSideBorders
            withStripes
          />
        ) : (
          <Table
            parentRef={containerRef}
            columns={tableColumnsTableV6}
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
