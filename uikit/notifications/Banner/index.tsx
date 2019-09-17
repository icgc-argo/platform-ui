
import * as React from 'react';
import PropTypes from 'prop-types';
import Notification, {
  NOTIFICATION_INTERACTION,
  NOTIFICATION_VARIANTS,
  NOTIFICATION_SIZES,
} from '../Notification';

export const BANNER_VARIANTS = NOTIFICATION_VARIANTS;
export const BANNER_SIZE = NOTIFICATION_SIZES;
const Banner = ({
  title,
  content,
  variant,
  size,
}: {
  title?: React.Node,
  content?: React.Node,
  variant?: $Keys<typeof BANNER_VARIANTS>,
  size?: $Keys<typeof BANNER_SIZE>,
}) => (
  <Notification
    noShadow
    interactionType={NOTIFICATION_INTERACTION.NONE}
    title={title}
    content={content}
    variant={variant}
    size={size}
  />
);

export default Banner;
