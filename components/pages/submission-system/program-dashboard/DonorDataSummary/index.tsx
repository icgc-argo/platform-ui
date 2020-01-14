import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import NoData from 'uikit/NoData';
import PicBeakers from 'static/register.svg';
import PicHeart from 'static/clinical.svg';
import PicDna from 'static/dna.svg';
import Link from 'uikit/Link';

const getStartedLink = <Link href="/">Get started with data submission » </Link>;
export default () => (
  <Container
    css={css`
      height: 330px;
    `}
  >
    <div
      css={css`
        padding: 12px;
      `}
    >
      <Typography variant="default" component="span">
        Donor Data Summary
      </Typography>
      <NoData title="You do not have any donor data submitted." link={getStartedLink}>
        <div
          css={css`
            display: flex;
          `}
        >
          <img alt="no data found" src={PicBeakers} />
          <img alt="no data found" src={PicHeart} />
          <img alt="no data found" src={PicDna} />
        </div>
      </NoData>
    </div>
  </Container>
);
