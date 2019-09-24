import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

import Textarea from '.';
import Icon from '../../Icon';
import { action } from '@storybook/addon-actions';

export default storiesOf(`${__dirname}`, module).add('Basic', () => {
  return (
    <Textarea
      aria-label="demo-input"
      onChange={action('onChange')}
      onBlur={() => '[parent func]'}
      placeholder={text('placeholder', '')}
      disabled={boolean('disabled', false)}
      error={boolean('error', false)}
      rows={3}
    />
  );
});
