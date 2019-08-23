// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import FilesTable from '.';
import NoDataOverlay from './NoData';

const DUMMY_COLS = [
  { Header: 'Program ID' },
  { Header: 'Submitter Donor ID' },
  { Header: 'Gender' },
  { Header: 'Submitter Specimen ID' },
  { Header: 'Specimen Type' },
  { Header: 'Tumour or Normal Designation' },
  { Header: 'Submitter Sample ID' },
  { Header: 'Sample Type' },
];

const FilesTableStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => (
    <FilesTable data={[]} columns={DUMMY_COLS}>
      Skeleton
    </FilesTable>
  ))
  .add('No Data', () => <NoDataOverlay />);

export default FilesTableStories;
