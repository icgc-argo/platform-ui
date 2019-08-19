// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Table from 'uikit/Table';

import type { TableProps } from 'uikit/Table';

type FileEntry = { [k: string]: string | number | boolean };
const FilesTable = (props: TableProps<FileEntry>) => {
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
