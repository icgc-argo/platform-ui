import React from 'react';
declare const Menu: ({
  title,
  contents,
  color,
  scrollYOffset,
}: {
  title: string;
  contents: Array<{
    name: string;
    contentRef?: React.RefObject<HTMLElement>;
    disabled?: boolean;
    active?: boolean;
  }>;
  color?: string;
  scrollYOffset?: number;
}) => JSX.Element;
export default Menu;
