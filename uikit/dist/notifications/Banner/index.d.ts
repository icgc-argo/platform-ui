import * as React from 'react';
import Notification from '../Notification';
export declare const BANNER_VARIANTS: Readonly<{
  INFO: import('../Notification').NotificationVariant;
  SUCCESS: import('../Notification').NotificationVariant;
  WARNING: import('../Notification').NotificationVariant;
  ERROR: import('../Notification').NotificationVariant;
}>;
export declare const BANNER_SIZE: Readonly<{
  MD: 'SM' | 'MD';
  SM: 'SM' | 'MD';
}>;
declare function Banner({
  title,
  content,
  variant,
  size,
  ...otherProps
}: React.ComponentProps<typeof Notification> & {
  title?: React.ReactNode;
  content?: React.ReactNode;
  variant?: keyof typeof BANNER_VARIANTS;
  size?: keyof typeof BANNER_SIZE;
}): JSX.Element;
export default Banner;
