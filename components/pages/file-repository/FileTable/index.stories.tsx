import { storiesOf } from '@storybook/react';
import React from 'react';
import FileRepositoryTable from './index';
import { dummyData } from './dummyData';
import { boolean } from '@storybook/addon-knobs';

export const createKnobs = () => {
  const lockAllDownLoads = boolean('is the user logged in', false);

  return {
    userLoggedIn: lockAllDownLoads,
  };
};

const FileRepositoryTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const props = createKnobs();
  return <FileRepositoryTable />;
});

export default FileRepositoryTableStories;
