import { storiesOf } from '@storybook/react';
import React from 'react';
import NoData from '.';
import { text } from '@storybook/addon-knobs';

const NoDataStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <NoData
    title={text('title', 'You do not have any registration data uploaded.')}
    subtitle={text('subtitle', 'Follow the instructions above to get started.')}
  >
    <img alt="Chemistry beakers" src="/static/beakers.svg" />
  </NoData>
));

export default NoDataStories;
