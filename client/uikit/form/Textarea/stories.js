import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Textarea from '.';
import Icon from '../../Icon';
import { action } from '@storybook/addon-actions';

export default storiesOf(`${__dirname}`, module).add('Basic', () => {
  return (
    <div style={{ width: '400px' }}>
      <Textarea
        aria-label="demo-input"
        onChange={action('onChange')}
        placeholder="type something"
        disabled={boolean('disabled', false)}
        error={boolean('error', false)}
        rows={3}
      />
    </div>
  );
});
