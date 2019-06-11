import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Radio from '.';
import { boolean, button } from '@storybook/addon-knobs';
import RadioCheckbox from '.';
import { action } from '@storybook/addon-actions';
import Hook from '../../utils/Hook';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    disabled,
  };
};

const RadioStories = storiesOf(`${__dirname}`, module).add('Radio', () => (
  <Hook
    initialState={false}
    render={([isChecked, setChecked]) => (
      <RadioCheckbox
        type="radio"
        {...createKnobs()}
        checked={isChecked}
        onChange={() => {
          console.log('isChceked', isChecked);
          setChecked(!isChecked);
        }}
      >
        My Selection
      </RadioCheckbox>
    )}
  />
));

export default RadioStories;
