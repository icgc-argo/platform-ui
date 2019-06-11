import { storiesOf } from '@storybook/react';
import React from 'react';
import FormControl from '.';
import FormHelperText from '../FormHelperText';
import InputLabel from '../InputLabel';
import MultiSelect, { Option } from '../../form/MultiSelect';
import { boolean } from '@storybook/addon-knobs';
import Input from '../../form/Input';

function WithState({ children }) {
  const [value, setValue] = React.useState([]);

  return React.cloneElement(children, {
    value,
    onChange: event => setValue(event.target.value),
  });
}

const FormControlStories = storiesOf(`${__dirname}`, module)
  .add('MultiSelect', () => (
    <FormControl error={boolean('error', true)} required={boolean('required', true)}>
      <InputLabel htmlFor="country">Country</InputLabel>
      <WithState>
        <MultiSelect
          inputProps={{ id: 'country' }}
          value="[parent state]"
          onChange="[parent setter]"
          placeholder="Add one or more..."
        >
          <Option value="Australia">Australia</Option>
          <Option value="Cambodia">Cambodia</Option>
          <Option value="Cameroon">Cameroon</Option>
          <Option value="Canada">Canada</Option>
        </MultiSelect>
      </WithState>
      <FormHelperText>Some helper text</FormHelperText>
    </FormControl>
  ))
  .add('Input', () => (
    <FormControl
      required={boolean('required', true)}
      disabled={boolean('disabled', false)}
      error={boolean('error', true)}
    >
      <InputLabel htmlFor="text-input">text input</InputLabel>
      <Input aria-label="text input" id="text-input" placeholder="put some text" />
      <FormHelperText>Some helper text</FormHelperText>
    </FormControl>
  ));

export default FormControlStories;
