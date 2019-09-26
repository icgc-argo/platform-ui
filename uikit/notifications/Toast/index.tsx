import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import css from '@emotion/css';

import Notification, { NOTIFICATION_VARIANTS, NOTIFICATION_INTERACTION } from '../Notification';

function Toast({
  variant,
  title,
  content,
  onInteraction,
  interactionType,
  top = '70px',
  right = '30px',
  width = '400px',
}) {
  return (
    <Notification
      variant={variant}
      title={title}
      content={content}
      onInteraction={onInteraction}
      interactionType={interactionType}
    />
  );
}
export const TOAST_VARIANTS = NOTIFICATION_VARIANTS;
export const TOAST_INTERACTION = NOTIFICATION_INTERACTION;

Toast.propTypes = omit(Notification.propTypes, [
  'icon',
  'size',
  'actionText',
  'dismissText',
  'noShadow',
]);

export default Toast;
