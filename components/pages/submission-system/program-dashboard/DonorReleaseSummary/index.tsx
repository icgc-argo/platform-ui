import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import { DashboardCard } from '../common';

export default () => (
  <DashboardCard>
    <Typography variant="default" component="span">
      Donor Release Summary
    </Typography>

    <div
      css={css`
        margin-top: 40px;
        background-color: #dcdde1;
        border-radius: 8px;
        width: 100%;
        margin-bottom: 8px;
      `}
    >
      &nbsp;
    </div>

    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      `}
    >
      <Typography variant="caption" color="grey">
        With Released Files
      </Typography>

      <div>
        <Typography
          variant="caption"
          bold={true}
          css={css`
            margin-right: 5px;
          `}
        >
          2,000
        </Typography>
        <Typography variant="caption" color="grey">
          Committed
        </Typography>
      </div>
    </div>
  </DashboardCard>
);
