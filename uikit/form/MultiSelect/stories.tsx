import React from 'react';
import { storiesOf } from '@storybook/react';
import MultiSelect, { Option } from '.';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { INPUT_SIZES } from '../common';

const MultiSelectStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const [value, setValue] = React.useState([]);
  return (
    <MultiSelect
      aria-label="multi-select"
      value={value}
      onChange={event => {
        action('value change')(event);
        setValue(event.target.value);
      }}
      onBlur={event => {
        action('onBlur')(event);
      }}
      disabled={boolean('disabled', false)}
      error={boolean('error', false)}
      single={boolean('single', false)}
      allowNew={boolean('allowNew', false)}
      size={select('size', INPUT_SIZES, INPUT_SIZES.SM)}
    >
      <Option value="Afghanistan">Afghanistan</Option>
      <Option value="Albania">Albania</Option>
      <Option value="Algeria">Algeria</Option>
      <Option value="Andorra">Andorra</Option>
      <Option value="Angola">Angola</Option>
      <Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
      <Option value="Argentina">Argentina</Option>
      <Option value="Armenia">Armenia</Option>
      <Option value="Austria">Austria</Option>
      <Option value="Australia">Australia</Option>
      <Option value="Azerbaijan">Azerbaijan</Option>
      <Option value="Bahamas">Bahamas</Option>
      <Option value="Bahrain">Bahrain</Option>
      <Option value="Bangladesh">Bangladesh</Option>
      <Option value="Barbados">Barbados</Option>
      <Option value="Belarus">Belarus</Option>
      <Option value="Cambodia">Cambodia</Option>
      <Option value="Cameroon">Cameroon</Option>
      <Option value="Canada">Canada</Option>
    </MultiSelect>
  );
});
export default MultiSelectStories;
