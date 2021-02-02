/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import PropTypes, { any } from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../Icon';
import useTheme from '../utils/useTheme';
import FocusWrapper from '../FocusWrapper';

type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'sm' | 'md';

export const BUTTON_VARIANTS: {
  PRIMARY: ButtonVariant;
  SECONDARY: ButtonVariant;
  TEXT: ButtonVariant;
} = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TEXT: 'text',
});

export const BUTTON_SIZES: {
  SM: ButtonSize;
  MD: ButtonSize;
} = Object.freeze({
  SM: 'sm',
  MD: 'md',
});

const StyledButton = styled<
  typeof FocusWrapper,
  {
    size: 'sm' | 'md';
    variant: 'primary' | 'secondary' | 'text';
    disabled: boolean;
  }
>(FocusWrapper)`
  ${({ theme }) => css(theme.typography.default)};
  transition: all 0.25s;
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
  HTMLButtonElement,
  {
    /**
     * Button variant type eg. primary
     */
    variant?: ButtonVariant;
    /**
     * Button size
     */
    size?: ButtonSize;
    children?: React.ReactNode | React.ReactNodeArray;
    disabled?: boolean;
    onClick?: (
      e: React.SyntheticEvent<HTMLButtonElement>,
    ) => any | ((e: React.SyntheticEvent<HTMLButtonElement>) => Promise<any>);
    /**
     * Use with async onClick handlers to set loading indicator
     */
    isAsync?: boolean;

    /**
     * DOM pass through
     */
    className?: string;
    /**
     * DOM pass through
     */
    id?: string;
    isLoading?: boolean;
  }
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
      isLoading: controlledLoadingState,
    },
    ref = React.createRef(),
  ) => {
    const [isLoading, setLoading] = React.useState(false);
    const theme = useTheme();

    /**
     * controlledLoadingState will allows consumer to control the loading state.
     * Else, that is set by the component internally
     */
    const shouldShowLoading = controlledLoadingState === true || (isLoading && isAsync);

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
