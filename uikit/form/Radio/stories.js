// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import Radio from '.';
import { boolean, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

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
  <Radio {...createKnobs()} onChange={action('radio on change')} aria-label="radio" />
));

export default RadioStories;
