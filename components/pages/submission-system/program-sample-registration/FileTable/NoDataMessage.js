import * as React from 'react';
import { css } from 'uikit';
import Typography from 'uikit/Typography';

const NoDataMessage = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 0;
    `}
  >
    <img alt="Chemistry beakers" src="/static/beakers.svg" />
    <Typography
      css={css`
        margin-top: 14px;
      `}
      variant="navigation"
      component="div"
      bold
    >
      You do not have any registration data uploaded.
    </Typography>
    <Typography variant="data" component="div">
      Follow the instructions above to get started.
    </Typography>
  </div>
);

export default NoDataMessage;
