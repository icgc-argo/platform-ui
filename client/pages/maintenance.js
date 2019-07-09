import React from 'react';
import ErrorLayout from 'components/pages/error';
import { createPage } from 'global/utils/pages';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import Link from 'next/link';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(function() {
  return (
    <ErrorLayout>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 48px 80px 42px 48px;
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
          >
            Be back soon
          </Typography>
          <Typography as="div" variant="subtitle" color="secondary">
            Done for Maintenance
          </Typography>
          <Typography variant="subtitle2">
            Sorry for the inconvenience. We'll be back up and running as fast as possible.
          </Typography>
          <Typography variant="subtitle2">
            If you have any questions, <Link href="/">Contact Us</Link> or head back{' '}
            <Link href="/">Home</Link>.
          </Typography>
        </div>
        <div>
          <img alt="Broken dna" src="/static/dna-maintenance.svg" />
        </div>
      </div>
    </ErrorLayout>
  );
});
