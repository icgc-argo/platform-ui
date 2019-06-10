import { storiesOf } from '@storybook/react';
import React from 'react';
import FormControl from '.';
import FormHelperText from '../FormHelperText';
import InputLabel from '../InputLabel';
import MultiSelect, { Option } from '../../form/MultiSelect';
import { boolean } from '@storybook/addon-knobs';
import Input from '../../form/Input';

const FormControlStories = storiesOf(`${__dirname}`, module)
  .add('MultiSelect', () =>
    React.createElement(function() {
      const [countries, setCountries] = React.useState('');

      const handleChange = event => {
        setCountries(event.target.value);
      };

      return (
        <FormControl error={boolean('error', true)} required={boolean('required', true)}>
          <InputLabel htmlFor="country">Country</InputLabel>
          <MultiSelect
            inputProps={{ id: 'country' }}
            value={countries}
            onChange={handleChange}
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
    }),
  )
  .add('Input', () =>
    React.createElement(function() {
      return (
        <FormControl error={boolean('error', true)} required={boolean('required', true)}>
          <InputLabel htmlFor="text-input">text input</InputLabel>
          <Input id="text-input" />
          <FormHelperText>Some helper text</FormHelperText>
        </FormControl>
      );
    }),
  );

export default FormControlStories;
