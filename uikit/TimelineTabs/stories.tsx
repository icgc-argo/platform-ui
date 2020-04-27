import { storiesOf } from '@storybook/react';
import React from 'react';
import TimelineTabs from '.';

const TimelineTabsStories = storiesOf(`${__dirname}`, module).add('Basic', () => <TimelineTabs />);

export default TimelineTabsStories;
