import React from 'react';
import Typography from '../Typography';
import { css } from '../';

type NoDataProps = {
  children?: string;
  title: string;
  subtitle?: string;
};

const NoData: React.ComponentType<NoDataProps> = ({ children, title, subtitle }) => (
  <div>
    {children}
    <Typography
      css={css`
        margin-top: 14px;
      `}
      variant="navigation"
      component="div"
      bold
    >
      {title}
    </Typography>
    <Typography variant="data" component="div">
      {subtitle}
    </Typography>
  </div>
);

export default NoData;
