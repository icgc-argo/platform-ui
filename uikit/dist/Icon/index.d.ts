import React, { SVGAttributes } from 'react';
import { ThemeColorNames } from '../theme/types';
import { UikitIconNames } from './icons';
export declare type Outline = {
  color: keyof ThemeColorNames | string;
  width: number;
};
declare const Icon: React.ComponentType<
  {
    name: UikitIconNames;
    className?: string;
    title?: string;
    width?: string;
    height?: string;
    fill?: keyof ThemeColorNames | string;
    outline?: Outline;
  } & SVGAttributes<SVGElement>
>;
export declare const ICON_NAMES: any;
export declare const BUILT_IN_ICON_COLORS: {
  [k in UikitIconNames]: UikitIconNames;
};
export default Icon;
