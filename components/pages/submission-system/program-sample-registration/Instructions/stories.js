import { storiesOf } from '@storybook/react';
import React from 'react';
import Instructions from '.';

const InstructionsStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Instructions>Skeleton</Instructions>
));

export default InstructionsStories;
