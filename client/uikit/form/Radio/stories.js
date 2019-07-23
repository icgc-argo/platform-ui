import { storiesOf } from '@storybook/react';
import React from 'react';
import Radio from '.';
import { boolean, button } from '@storybook/addon-knobs';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const ariaChecked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    'aria-checked': ariaChecked.toString(),
    disabled,
  };
};
const RadioStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Radio {...createKnobs()} aria-label="radio" />
));

export default RadioStories;
