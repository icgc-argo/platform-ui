import React from 'react';
import PropTypes from 'prop-types';
import Notification, {
  NOTIFICATION_INTERACTION,
  NOTIFICATION_VARIANTS,
  NOTIFICATION_SIZES,
} from '../Notification';

/*
 * Please edit me!
 */
const Banner = ({ title, content, variant, size }) => (
  <Notification
    noShadow
    interactionType={NOTIFICATION_INTERACTION.NONE}
    title={title}
    content={content}
    variant={variant}
    size={size}
  />
);
export const BANNER_VARIANTS = NOTIFICATION_VARIANTS;
export const BANNER_SIZE = NOTIFICATION_SIZES;

Banner.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  variant: PropTypes.oneOf([
    BANNER_VARIANTS.INFO,
    BANNER_VARIANTS.SUCCESS,
    BANNER_VARIANTS.WARNING,
    BANNER_VARIANTS.ERROR,
    ,
  ]),
  size: PropTypes.oneOf([BANNER_SIZE.MD, BANNER_SIZE.SM]),
};

export default Banner;
