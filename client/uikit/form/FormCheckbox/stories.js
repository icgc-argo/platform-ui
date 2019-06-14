import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import FormCheckbox, { CheckboxGroup } from '.';
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

const WithState = ({ children }) => {
  const [selectedItems, setSelected] = React.useState(new Set([]));

  return React.cloneElement(children, {
    selectedItems,
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
      <CheckboxGroup onChange="[parent func]" selectedItems="[parent func]">
        <FormCheckbox value="sausage">Sausage</FormCheckbox>
        <FormCheckbox value="rashers">Rashers</FormCheckbox>
        <FormCheckbox value="black_pudding">Black Pudding</FormCheckbox>
        <FormCheckbox value="grilled_tomato">Grilled Tomato</FormCheckbox>
      </CheckboxGroup>
    </WithState>
  ));

export default CheckboxStories;
