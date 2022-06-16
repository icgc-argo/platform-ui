import * as React from 'react';
import { TooltipProps as TippyProps } from 'react-tippy';
export declare type TooltipProps = Omit<TippyProps, 'html'> & {
  html?: React.ReactElement<any> | React.ReactNode | string;
};
declare const Tooltip: React.ComponentType<TooltipProps>;
export default Tooltip;
