import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '../index';
import Icon from '../../Icon';
import css from '@emotion/css';
import useTheme from '../../utils/useTheme';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';

/**
 * Social login for Google
 */
const StyledLink = styled('a')`
  font-size: 30px;
  text-decoration: none;
  display: inline-block;
`;

const GoogleLogin: React.ComponentType<{
  id?: string;
  link: string;
  className?: string;
  redirectPath?: string;
}> = ({ link, id, className, redirectPath }) => {
  const handleClick = () => {
    if (!!redirectPath) {
      localStorage.setItem(LOCAL_STORAGE_REDIRECT_KEY, redirectPath);
    }
  };
  const theme = useTheme();
  return (
    <StyledLink id={id} href={link} className={className} onClick={handleClick}>
      <Button
        css={css`
          padding: 10px 13px;
        `}
      >
        <div
          css={css`
            ${css(theme.typography.paragraph as any)}
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
};

export default GoogleLogin;
