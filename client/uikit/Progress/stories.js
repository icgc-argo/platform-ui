// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import Progress from '.';
import { ProgressItem, PROGRESS_STATUS } from '.';
import { text, select } from '@storybook/addon-knobs';

const ProgressItemStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => (
    <ProgressItem
      text={text('Text', 'Upload')}
      state={select('State', PROGRESS_STATUS, PROGRESS_STATUS.SUCCESS, '')}
    />
  ))
  .add('Progress Bar', () => (
    <Progress>
      <ProgressItem text="Upload" state={PROGRESS_STATUS.SUCCESS} />
      <ProgressItem text="Register" state={PROGRESS_STATUS.PENDING} />
    </Progress>
  ));

export default ProgressItemStories;
