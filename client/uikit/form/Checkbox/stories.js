// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox from '.';
import { boolean, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    disabled,
  };
};

const CheckboxStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Checkbox {...createKnobs()} onChange={action('onchange')} aria-label="checkbox" />
));

export default CheckboxStories;
