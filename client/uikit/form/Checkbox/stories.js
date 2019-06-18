import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox from '.';
import { boolean, button } from '@storybook/addon-knobs';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    disabled,
  };
};
const CheckboxStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <Checkbox {...createKnobs()} />
));

export default CheckboxStories;
