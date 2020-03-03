import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import PicClipboard from 'static/clipboard.svg';
import NoData from 'uikit/NoData';
import Link from 'uikit/Link';
import { DashboardCard } from '../common';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
import { DOCS_SUBMITTING_MOLECULAR_DATA_PATH } from 'global/constants/pages';
const { DOCS_URL_ROOT } = getConfig();

const getStartedLink = (
  <Typography variant="data" component="span">
    <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTING_MOLECULAR_DATA_PATH)}>
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
      <NoData title="No data found." link={getStartedLink}>
        <img alt="no data found" src={PicClipboard} />
      </NoData>
    </div>
  </DashboardCard>
);
