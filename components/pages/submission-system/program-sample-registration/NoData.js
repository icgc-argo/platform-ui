import * as React from 'react';
import { css } from 'uikit';
import Typography from 'uikit/Typography';

const NoDataOverlay = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
  >
    <img alt="Chemistry beakers" src="/static/beakers.svg" />
    <Typography variant="navigation" component="div">
      You do not have any registration data uploaded.
    </Typography>
    <Typography variant="data" component="div">
      Follow the instructions above to get started.
    </Typography>
  </div>
);

export default NoDataOverlay;
