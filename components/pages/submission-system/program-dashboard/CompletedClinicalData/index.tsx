import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import PicClipboard from 'static/clipboard.svg';
import NoData from 'uikit/NoData';
import Link from 'uikit/Link';
import HyperLink from 'uikit/Link';

const getStartedLink = (
  <Typography variant="data" component="span">
    <Link target="_blank" href="https://platform-ui.qa.argo.cancercollaboratory.org/">
      <HyperLink>Get started with clinical data submission » </HyperLink>
    </Link>
  </Typography>
);

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
        Completed Core Clinical Data
      </Typography>
      <div
        css={css`
          height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <NoData title="No data found." link={getStartedLink}>
          <img alt="no data found" src={PicClipboard} />
        </NoData>
      </div>
    </div>
  </Container>
);
