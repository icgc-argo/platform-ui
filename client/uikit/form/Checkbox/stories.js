import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
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

const CheckboxStories = storiesOf(`${__dirname}`, module).add('Default', () => <div>Checkbox</div>);

export default CheckboxStories;
