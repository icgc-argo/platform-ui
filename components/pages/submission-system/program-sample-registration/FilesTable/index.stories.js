// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import FilesTable from '.';

const FilesTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <FilesTable data={[]} columns={[]}>
    Skeleton
  </FilesTable>
));

export default FilesTableStories;
