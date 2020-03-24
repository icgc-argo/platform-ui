import Typography from 'uikit/Typography';
import Link from 'uikit/Link';
import { DOCS_SUBMITTED_DATA_PATH } from 'global/constants/pages';
import styled from '@emotion/styled';
import NoData from 'uikit/NoData';
import urljoin from 'url-join';
import PicBeakers from 'static/register.svg';
import PicHeart from 'static/clinical.svg';
import PicDna from 'static/dna.svg';
import { css } from '@emotion/core';
import { getConfig } from 'global/config';

const { DOCS_URL_ROOT } = getConfig();

export default () => {
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
  return (
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
  );
};
