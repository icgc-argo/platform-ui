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

const RadioStories = storiesOf(`${__dirname}`, module)
  .add('Radio', () => <FormRadio {...createKnobs()}>Single Radio Button</FormRadio>)
  .add('Radio Group', () => {
    const [selectedItem, setSelected] = React.useState('one');
    const onChange = value => {
      action('radio button clicked')(value);
      setSelected(value);
    };
    const isChecked = item => item === selectedItem;

    return (
      <RadioCheckboxGroup {...createGroupKnobs()} onChange={onChange} isChecked={isChecked}>
        <FormRadio value="one">One</FormRadio>
        <FormRadio value="two">Two</FormRadio>
        <FormRadio value="three">Three</FormRadio>
        <div>
          <FormRadio value="four">Four</FormRadio>
        </div>
        <FormRadio value="five">Five</FormRadio>
        <div>
          <FormRadio value="six">Six</FormRadio>
        </div>
      </RadioCheckboxGroup>
    );
  });

export default RadioStories;
