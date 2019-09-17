
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../Icon';
import useTheme from '../utils/useTheme';
import FocusWrapper from '../FocusWrapper';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'sm' | 'md';

export const BUTTON_VARIANTS: {
  PRIMARY: ButtonVariant,
  SECONDARY: ButtonVariant,
  TEXT: ButtonVariant,
} = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TEXT: 'text',
});

export const BUTTON_SIZES: {
  SM: ButtonSize,
  MD: ButtonSize,
} = Object.freeze({
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

const Button = React.forwardRef<
  {
    /**
     * Button variant type eg. primary
     */
    variant?: ButtonVariant,
    /**
     * Button size
     */
    size?: ButtonSize,
    children?: Node,
    disabled?: boolean,
    onClick?: (
      e: SyntheticEvent<HTMLButtonElement>,
    ) => any | ((e: SyntheticEvent<HTMLButtonElement>) => Promise<any>),
    /**
     * Use with async onClick handlers to set loading indicator
     */
    isAsync?: boolean,

    /**
     * DOM pass through
     */
    className?: string,
    /**
     * DOM pass through
     */
    id?: string,
  },
  any,
>(
  (
    {
      children,
      onClick = e => {},
      disabled = false,
      variant = BUTTON_VARIANTS.PRIMARY,
      size = variant === BUTTON_VARIANTS.SECONDARY ? BUTTON_SIZES.SM : BUTTON_SIZES.MD,
      isAsync = false,
      className,
      id,
    },
    ref,
  ) => {
    const [isLoading, setLoading] = React.useState(false);
    const theme = useTheme();
    const shouldShowLoading = isLoading && isAsync;
    const onClickFn = async event => {
      setLoading(true);
      await onClick(event);
      setLoading(false);
    };
    return (
      <StyledButton
        ref={ref}
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
  },
);

export default Button;
