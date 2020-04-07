import { storiesOf } from '@storybook/react';
import React from 'react';
import FileRepositoryTable from './index';
import { dummyData } from './dummyData';
import { boolean } from '@storybook/addon-knobs';

export const createKnobs = () => {
  const canUserDownLoadFiles = boolean('can user download file', false);

  return {
    disabled: canUserDownLoadFiles,
  };
};

const FileRepositoryTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const props = createKnobs();
  return <FileRepositoryTable fileRepoEntries={dummyData} userHasAccess={props.disabled} />;
});

export default FileRepositoryTableStories;
