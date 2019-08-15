// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import ProgressItem from '.';
import { PROGRESS_STATUS } from '.';

const ProgressItemStories = storiesOf(`${__dirname}`, module).add('Success', () => (
  <ProgressItem text="upload" state={PROGRESS_STATUS.SUCCESS} />
));

export default ProgressItemStories;
