// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Table from 'uikit/Table';

import Typography from 'uikit/Typography';
import type { TableProps } from 'uikit/Table';
import Button from 'uikit/Button';
import { css } from 'uikit';

type FileEntry = { [k: string]: string | number | boolean };
const FilesTable = (props: TableProps<FileEntry>) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Typography variant="subtitle2">File Preview</Typography>
        <Button variant="text">Clear</Button>
      </div>
      <Table
        columns={[
          {
            id: 'id',
          },
          ...props.columns,
        ]}
        data={props.data}
      />
    </>
  );
};

export default FilesTable;
