import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Checkbox, { CheckboxGroup } from '.';
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
      setSelected(new Set(selectedItems));
    },
  });
};

const CheckboxStories = storiesOf(`${__dirname}`, module)
  .add('Default', () => <Checkbox {...createKnobs()}>Item</Checkbox>)
  .add('Checkbox Group', () => (
    <WithState>
      <CheckboxGroup onChange="[parent func]" selectedItems="[parent func]">
        <Checkbox value="sausage">Sausage</Checkbox>
        <Checkbox value="rashers">Rashers</Checkbox>
        <Checkbox value="black_pudding">Black Pudding</Checkbox>
        <Checkbox value="grilled_tomato">Grilled Tomato</Checkbox>
      </CheckboxGroup>
    </WithState>
  ));

export default CheckboxStories;
