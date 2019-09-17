
import React from 'react';
import PropTypes from 'prop-types';

import { styled, css } from '../../';
import Typography from '../../Typography';
import Icon from '../../Icon';
import FocusWrapper from '../../FocusWrapper';
import useTheme from '../../utils/useTheme';
import {
  NotificationBodyContainer,
  IconContainer,
  NotificationContainer,
  ActionButtonsContainer,
  ActionButton,
  getBorderColor,
} from './styledComponents';

const getDefaultInteractionType = variant =>
  ({
    [NOTIFICATION_VARIANTS.INFO]: NOTIFICATION_INTERACTION.CLOSE,
    [NOTIFICATION_VARIANTS.SUCCESS]: NOTIFICATION_INTERACTION.ACTION_DISMISS,
    [NOTIFICATION_VARIANTS.WARNING]: NOTIFICATION_INTERACTION.CLOSE,
    [NOTIFICATION_VARIANTS.ERROR]: NOTIFICATION_INTERACTION.CLOSE,
  }[variant]);

const DefaultIcon = ({ variant, size }) => {
  const fill = {
    [NOTIFICATION_VARIANTS.INFO]: 'secondary',
    [NOTIFICATION_VARIANTS.SUCCESS]: 'success',
    [NOTIFICATION_VARIANTS.WARNING]: 'warning',
    [NOTIFICATION_VARIANTS.ERROR]: 'error',
  }[variant];
  const name = {
    [NOTIFICATION_VARIANTS.INFO]: 'info',
    [NOTIFICATION_VARIANTS.SUCCESS]: 'success',
    [NOTIFICATION_VARIANTS.WARNING]: 'warning',
    [NOTIFICATION_VARIANTS.ERROR]: 'times_circle',
  }[variant];
  const width = {
    [NOTIFICATION_SIZES.MD]: '25px',
    [NOTIFICATION_SIZES.SM]: '20px',
  }[size];
  const height = width;
  return <Icon name={name} fill={fill} width={width} height={height} />;
};

const Notification = ({
  variant = NOTIFICATION_VARIANTS.INFO,
  size = NOTIFICATION_SIZES.MD,
  interactionType = getDefaultInteractionType(variant),
  title,
  content,
  actionText = 'VIEW',
  dismissText = 'DISMISS',
  icon = <DefaultIcon variant={variant} size={size} />,
  onInteraction = ({ type, event }) => {},
  noShadow = false,
  ...otherProps
}: /** @todo: actually type this */
any) => {
  const theme = useTheme();
  const dispatchEvent = eventType => e => onInteraction({ type: eventType, event: e });
  const titleTypographyVariant = {
    [NOTIFICATION_SIZES.MD]: 'subtitle2',
    [NOTIFICATION_SIZES.SM]: 'paragraph',
  }[size];
  const bodyTypographyVariant = {
    [NOTIFICATION_SIZES.MD]: 'paragraph',
    [NOTIFICATION_SIZES.SM]: 'data',
  }[size];
  const headerVerticalMargin = {
    [NOTIFICATION_SIZES.MD]: '4px',
    [NOTIFICATION_SIZES.SM]: '0px',
  }[size];
  return (
    <NotificationContainer variant={variant} noShadow={noShadow} {...otherProps}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <NotificationBodyContainer>
        {title && (
          <Typography
            variant={titleTypographyVariant}
            bold
            css={css`
              ${size === NOTIFICATION_SIZES.MD
                ? css`
                    font-size: 16px;
                  `
                : ''}
              margin: 0px;
              margin-top: ${headerVerticalMargin};
              margin-bottom: ${headerVerticalMargin};
            `}
          >
            {title}
          </Typography>
        )}
        {content && (
          <Typography
            variant={bodyTypographyVariant}
            css={css`
              margin: 0px;
            `}
          >
            {content}
          </Typography>
        )}
      </NotificationBodyContainer>
      {interactionType === NOTIFICATION_INTERACTION.CLOSE && (
        <FocusWrapper
          css={css`
            margin: 8px;
            height: 15px;
            line-height: 0px;
          `}
          onClick={dispatchEvent(NOTIFICATION_INTERACTION_EVENTS.CLOSE)}
        >
          <Icon name="times" width="12px" height="12px" fill="primary_1" />
        </FocusWrapper>
      )}
      {interactionType === NOTIFICATION_INTERACTION.ACTION_DISMISS && (
        <ActionButtonsContainer variant={variant}>
          <ActionButton
            css={css`
              border-bottom: solid 1px ${getBorderColor({ theme, variant })};
            `}
            onClick={dispatchEvent(NOTIFICATION_INTERACTION_EVENTS.ACTION)}
          >
            <Typography variant="data" component="div" bold>
              {actionText}
            </Typography>
          </ActionButton>
          <ActionButton
            variant={variant}
            onClick={dispatchEvent(NOTIFICATION_INTERACTION_EVENTS.DISMISS)}
          >
            <Typography variant="data" component="div" bold>
              {dismissText}
            </Typography>
          </ActionButton>
        </ActionButtonsContainer>
      )}
    </NotificationContainer>
  );
};

export const NOTIFICATION_INTERACTION_EVENTS = Object.freeze({
  CLOSE: 'CLOSE',
  ACTION: 'ACTION',
  DISMISS: 'DISMISS',
});

export const NOTIFICATION_VARIANTS = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
});
export const NOTIFICATION_INTERACTION = Object.freeze({
  CLOSE: 'CLOSE',
  ACTION_DISMISS: 'ACTION_DISMISS',
  NONE: 'NONE',
});

export const NOTIFICATION_SIZES = Object.freeze({
  MD: 'MD',
  SM: 'SM',
});

Notification.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  icon: PropTypes.node,
  onInteraction: PropTypes.func,
  variant: PropTypes.oneOf([
    NOTIFICATION_VARIANTS.INFO,
    NOTIFICATION_VARIANTS.SUCCESS,
    NOTIFICATION_VARIANTS.WARNING,
    NOTIFICATION_VARIANTS.ERROR,
  ]),
  interactionType: PropTypes.oneOf([
    NOTIFICATION_INTERACTION.NONE,
    NOTIFICATION_INTERACTION.CLOSE,
    NOTIFICATION_INTERACTION.ACTION_DISMISS,
  ]),
  actionText: PropTypes.string,
  dismissText: PropTypes.string,
  size: PropTypes.oneOf([NOTIFICATION_SIZES.MD, NOTIFICATION_SIZES.SM]),
  noShadow: PropTypes.bool,
};

export default Notification;
