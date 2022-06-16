import React from 'react';
import PropTypes from 'prop-types';
import { NotificationBodyContainer } from './styledComponents';
export declare type NotificationVariant = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
export declare type NotificationInteractionEvent = 'CLOSE' | 'ACTION' | 'DISMISS';
export declare type NotificationInteraction = 'CLOSE' | 'ACTION_DISMISS' | 'NONE';
export declare type NotificationSize = 'MD' | 'SM';
declare const Notification: {
  ({
    variant,
    size,
    interactionType,
    title,
    content,
    actionText,
    dismissText,
    icon,
    onInteraction,
    noShadow,
    contentProps,
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
    onInteraction?: ({ type, event }: { type: any; event: any }) => void;
    noShadow?: boolean;
    contentProps?: React.ComponentProps<typeof NotificationBodyContainer>;
  }): JSX.Element;
  propTypes: {
    title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    content: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    onInteraction: PropTypes.Requireable<(...args: any[]) => any>;
    variant: PropTypes.Requireable<NotificationVariant>;
    interactionType: PropTypes.Requireable<NotificationInteraction>;
    actionText: PropTypes.Requireable<string>;
    dismissText: PropTypes.Requireable<string>;
    size: PropTypes.Requireable<'SM' | 'MD'>;
    noShadow: PropTypes.Requireable<boolean>;
  };
};
export declare const NOTIFICATION_VARIANTS: Readonly<{
  INFO: NotificationVariant;
  SUCCESS: NotificationVariant;
  WARNING: NotificationVariant;
  ERROR: NotificationVariant;
}>;
export declare const NOTIFICATION_INTERACTION_EVENTS: Readonly<{
  CLOSE: NotificationInteractionEvent;
  ACTION: NotificationInteractionEvent;
  DISMISS: NotificationInteractionEvent;
}>;
export declare const NOTIFICATION_INTERACTION: Readonly<{
  CLOSE: NotificationInteraction;
  ACTION_DISMISS: NotificationInteraction;
  NONE: NotificationInteraction;
}>;
export declare const NOTIFICATION_SIZES: Readonly<{
  MD: 'SM' | 'MD';
  SM: 'SM' | 'MD';
}>;
export default Notification;
