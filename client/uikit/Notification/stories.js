import { storiesOf } from '@storybook/react';
import React from 'react';
import Notification, {
  NOTIFICATION_VARIANTS,
  NOTIFICATION_INTERACTION_EVENTS,
  NOTIFICATION_INTERACTION,
  NOTIFICATION_SIZES,
} from '.';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

const NotificationStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select(
    'variant',
    [undefined, ...Object.values(NOTIFICATION_VARIANTS)],
    undefined,
  );
  const interactionType = select(
    'interactionType',
    [undefined, ...Object.values(NOTIFICATION_INTERACTION)],
    undefined,
  );
  const size = select('size', [undefined, ...Object.values(NOTIFICATION_SIZES)], undefined);
  const title = text('title', 'Hipster Ipsum');
  const content = text(
    'content',
    'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  );
  const expandText = text('expandText', undefined);
  const dismissText = text('dismissText', undefined);
  return (
    <>
      <Notification
        variant={variant}
        interactionType={interactionType}
        size={size}
        expandText={expandText}
        dismissText={dismissText}
        title={title}
        content={content}
        onInteraction={action('RECEIVED EVENT')}
      />
      <Notification
        variant={variant}
        interactionType={interactionType}
        size={size}
        expandText={expandText}
        dismissText={dismissText}
        title={title}
        content={content}
        onInteraction={action('RECEIVED EVENT')}
        icon={null}
      />
    </>
  );
});

export default NotificationStories;
