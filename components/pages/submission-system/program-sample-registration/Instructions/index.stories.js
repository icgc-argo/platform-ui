// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import Instructions from '.';
import { text, boolean } from '@storybook/addon-knobs';

const InstructionsStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Instructions registrationEnabled={boolean('registrationEnabled', false)}>Skeleton</Instructions>
));

export default InstructionsStories;
