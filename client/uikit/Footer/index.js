import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../Icon';
import icgcLogo from '../assets/icgc_logo.svg';
import css from '@emotion/css';

const Container = styled('div')`
  ${({ theme }) => css(theme.typography.paragraph)};
  font-size: 11px;
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    align-items: center;
  }

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
    <div>
      © 2019 ICGC ARGO.
      <br />
      All Rights reserved. ICGC ARGO Submission System {version} - API {apiVersion} - {commitHash}
    </div>
    <div
      css={css`
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
    </div>
    <div>
      <a href="https://www.oicr.on.ca/">
        <img alt="" src={icgcLogo} />
      </a>
    </div>
  </Container>
);

Footer.propTypes = {
  version: PropTypes.string,
  apiVersion: PropTypes.string,
  commitHash: PropTypes.string,
  links: PropTypes.array,
};

export default Footer;
