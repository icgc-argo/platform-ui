import React from 'react';
import PropTypes from 'prop-types';

import { styled, css } from '../../';
import Typography, { TypographyVariant } from '../../Typography';
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
import { UikitIconNames } from 'uikit/Icon/icons';

export type NotificationVariant = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
export type NotificationInteractionEvent = 'CLOSE' | 'ACTION' | 'DISMISS';
export type NotificationInteraction = 'CLOSE' | 'ACTION_DISMISS' | 'NONE';
export type NotificationSize = 'MD' | 'SM';

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
    [NOTIFICATION_VARIANTS.INFO]: 'info' as UikitIconNames,
    [NOTIFICATION_VARIANTS.SUCCESS]: 'success' as UikitIconNames,
    [NOTIFICATION_VARIANTS.WARNING]: 'warning' as UikitIconNames,
    [NOTIFICATION_VARIANTS.ERROR]: 'warning' as UikitIconNames,
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
  onInteraction = ({
    type,
    event,
  }: {
    type: NotificationInteractionEvent;
    event: React.SyntheticEvent;
  }) => {},
  noShadow = false,
  ...otherProps
}: {
  variant?: keyof typeof NOTIFICATION_VARIANTS;
  size?: keyof typeof NOTIFICATION_SIZES;
  interactionType?: keyof typeof NOTIFICATION_INTERACTION;
  title?: React.ReactNode;
  content?: React.ReactNode;
  actionText?: string;
  dismissText?: string;
  icon?: React.ReactNode;
  onInteraction?: ({ type, event }) => void;
  noShadow?: boolean;
}) => {
  const theme = useTheme();
  const dispatchEvent = eventType => e => onInteraction({ type: eventType, event: e });
  const titleTypographyVariant = {
    [NOTIFICATION_SIZES.MD]: 'subtitle2' as TypographyVariant,
    [NOTIFICATION_SIZES.SM]: 'paragraph' as TypographyVariant,
  }[size];
  const bodyTypographyVariant = {
    [NOTIFICATION_SIZES.MD]: 'paragraph' as TypographyVariant,
    [NOTIFICATION_SIZES.SM]: 'data' as TypographyVariant,
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

export const NOTIFICATION_VARIANTS = Object.freeze({
  INFO: 'INFO' as NotificationVariant,
  SUCCESS: 'SUCCESS' as NotificationVariant,
  WARNING: 'WARNING' as NotificationVariant,
  ERROR: 'ERROR' as NotificationVariant,
});

export const NOTIFICATION_INTERACTION_EVENTS = Object.freeze({
  CLOSE: 'CLOSE' as NotificationInteractionEvent,
  ACTION: 'ACTION' as NotificationInteractionEvent,
  DISMISS: 'DISMISS' as NotificationInteractionEvent,
});

export const NOTIFICATION_INTERACTION = Object.freeze({
  CLOSE: 'CLOSE' as NotificationInteraction,
  ACTION_DISMISS: 'ACTION_DISMISS' as NotificationInteraction,
  NONE: 'NONE' as NotificationInteraction,
});

export const NOTIFICATION_SIZES = Object.freeze({
  MD: 'MD' as NotificationSize,
  SM: 'SM' as NotificationSize,
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
