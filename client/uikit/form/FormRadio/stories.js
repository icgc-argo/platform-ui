import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { boolean, button } from '@storybook/addon-knobs';
import FormRadio from '.';
import { action } from '@storybook/addon-actions';
import Hook from '../../utils/Hook';
import Checkbox from '../FormCheckbox';
import RadioCheckboxGroup from '../RadioCheckboxGroup';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    disabled,
  };
};

const createGroupKnobs = () => {
  const hasError = boolean('hasError', false);
  return { hasError };
};

const WithState = ({ children }) => {
  const [selectedItem, setSelected] = React.useState('one');

  return React.cloneElement(children, {
    selectedItem,
    isChecked: item => item === selectedItem,
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
      <RadioCheckboxGroup
        {...createGroupKnobs()}
        onChange="[parent func]"
        selectedItem="[parent func]"
      >
        <FormRadio value="one">One</FormRadio>
        <FormRadio value="two">Two</FormRadio>
        <FormRadio value="three">Three</FormRadio>
        <FormRadio value="four">Four</FormRadio>
        <FormRadio value="five">Five</FormRadio>
        <FormRadio value="six">Six</FormRadio>
      </RadioCheckboxGroup>
    </WithState>
  ));

export default RadioStories;
