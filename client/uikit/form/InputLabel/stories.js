import { storiesOf } from '@storybook/react';
import React from 'react';
import InputLabel from '.';

const InputLabelStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <InputLabel>Skeleton</InputLabel>
));

export default InputLabelStories;
