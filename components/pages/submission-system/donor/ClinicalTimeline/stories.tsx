import { storiesOf } from '@storybook/react';
import React from 'react';
import ClinicalTimeline from '.';

const ClinicalTimelineStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <ClinicalTimeline />
));

export default ClinicalTimelineStories;
