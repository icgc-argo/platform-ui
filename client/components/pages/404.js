// @flow
import React from 'react';
import ErrorLayout from 'components/pages/error';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import Link from 'next/link';

export default function Error404Page() {
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
              font-size: 100px;
              margin: 0;
              font-weight: 600;
              line-height: normal;
            `}
          >
            4
            <img
              css={css`
                margin: 0 8px;
              `}
              alt="Logo mark"
              src="/static/logomark.svg"
            />
            4
          </Typography>
          <Typography as="div" variant="subtitle" color="secondary">
            Page not Found
          </Typography>
          <Typography variant="subtitle2">
            Oops! We can’t find the page that you’re looking for.
          </Typography>
          <Typography variant="subtitle2">
            Check out our <Link href="/">Documentation</Link> or head back{' '}
            <Link href="/">Home</Link>.
          </Typography>
        </div>
        <div>
          <img alt="Broken dna" src="/static/dna-broken.svg" />
        </div>
      </div>
    </ErrorLayout>
  );
}
