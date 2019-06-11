import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { boolean, button } from '@storybook/addon-knobs';
import Radio, { RadioGroup } from '.';
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
      <RadioGroup onChange={() => console.log('radio group')} selectedItem="two">
        <Radio {...createKnobs()} value="one">
          One
        </Radio>
        <Radio {...createKnobs()} value="two">
          Two
        </Radio>
      </RadioGroup>
    )}
  />
));

export default RadioStories;
