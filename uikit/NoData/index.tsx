import React, { ReactElement } from 'react';
import Typography from '../Typography';
import { css } from '../';

type NoDataProps = {
  title: string;
  subtitle?: string;
};

const NoData: React.ComponentType<NoDataProps> = ({ children, title, subtitle }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 0;
    `}
  >
    {children}
    <Typography
      css={css`
        margin-top: 14px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="navigation"
      component="p"
      bold
    >
      {title}
    </Typography>
    <Typography
      css={css`
        margin-top: 10px;
        margin-bottom: 0;
      `}
      color="grey"
      variant="data"
      component="p"
    >
      {subtitle}
    </Typography>
  </div>
);

export default NoData;
