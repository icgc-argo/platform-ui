import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { boolean, button } from '@storybook/addon-knobs';
import Radio, { RadioGroup } from '.';
import { action } from '@storybook/addon-actions';
import Hook from '../../utils/Hook';
import Checkbox from '../Checkbox';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    disabled,
  };
};

const WithState = ({ children }) => {
  const [selectedItem, setSelected] = React.useState('one');

  return React.cloneElement(children, {
    selectedItem,
    onChange: value => {
      action('radio button clicked')(value);
      setSelected(value);
    },
  });
};

const RadioStories = storiesOf(`${__dirname}`, module)
  .add('Radio', () => (
    <Radio {...createKnobs()} id="radio_1">
      Single Radio Button
    </Radio>
  ))
  .add('Radio Group', () => (
    <WithState>
      <RadioGroup onChange="[parent func]" selectedItem="[parent func]">
        <Radio value="one">One</Radio>
        <Radio value="two">Two</Radio>
        <Radio value="three">Three</Radio>
      </RadioGroup>
    </WithState>
  ));

export default RadioStories;
