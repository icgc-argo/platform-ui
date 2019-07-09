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

function State({ children }) {
  const [value, setValue] = React.useState('');

  return React.cloneElement(children, {
    value,
    onChange: event => {
      action('onChange')(event);
      setValue(event.target.value);
    },
  });
}

const InputStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const props = createKnobs();
    return (
      <div style={{ width: '200px' }}>
        <State>
          <Input
            aria-label="demo-input"
            value="[parent state]"
            onChange={() => '[parent func]'}
            onBlur={() => '[parent func]'}
            {...props}
          />
        </State>
      </div>
    );
  })
  .add('With preset', () => {
    const preset = select('preset', [null, ...Object.values(INPUT_PRESETS)], null);
    return (
      <div style={{ width: '200px' }}>
        <State>
          <Input
            aria-label="demo-input"
            value="[parent state]"
            onChange={() => '[parent func]'}
            onBlur={() => '[parent func]'}
            preset={preset}
          />
        </State>
      </div>
    );
  })
  .add('With icon', () => {
    const props = createKnobs();
    return (
      <div style={{ width: '200px' }}>
        <State>
          <Input
            aria-label="demo-input"
            value="[parent state]"
            onChange={() => '[parent func]'}
            onBlur={() => '[parent func]'}
            {...props}
            icon={<Icon name="search" />}
          />
        </State>
      </div>
    );
  });

export default InputStories;
