import { storiesOf } from '@storybook/react';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Toast, { TOAST_VARIANTS, TOAST_INTERACTION } from '.';

const ToastStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select('variant', [undefined, ...Object.values(TOAST_VARIANTS)], undefined);
  const title = text('title', 'Hipster Ipsum');
  const content = text(
    'content',
    'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  );
  return (
    <Toast
      variant={variant}
      title={title}
      content={content}
      onInteraction={action('onInteraction')}
    />
  );
});

export default ToastStories;
