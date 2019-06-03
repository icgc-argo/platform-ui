import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '../../Button';
import Hook from '.';
import readme from './readme.md';

const HookStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => (
    <Hook
      initialState={0}
      effect={action('effect')}
      watch={num => [num]}
      render={([num, setNum]) => (
        <div>
          <div>{num}</div>
          <Button onClick={() => setNum(num + 1)}>Increment</Button>
          <Button onClick={() => setNum(num - 1)}>Decrement</Button>
        </div>
      )}
    />
  ),
  {
    info: {
      text: `${readme}`,
    },
  },
);

export default HookStories;
