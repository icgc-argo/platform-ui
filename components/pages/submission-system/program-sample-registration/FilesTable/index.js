// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Table from 'uikit/Table';

import type { T_TableProps } from 'uikit/Table';

type T_FileEntry = { [k: string]: string | number | boolean };
const FilesTable = (props: T_TableProps<T_FileEntry>) => {
  return (
    <Table
      columns={[
        {
          id: 'id',
        },
        ...props.columns,
      ]}
      data={props.data}
    />
  );
};

export default FilesTable;
