// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import ProgressItem from '.';
import { PROGRESS_STATUS } from '.';
import { text, select } from '@storybook/addon-knobs';

const ProgressItemStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ProgressItem
    text={text('Text', 'Upload')}
    state={select('State', PROGRESS_STATUS, PROGRESS_STATUS.SUCCESS, '')}
  />
));

export default ProgressItemStories;
