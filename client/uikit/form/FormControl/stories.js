import { storiesOf } from '@storybook/react';
import React from 'react';
import FormControl from '.';
import FormHelperText from '../FormHelperText';
import InputLabel from '../InputLabel';
import MultiSelect, { Option } from '../../form/MultiSelect';
import { boolean } from '@storybook/addon-knobs';

const FormControlStories = storiesOf(`${__dirname}`, module).add('Basic', () =>
  React.createElement(function Basic() {
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
);

export default FormControlStories;
