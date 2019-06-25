import { storiesOf } from '@storybook/react';
import React from 'react';
import Notification, {
  NOTIFICATION_VARIANTS,
  NOTIFICATION_INTERACTION_EVENTS,
  NOTIFICATION_INTERACTION,
  NOTIFICATION_SIZES,
} from '.';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';

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
  const actionText = text('actionText', undefined);
  const dismissText = text('dismissText', undefined);
  const noShadow = boolean('noShadow', false);
  return (
    <>
      <Notification
        variant={variant}
        interactionType={interactionType}
        size={size}
        actionText={actionText}
        dismissText={dismissText}
        title={title}
        content={content}
        noShadow={noShadow}
        onInteraction={action('RECEIVED EVENT')}
      />
      <Notification
        variant={variant}
        interactionType={interactionType}
        size={size}
        actionText={actionText}
        dismissText={dismissText}
        title={title}
        content={content}
        noShadow={noShadow}
        onInteraction={action('RECEIVED EVENT')}
        icon={null}
      />
    </>
  );
});

export default NotificationStories;
