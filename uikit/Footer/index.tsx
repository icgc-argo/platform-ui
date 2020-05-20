import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../Icon';
import icgcLogo from '../assets/icgc_logo.svg';
import css from '@emotion/css';
import { Row, Col } from 'react-grid-system';
import A from '../Link';

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
  apiVersion = null,
  links = [],
  className = '',
  ...otherProps
}) => (
  <Container className={`footer ${className}`} {...otherProps}>
    <Row
      css={css`
        min-height: 58px;
      `}
      justify="between"
      nogutter
    >
      <Col
        md={5}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        © 2020 ICGC ARGO. All rights reserved.
        <br />
        ICGC ARGO Data Platform {version} {apiVersion && `- API ${apiVersion}`}
      </Col>
      <Col
        md={7}
        css={css`
          display: flex;
          align-items: center;
          font-size: 12px;
          justify-content: flex-end;
          padding-left: 22px;
        `}
      >
        <div>
          {links.map(({ displayName, href, target }, idx) => {
            if (idx !== links.length - 1) {
              return (
                <React.Fragment key={displayName}>
                  <A target={target} href={href}>
                    {displayName}
                  </A>
                  <Icon width="12px" height="12px" name="slash" fill="grey_1" />
                </React.Fragment>
              );
            } else {
              return (
                <A key={displayName} href={href} target={target}>
                  {displayName}
                </A>
              );
            }
          })}
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            line-height: 0;
            margin-left: 16px;
          `}
        >
          <a href="https://www.oicr.on.ca/" target="_blank">
            <img
              alt="Ontario Institute for Cancer Research"
              src={icgcLogo}
              style={{ height: '42px' }}
            />
          </a>
        </div>
      </Col>
    </Row>
  </Container>
);

Footer.propTypes = {
  version: PropTypes.string,
  apiVersion: PropTypes.string,
  links: PropTypes.array,
};

export default Footer;
