import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import PicClipboard from 'static/clipboard.svg';
import NoData from 'uikit/NoData';
import Link from 'uikit/Link';
import { DashboardCard } from '../common';
import { DOCS_SUBMITTING_MOLECULAR_DATA_PATH } from 'global/constants/docSitePaths';

const getStartedLink = (
  <Typography variant="data" component="span">
    <Link target="_blank" href={DOCS_SUBMITTING_MOLECULAR_DATA_PATH}>
      Get started with molecular data submission »
    </Link>
  </Typography>
);

export default () => (
  <DashboardCard>
    <Typography variant="default" component="span">
      Molecular Data Summary
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
      <NoData title="Coming Soon." link={getStartedLink}>
        <img alt="Coming Soon." src={PicClipboard} />
      </NoData>
    </div>
  </DashboardCard>
);
