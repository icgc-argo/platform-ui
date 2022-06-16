/// <reference types="react" />
import PropTypes from 'prop-types';
declare function Toast({
  variant,
  title,
  content,
  onInteraction,
  interactionType,
  top,
  right,
  width,
}: {
  variant: any;
  title: any;
  content: any;
  onInteraction: any;
  interactionType: any;
  top?: string;
  right?: string;
  width?: string;
}): JSX.Element;
declare namespace Toast {
  var propTypes: Pick<
    {
      title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
      content: PropTypes.Requireable<PropTypes.ReactNodeLike>;
      icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
      onInteraction: PropTypes.Requireable<(...args: any[]) => any>;
      variant: PropTypes.Requireable<import('../Notification').NotificationVariant>;
      interactionType: PropTypes.Requireable<import('../Notification').NotificationInteraction>;
      actionText: PropTypes.Requireable<string>;
      dismissText: PropTypes.Requireable<string>;
      size: PropTypes.Requireable<'SM' | 'MD'>;
      noShadow: PropTypes.Requireable<boolean>;
    },
    'title' | 'content' | 'variant' | 'interactionType' | 'onInteraction'
  >;
}
export declare const TOAST_VARIANTS: Readonly<{
  INFO: import('../Notification').NotificationVariant;
  SUCCESS: import('../Notification').NotificationVariant;
  WARNING: import('../Notification').NotificationVariant;
  ERROR: import('../Notification').NotificationVariant;
}>;
export declare const TOAST_INTERACTION: Readonly<{
  CLOSE: import('../Notification').NotificationInteraction;
  ACTION_DISMISS: import('../Notification').NotificationInteraction;
  NONE: import('../Notification').NotificationInteraction;
}>;
export default Toast;
