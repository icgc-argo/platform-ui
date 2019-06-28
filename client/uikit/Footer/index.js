import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../Icon';
import icgcLogo from '../assets/icgc_logo.svg';
import css from '@emotion/css';
import { Row, Col } from 'react-grid-system';

const Container = styled('footer')`
  ${({ theme }) => css(theme.typography.paragraph)};
  font-size: 11px;
  min-height: 58px;

  & a + svg {
    margin: 0px 8px;
  }
`;

const Footer = ({
  version = '[version]',
  apiVersion = '[api-version]',
  commitHash = '[commit-hash]',
  links = [],
}) => (
  <Container>
    <Row
      css={css`
        min-height: 58px;
      `}
    >
      <Col
        md={3}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        © 2019 ICGC ARGO. All rights reserved.
        <br />
        ICGC ARGO Submission System {version} - API {apiVersion} - {commitHash}
      </Col>
      <Col
        md={6}
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        `}
      >
        {links.map(({ displayName, href }, idx) => {
          if (idx !== links.length - 1) {
            return (
              <React.Fragment key={displayName}>
                <a href={href}>{displayName}</a>
                <Icon width="12px" height="12px" name="slash" fill="grey_1" />
              </React.Fragment>
            );
          } else {
            return (
              <a key={displayName} href={href}>
                {displayName}
              </a>
            );
          }
        })}
      </Col>
      <Col
        md={3}
        css={css`
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          line-height: 0;
        `}
      >
        <a href="https://www.oicr.on.ca/" target="_blank">
          <img alt="" src={icgcLogo} style={{ height: '42px' }} />
        </a>
      </Col>
    </Row>
  </Container>
);

Footer.propTypes = {
  version: PropTypes.string,
  apiVersion: PropTypes.string,
  commitHash: PropTypes.string,
  links: PropTypes.array,
};

export default Footer;
