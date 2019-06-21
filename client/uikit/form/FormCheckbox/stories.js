import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import FormCheckbox from '.';
import { boolean, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
  const [selectedItems, setSelected] = React.useState(new Set([]));

  return React.cloneElement(children, {
    isChecked: item => selectedItems.has(item),
    onChange: value => {
      selectedItems.has(value) ? selectedItems.delete(value) : selectedItems.add(value);
      const newSelectedItems = new Set(selectedItems);
      action('checkbox clicked')(value, Array.from(newSelectedItems));
      setSelected(newSelectedItems);
    },
  });
};

const CheckboxStories = storiesOf(`${__dirname}`, module)
  .add('Default', () => <FormCheckbox {...createKnobs()}>Item</FormCheckbox>)
  .add('Checkbox Group', () => (
    <WithState>
      <RadioCheckboxGroup
        {...createGroupKnobs()}
        onChange="[parent func]"
        isChecked="[parent func]"
      >
        <FormCheckbox value="sausage">Sausage</FormCheckbox>
        <FormCheckbox value="rashers">Rashers</FormCheckbox>
        <FormCheckbox value="black_pudding">Black Pudding</FormCheckbox>
        <div>
          <FormCheckbox value="grilled_tomato">Grilled Tomato</FormCheckbox>
          <FormCheckbox value="tayto_crisps">Tayto Crisps</FormCheckbox>
          <FormCheckbox value="three_in_one">3-in-1</FormCheckbox>
        </div>
      </RadioCheckboxGroup>
    </WithState>
  ));

export default CheckboxStories;
