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

import React from 'react';
import { css } from '@emotion/core';

import Icon from '../Icon';
import useTheme from '../utils/useTheme';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './constants';
import StyledButton from './styled';
import { ButtonVariant, ButtonSize } from './types';

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
    onBlur?: (
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
    Loader?: any;
    type?: 'button' | 'submit' | 'reset';
  }
>(
  (
    {
      children,
      onClick = (e) => {},
      onBlur = (e) => {},
      disabled = false,
      variant = BUTTON_VARIANTS.PRIMARY,
      size = variant === BUTTON_VARIANTS.SECONDARY ? BUTTON_SIZES.SM : BUTTON_SIZES.MD,
      isAsync = false,
      className,
      id,
      isLoading: controlledLoadingState,
      Loader,
      type,
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

    const onClickFn = async (event) => {
      setLoading(true);
      await onClick(event);
      setLoading(false);
    };

    const LoaderComp = (props) => (Loader ? <Loader {...props} /> : <DefaultLoader {...props} />);

    return (
      <StyledButton
        ref={ref}
        onClick={isAsync ? onClickFn : onClick}
        onBlur={onBlur}
        disabled={disabled}
        size={size}
        variant={variant}
        className={className}
        id={id}
        type={type}
      >
        <div
          css={css`
            display: ${shouldShowLoading ? 'block' : 'none'};
          `}
        >
          <LoaderComp variant={variant} theme={theme} />
        </div>
        <div
          css={css`
            display: ${shouldShowLoading ? 'none' : 'block'};
          `}
        >
          {children}
        </div>
      </StyledButton>
    );
  },
);

const DefaultLoader = ({ variant, theme }) => (
  <Icon
    name="spinner"
    width={'20px'}
    height={'20px'}
    fill={theme.button.textColors[variant].default}
  />
);

export default Button;
