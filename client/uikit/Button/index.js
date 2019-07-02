import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../Icon';
import useTheme from '../utils/useTheme';
import FocusWrapper from '../FocusWrapper';

export const BUTTON_VARIANTS = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TEXT: 'text',
});

export const BUTTON_SIZES = Object.freeze({
  SM: 'sm',
  MD: 'md',
});

const StyledButton = styled(FocusWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 100px;
  font-weight: 600;
  text-transform: uppercase;
  border-style: solid;

  border-width: ${({ theme, size }) => theme.button.borderWeights[size]};
  padding: ${({ theme, size }) => theme.button.paddings[size]};
  color: ${({ theme, variant }) => theme.button.textColors[variant].default};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme, size }) => theme.button.fontSizes[size]};
  background-color: ${({ theme, variant }) => theme.button.colors[variant].default};
  border-color: ${({ theme, variant }) => theme.button.borderColors[variant].default};

  &:focus {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].focus};
  }

  &:hover {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].hover};
    border-color: ${({ theme, variant }) => theme.button.borderColors[variant].hover};
  }

  &:active {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].active};
    border-color: ${({ theme, variant }) => theme.button.borderColors[variant].active};
  }

  &:disabled {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].disabled};
    border-color: ${({ theme, variant }) => theme.button.borderColors[variant].disabled};
    color: ${({ theme, variant }) => theme.button.textColors[variant].disabled};
  }
`;

const Button = ({
  children,
  onClick,
  disabled,
  variant = BUTTON_VARIANTS.PRIMARY,
  size = variant === BUTTON_VARIANTS.SECONDARY ? BUTTON_SIZES.SM : BUTTON_SIZES.MD,
  isAsync = false,
  className,
  id,
}) => {
  const [isLoading, setLoading] = useState(false);
  const theme = useTheme();
  const shouldShowLoading = isLoading && isAsync;
  const onClickFn = async event => {
    setLoading(true);
    await onClick(event);
    setLoading(false);
  };
  return (
    <StyledButton
      onClick={isAsync ? onClickFn : onClick}
      disabled={disabled || shouldShowLoading}
      size={size}
      variant={variant}
      className={className}
      id={id}
      isLoading={shouldShowLoading}
    >
      <span style={{ visibility: shouldShowLoading ? 'hidden' : 'visible' }}>{children}</span>
      <span
        style={{
          position: 'absolute',
          visibility: shouldShowLoading ? 'visible' : 'hidden',
        }}
      >
        <Icon
          name="spinner"
          width={'20px'}
          height={'20px'}
          fill={theme.button.textColors[variant].default}
        />
      </span>
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Button variant type eg. primary
   */
  variant: PropTypes.oneOf([
    BUTTON_VARIANTS.PRIMARY,
    BUTTON_VARIANTS.SECONDARY,
    BUTTON_VARIANTS.TEXT,
  ]),
  /**
   * Button size
   */
  size: PropTypes.oneOf([BUTTON_SIZES.SM, BUTTON_SIZES.MD]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  /**
   * Use with async onClick handlers to set loading indicator
   */
  async: PropTypes.bool,

  /**
   * DOM pass through
   */
  className: PropTypes.string,
  /**
   * DOM pass through
   */
  id: PropTypes.string,
};

export default Button;
