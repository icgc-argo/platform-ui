import { css } from 'uikit';
import Table from 'uikit/Table';

type TableData = Array<{ key: string; val: any }>;

export default ({ data }: { data: TableData }) => (
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
      data={data}
      columns={[
        { sortable: false, accessor: 'key', style: { whiteSpace: 'unset' } },
        { accessor: 'val', style: { whiteSpace: 'unset' } },
      ]}
    />
  </div>
);
