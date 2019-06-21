import { storiesOf } from '@storybook/react';
import React from 'react';
import Toast, { TOAST_VARIANTS, TOAST_INTERACTION_EVENTS, TOAST_INTERACTION } from '.';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

const ToastStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select('variant', [undefined, ...Object.values(TOAST_VARIANTS)], undefined);
  const interactionType = select(
    'interactionType',
    [undefined, ...Object.values(TOAST_INTERACTION)],
    undefined,
  );
  const title = text('title', 'Hipster Ipsum');
  const content = text(
    'content',
    'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  );
  const expandText = text('expandText', undefined);
  const dismissText = text('dismissText', undefined);
  return (
    <>
      <Toast
        variant={variant}
        expandText={expandText}
        dismissText={dismissText}
        interactionType={interactionType}
        title={title}
        content={content}
        onInteraction={action('RECEIVED EVENT')}
      />
      <Toast
        variant={variant}
        expandText={expandText}
        dismissText={dismissText}
        interactionType={interactionType}
        title={title}
        content={content}
        onInteraction={action('RECEIVED EVENT')}
        icon={null}
      />
    </>
  );
});

export default ToastStories;
