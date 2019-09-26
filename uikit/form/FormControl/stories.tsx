import { storiesOf } from '@storybook/react';
import React from 'react';
import FormControl from '.';
import FormHelperText from '../FormHelperText';
import InputLabel from '../InputLabel';
import MultiSelect, { Option } from '../../form/MultiSelect';
import { boolean } from '@storybook/addon-knobs';
import Input from '../../form/Input';

const FormControlStories = storiesOf(`${__dirname}`, module)
  .add(
    'MultiSelect',
    () => {
      const [value, setValue] = React.useState([]);
      return (
        <FormControl
          error={boolean('error', false)}
          required={boolean('required', true)}
          disabled={boolean('disabled', false)}
        >
          <InputLabel htmlFor="country">Country</InputLabel>
          <MultiSelect
            aria-label="multi-select"
            inputProps={{ id: 'country' }}
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="Add one or more..."
          >
            <Option value="Australia">Australia</Option>
            <Option value="Cambodia">Cambodia</Option>
            <Option value="Cameroon">Cameroon</Option>
            <Option value="Canada">Canada</Option>
          </MultiSelect>

          <FormHelperText>Some helper text</FormHelperText>
        </FormControl>
      );
    },
    {
      info: {
        propTablesExclude: [Option, MultiSelect],
      },
    },
  )
  .add(
    'Input',
    () => (
      <FormControl
        required={boolean('required', true)}
        disabled={boolean('disabled', false)}
        error={boolean('error', false)}
      >
        <InputLabel htmlFor="text-input">text input</InputLabel>
        <Input aria-label="text input" id="text-input" placeholder="put some text" />
        <FormHelperText>Some helper text</FormHelperText>
      </FormControl>
    ),
    {
      info: {
        propTablesExclude: [Input],
      },
    },
  );

export default FormControlStories;
