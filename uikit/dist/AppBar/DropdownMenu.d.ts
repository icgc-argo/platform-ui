import React from 'react';
export declare function DropdownMenu({
  children,
  ...otherProps
}: {
  [x: string]: any;
  children: any;
}): JSX.Element;
export declare const DropdownMenuItem: React.ForwardRefExoticComponent<
  {
    active?: boolean;
  } & React.LiHTMLAttributes<HTMLLIElement> &
    React.RefAttributes<HTMLLIElement>
>;
