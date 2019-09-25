import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, radios, select } from '@storybook/addon-knobs';

import Input, { INPUT_PRESETS } from '.';
import Icon from '../../Icon';
import { action } from '@storybook/addon-actions';

const createKnobs = () => {
  const disabled = boolean('disabled', false);
  const placeholder = text('Placeholder', 'Start typing here..');
  const showClear = boolean('showClear', false);
  const size = radios(
    'size',
    {
      sm: 'sm',
      lg: 'lg',
    },
    'sm',
  );
  return {
    showClear,
    disabled,
    placeholder,
    size,
  };
};

const InputStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const props = createKnobs();
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '200px' }}>
        <Input
          aria-label="demo-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => setValue(e.target.value)}
          {...props}
        />
      </div>
    );
  })
  .add('With preset', () => {
    const preset = select('preset', [null, ...Object.values(INPUT_PRESETS)], null);
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '200px' }}>
        <Input
          aria-label="demo-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => setValue(e.target.value)}
          preset={preset}
        />
      </div>
    );
  })
  .add('With icon', () => {
    const props = createKnobs();
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '200px' }}>
        <Input
          aria-label="demo-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => setValue(e.target.value)}
          {...props}
          icon={<Icon name="search" />}
        />
      </div>
    );
  });

export default InputStories;
