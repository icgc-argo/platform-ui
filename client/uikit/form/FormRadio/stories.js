import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { boolean, button } from '@storybook/addon-knobs';
import FormRadio, { RadioGroup } from '.';
import { action } from '@storybook/addon-actions';
import Hook from '../../utils/Hook';
import Checkbox from '../FormCheckbox';

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
  .add('Radio', () => <FormRadio {...createKnobs()}>Single Radio Button</FormRadio>)
  .add('Radio Group', () => (
    <WithState>
      <RadioGroup onChange="[parent func]" selectedItem="[parent func]">
        <FormRadio value="one">One</FormRadio>
        <FormRadio value="two">Two</FormRadio>
        <FormRadio value="three">Three</FormRadio>
        <FormRadio value="four">Four</FormRadio>
        <FormRadio value="five">Five</FormRadio>
        <FormRadio value="six">Six</FormRadio>
      </RadioGroup>
    </WithState>
  ));

export default RadioStories;
