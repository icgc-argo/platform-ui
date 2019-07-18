import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import css from '@emotion/css';

import Notification, { NOTIFICATION_VARIANTS } from '../Notification';

/*
 * Please edit me!
 */
function Toast({
  variant,
  title,
  content,
  onInteraction,
  setOpen,
  right = '70px',
  top = '30px',
  width = '400px',
}) {
  // hide after 8 seconds
  React.useEffect(() => {
    let timeoutID;
    if (typeof setOpen === 'function') {
      timeoutID = window.setTimeout(() => {
        setOpen(false);
      }, 8000);
    }
    return () => {
      window.clearTimeout(timeoutID);
    };
  });

  return (
    <Notification
      variant={variant}
      title={title}
      content={content}
      onInteraction={onInteraction}
      interactionType="CLOSE"
      css={css`
        position: fixed;
        z-index: 9999;
        right: ${right};
        top: ${top};
        width: ${width};
      `}
    />
  );
}
export const TOAST_VARIANTS = NOTIFICATION_VARIANTS;

Toast.propTypes = omit(Notification.propTypes, [
  'icon',
  'size',
  'interactionType',
  'actionText',
  'dismissText',
  'noShadow',
]);

export default Toast;
