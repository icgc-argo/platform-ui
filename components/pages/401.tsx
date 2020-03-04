import React from 'react';
import ErrorLayout from 'components/pages/error';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import HyperLink from 'uikit/Link';
import Link from 'next/link';
import { getConfig } from 'global/config';

export default function Error401Page() {
  const { DOCS_URL_ROOT } = getConfig();
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
            1
          </Typography>
          <Typography as="div" variant="subtitle" color="secondary">
            Authorization Required
          </Typography>
          <Typography
            variant="subtitle2"
            css={css`
              margin: 33px 0;
            `}
          >
            You do not have permission to access this page.
          </Typography>
          <Typography variant="subtitle2">
            Check out our{' '}
            <HyperLink target="_blank" href={DOCS_URL_ROOT}>
              Documentation
            </HyperLink>{' '}
            or head back{' '}
            <Link href="/">
              <HyperLink>Home</HyperLink>
            </Link>
            .
          </Typography>
        </div>
        <div>
          <img alt="Broken dna" src="/static/dna-locked.svg" />
        </div>
      </div>
    </ErrorLayout>
  );
}
