import React from 'react';
import ErrorLayout from 'components/pages/error';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import HyperLink from 'uikit/Link';
import { getConfig } from 'global/config';
import Link from 'next/link';
import { Row, Col } from 'react-grid-system';
import image from 'static/dna-broken.svg';
import logoMark from 'static/logomark.svg';

export default function Error500Page() {
  const { DOCS_URL_ROOT } = getConfig();
  return (
    <ErrorLayout>
      <Row
        nogutter
        css={css`
          padding: 32px;
        `}
      >
        <Col sm={12} md={6}>
          <Typography
            css={css`
              font-size: 100px;
              margin: 0;
              font-weight: 600;
              line-height: normal;
            `}
          >
            5
            <img
              css={css`
                margin: 0 8px -2px;
              `}
              alt="Logo mark"
              src={logoMark}
            />
            0
          </Typography>
          <Typography as="div" variant="subtitle" color="secondary">
            Internal Server Error
          </Typography>
          <Typography variant="subtitle2">Oops! We cannot handle this request.</Typography>
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
        </Col>
        <Col
          sm={12}
          md={6}
          css={css`
            text-align: center;
          `}
        >
          <img alt="Broken dna" src={image} />
        </Col>
      </Row>
    </ErrorLayout>
  );
}
