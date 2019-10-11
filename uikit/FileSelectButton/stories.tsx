import { storiesOf } from '@storybook/react';
import React from 'react';
import FileSelectButton from '.';
import { action } from '@storybook/addon-actions';

const FileSelectButtonStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return (
    <FileSelectButton
      inputProps={{
        accept: '.tsv',
      }}
      onFilesSelect={action('onFilesSelect')}
    >
      Click me!!! and check out the Actions tab
    </FileSelectButton>
  );
});

export default FileSelectButtonStories;
