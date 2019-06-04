import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, radios, select } from '@storybook/addon-knobs';

import Input, { INPUT_PRESETS } from '.';
import Icon from '../../Icon';
import { action } from '@storybook/addon-actions';

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

const InputStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const props = createKnobs();
    return (
      <div style={{ width: '200px' }}>
        <Input onChange={action('onChange')} {...props} />
      </div>
    );
  })
  .add('With preset', () => {
    const preset = select('preset', [null, ...Object.values(INPUT_PRESETS)], null);
    return (
      <div style={{ width: '200px' }}>
        <Input onChange={action('onChange')} preset={preset} />
      </div>
    );
  })
  .add('With icon', () => {
    const props = createKnobs();
    return (
      <div style={{ width: '200px' }}>
        <Input onChange={action('onChange')} {...props} icon={<Icon name="search" />} />
      </div>
    );
  });

export default InputStories;
