import { storiesOf } from '@storybook/react';
import React from 'react';
import TablePagination from '.';
import _ from 'lodash';
import { boolean } from '@storybook/addon-knobs';

import Table from '..';

export default storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    return (
      <Table
        data={_.times(100, idx => ({
          id: idx,
          prop2: idx,
          prop3: 'some text of ' + idx,
        }))}
        columns={[
          {
            sortable: false,
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Property 2',
            accessor: 'prop2',
          },
          {
            Header: 'Property 3',
            accessor: 'prop3',
          },
        ]}
        showPagination={boolean('showPagination', true)}
        showPageSizeOptions={boolean('showPageSizeOptions', false)}
      />
    );
  },
  {
    info: {
      propTables: [TablePagination],
      propTablesExclude: [Table],
    },
  },
);
