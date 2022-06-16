import * as React from 'react';
import { SerializedStyles } from '@emotion/core';
import Button from 'uikit/Button';
declare type DropdownButtonItemConfig<ValueType = string> = {
  value: ValueType;
  display: React.ReactNode;
  css?: SerializedStyles;
};
export declare type DownloadButtonProps<ValueType> = {
  onItemClick: (item: DropdownButtonItemConfig<ValueType>) => void;
  menuItems: Array<DropdownButtonItemConfig<ValueType>>;
  menuShown?: boolean;
};
declare function DropdownButton<ValueType = string>({
  children,
  onItemClick,
  menuItems,
  menuShown: controlledMenuShowState,
  onClick,
  ...rest
}: DownloadButtonProps<ValueType> & React.ComponentProps<typeof Button>): JSX.Element;
export default DropdownButton;
