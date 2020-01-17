import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import { Row, Col, ScreenClassRender } from 'react-grid-system';

export default () => (
  <Container
    css={css`
      height: 100%;
    `}
  >
    <div
      css={css`
        padding: 16px;
      `}
    >
      <Typography variant="default" component="span">
        Donor Release Summary
      </Typography>

      <br />

      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        `}
      >
        <Typography variant="subtitle2" bold>
          2000
        </Typography>
      </div>

      <div
        css={css`
          margin-top: -10px;
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
        <Typography variant="caption" color="grey">
          Committed
        </Typography>
      </div>
    </div>
  </Container>
);
