import { storiesOf } from '@storybook/react';
import React from 'react';
import FormControl from '.';
import FormHelperText from '../FormHelperText';
import MultiSelect, { Option } from '../../form/MultiSelect';

function Basic() {
  const [countries, setCountries] = React.useState('');

  const handleChange = event => {
    setCountries(event.target.value);
  };

  return (
    <FormControl error>
      <MultiSelect value={countries} onChange={handleChange} placeholder="Add one or more...">
        <Option value="Australia">Australia</Option>
        <Option value="Cambodia">Cambodia</Option>
        <Option value="Cameroon">Cameroon</Option>
        <Option value="Canada">Canada</Option>
      </MultiSelect>
      <FormHelperText>Some helper text</FormHelperText>
    </FormControl>
  );
}

const FormControlStories = storiesOf(`${__dirname}`, module).add('Basic', () => <Basic />);

export default FormControlStories;
