import React from 'react';
import ErrorLayout from 'components/pages/error';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { Row, Col } from 'react-grid-system';

export default () => (
  <ErrorLayout hideApiVersion hideNavbarLinks hideInternalPaths>
    <Row
      nogutter
      css={css`
        padding: 32px;
      `}
    >
      <Col sm={12} md={6}>
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
      </Col>
      <Col
        sm={12}
        md={6}
        css={css`
          text-align: center;
        `}
      >
        <img alt="Broken dna" src="/static/dna-maintenance.svg" />
      </Col>
    </Row>
  </ErrorLayout>
);
