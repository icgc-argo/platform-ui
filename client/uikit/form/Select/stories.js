import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '.';
import { text, boolean, radios } from '@storybook/addon-knobs';

const createKnobs = () => {
  const error = boolean('error', false);
  const disabled = boolean('disabled', false);
  const placeholder = text('Placeholder', 'Start typing here..');
  const errorMessage = text('Error Message', 'Please fill out the required field.');
  const size = radios(
    'size',
    {
      sm: 'sm',
      lg: 'lg',
    },
    'sm',
  );

  return {
    error,
    errorMessage,
    disabled,
    placeholder,
    size,
  };
};

const InputStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <div style={{ width: '200px' }}>
    <Select />
  </div>
));

export default InputStories;
