import { storiesOf } from '@storybook/react';
import React from 'react';
import TimelineTab from '.';

const TimelineTabStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <TimelineTab>Skeleton</TimelineTab>
));

export default TimelineTabStories;
