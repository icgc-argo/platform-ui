import { css } from 'uikit';
import Table from 'uikit/Table';

type MappedTableData = Array<{ key: string; val: any }>;

export default ({ data }) => {
  const tableData: MappedTableData = Object.keys(data).map(k => ({ key: k, val: data[k] }));

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Table
        TheadComponent={props => null}
        parentRef={{ current: null }}
        showPagination={false}
        withOutsideBorder
        data={tableData}
        columns={[
          { sortable: false, accessor: 'key', style: { whiteSpace: 'unset' } },
          { accessor: 'val', style: { whiteSpace: 'unset' } },
        ]}
      />
    </div>
  );
};
