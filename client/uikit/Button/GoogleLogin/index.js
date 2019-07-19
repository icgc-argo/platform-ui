import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from 'uikit';
import Button from '../index';
import Icon from '../../Icon';
import useTheme from '../../utils/useTheme';

/**
 * Social login for Google
 */
const StyledLink = styled('a')`
  font-size: 30px;
  text-decoration: none;
  display: inline-block;
`;

function GoogleLogin({ link, id }) {
  const theme = useTheme();
  return (
    <StyledLink id={id} href={link}>
      <Button
        css={css`
          padding: 10px 13px;
        `}
      >
        <div
          css={css`
            ${css(theme.typography.paragraph)}
            display: flex;
            align-items: center;
            text-transform: none;
            font-size: 15px;
            font-weight: bold;
          `}
        >
          <Icon width="20px" height="20px" name="google" fill="none" />
          &nbsp;Log in with Google
        </div>
      </Button>
    </StyledLink>
  );
}

GoogleLogin.propTypes = { link: PropTypes.string.isRequired };

export default GoogleLogin;
