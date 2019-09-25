
import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import Progress from '.';
import { ProgressItem, PROGRESS_STATUS } from '.';
import { text, select, boolean } from '@storybook/addon-knobs';

const ProgressItemStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const state = select('state', PROGRESS_STATUS, PROGRESS_STATUS.SUCCESS);
    const title = text('text', 'Upload');
    const completed = boolean('completed', false);

    return (
      <Progress>
        <ProgressItem text={title} state={state} completed={completed} />
      </Progress>
    );
  })
  .add('Progress Bar', () => {
    const knobs = (index = 0, state = PROGRESS_STATUS.SUCCESS, title = 'Success') => ({
      state: select(`${index} - state`, PROGRESS_STATUS, state),
      text: text(`${index} - text`, title),
      completed: boolean(`${index} - completed`, false),
    });

    return (
      <Progress>
        <ProgressItem {...knobs(0)} />
        <ProgressItem {...knobs(1, PROGRESS_STATUS.PENDING, 'Pending')} />
        <ProgressItem {...knobs(2, PROGRESS_STATUS.DISABLED, 'Disabled')} />
        <ProgressItem {...knobs(3, PROGRESS_STATUS.ERROR, 'Error')} />
      </Progress>
    );
  });

export default ProgressItemStories;
