import React from 'react';
import ErrorLayout from 'components/pages/error';
import { createPage } from 'global/utils/pages';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import Link from 'next/link';
import HyperLink from 'uikit/Link';
import { CONTACT_PAGE_PATH } from 'global/constants/pages';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(function() {
  return (
    <ErrorLayout hideNavbarLinks>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 32px 47px 27px 47px;
        `}
      >
        <div
          css={css`
            margin-right: 106px;
          `}
        >
          <Typography
            css={css`
              font-size: 44px;
              margin: 10px 0;
              line-height: normal;
            `}
            as="h1"
          >
            Be back soon
          </Typography>
          <Typography
            as="h2"
            variant="subtitle"
            color="secondary"
            css={css`
              margin: 0;
            `}
          >
            Down for Maintenance
          </Typography>
          <Typography variant="subtitle2" as="p">
            We'll be back up and running as quickly as possible. We appreciate your patience.
          </Typography>
          <Typography variant="subtitle2">
            If you have any questions,{' '}
            <Link href={CONTACT_PAGE_PATH}>
              <HyperLink>Contact Us</HyperLink>
            </Link>{' '}
            or head back{' '}
            <Link href="/">
              <HyperLink>Home.</HyperLink>
            </Link>
          </Typography>
        </div>
        <div>
          <img alt="Broken dna" src="/static/dna-maintenance.svg" />
        </div>
      </div>
    </ErrorLayout>
  );
});
