import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import NoData from 'uikit/NoData';
import PicBeakers from 'static/register.svg';
import PicHeart from 'static/clinical.svg';
import PicDna from 'static/dna.svg';
import Link from 'uikit/Link';
import styled from '@emotion/styled';
import { DashboardCard } from '../common';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
import { DOCS_SUBMITTED_DATA_PATH } from 'global/constants/pages';
const { DOCS_URL_ROOT } = getConfig();

const getStartedLink = (
  <Typography variant="data" component="span">
    <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTED_DATA_PATH)}>
      Get started with data submission »
    </Link>
  </Typography>
);

const NoDataIcon = styled('img')`
  padding: 0px 16px;
  max-width: 100vw;
`;

export default () => (
  <DashboardCard>
    <Typography variant="default" component="span">
      Donor Data Summary
    </Typography>
    <NoData title="You do not have any donor data submitted." link={getStartedLink}>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          max-height: 100%;
        `}
      >
        <NoDataIcon alt="no data found" src={PicBeakers} />
        <NoDataIcon alt="no data found" src={PicHeart} />
        <NoDataIcon alt="no data found" src={PicDna} />
      </div>
    </NoData>
  </DashboardCard>
);
