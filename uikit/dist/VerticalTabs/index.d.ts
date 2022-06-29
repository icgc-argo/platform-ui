/// <reference types="next" />
import React, { HtmlHTMLAttributes, HTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import Tag from 'uikit/Tag';
declare type TabStyleType = {
  background: string;
  border: string;
};
declare const VerticalTabsItem: React.ComponentType<
  {
    active?: boolean;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    tabStyle?: TabStyleType;
    tooltip?: ReactNode;
  } & HTMLAttributes<HTMLButtonElement>
>;
declare const VerticalTabs: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement>>;
declare const output: typeof VerticalTabs & {
  Item: typeof VerticalTabsItem;
  Tag: typeof Tag;
};
export default output;
