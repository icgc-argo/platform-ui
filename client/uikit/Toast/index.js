import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import Notification, { NOTIFICATION_VARIANTS } from '../Notification';

/*
 * Please edit me!
 */
const Toast = ({ variant, title, content, onInteraction }) => (
  <Notification
    variant={variant}
    title={title}
    content={content}
    onInteraction={onInteraction}
    actionText="VIEW"
    dismissText="DISMISS"
  />
);
export const TOAST_VARIANTS = NOTIFICATION_VARIANTS;

Toast.propTypes = omit(Notification.propTypes, ['icon', 'size', 'interactionType']);

export default Toast;
