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
      <ProgressItem text="Successfully Long Text" state={PROGRESS_STATUS.SUCCESS} completed />
      <ProgressItem text="Pending" state={PROGRESS_STATUS.PENDING} />
      <ProgressItem text="Error" state={PROGRESS_STATUS.ERROR} />
      <ProgressItem text="Disabled" state={PROGRESS_STATUS.DISABLED} />
    </Progress>
  ));

export default ProgressItemStories;
