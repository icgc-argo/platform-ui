import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, radios } from '@storybook/addon-knobs';

import Select from '.';

const createKnobs = () => {
  const error = boolean('error', false);
  const disabled = boolean('disabled', false);
  const placeholder = text('Placeholder', '- Select an option -');
  const errorMessage = text('Error Message', 'Please fill out the required field.');
  const size = radios(
    'size',
    {
      sm: 'sm',
      lg: 'lg',
    },
    'sm',
  );
  const hintText = text('Hint Text', '');

  return {
    error,
    errorMessage,
    disabled,
    placeholder,
    size,
    hintText,
  };
};

const InputStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = createKnobs();
  const [value, setValue] = React.useState('');
  const [valueTwo, setValueTwo] = React.useState('');
  const onBlur = () => action('blur')();
  return (
    <div style={{ width: '200px' }}>
      <Select
        aria-label="demo-select"
        options={[
          { content: 'Value 1', value: 'v1' },
          { content: 'Value 2', value: 'v2' },
          { content: 'Value 3', value: 'v3' },
          { content: 'Value 4', value: 'v4' },
        ]}
        onChange={val => {
          setValue(val);
          action('onChange')();
        }}
        value={value}
        onBlur={onBlur}
        {...knobs}
      />
      <Select
        aria-label="demo-select"
        value={valueTwo}
        options={[
          { content: 'Value 1', value: 'v1' },
          { content: 'Value 2', value: 'v2' },
          { content: 'Value 3', value: 'v3' },
          { content: 'Value 4', value: 'v4' },
        ]}
        onChange={val => {
          setValueTwo(val);
          action('onChange')();
        }}
        onBlur={onBlur}
        {...knobs}
      />
    </div>
  );
});

export default InputStories;
