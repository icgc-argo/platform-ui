import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';

export default () => (
  <Container
    css={css`
      height: 277px;
    `}
  >
    <div
      css={css`
        padding: 12px;
      `}
    >
      <Typography variant="default" component="span">
        Completed Core Clinical Data
      </Typography>
    </div>
  </Container>
);
