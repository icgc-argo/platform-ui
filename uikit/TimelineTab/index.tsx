import React, { HtmlHTMLAttributes } from 'react';
import { css } from 'uikit';
import { useTheme } from '../ThemeProvider';

/*
 * Please edit me!
 */
type TimelineTabProps = {};
const TimelineTab: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        border-right: solid 1px ${theme.colors.grey_2};
      `}
    >
      {children}
    </div>
  );
};

export default TimelineTab;
