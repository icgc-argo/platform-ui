// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import InstructionBox from '.';

const InstructionBoxStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <InstructionBox footer={'some content'} steps={[1, 2, 3]} />
));

export default InstructionBoxStories;
