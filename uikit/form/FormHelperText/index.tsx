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
import FormControlContext from '../FormControl/FormControlContext';
import styled from '@emotion/styled';
import clsx from 'clsx';
import css from '@emotion/css';
import pick from 'lodash/pick';

const FormHelperText = React.forwardRef<
  any,
  {
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component?: keyof HTMLElementTagNameMap;
    /**
     * The CSS class name of the wrapper element.
     */
    className?: string;
    children?: React.ReactNode | React.ReactNodeArray;
    /**
     * Allows turning this component into an error-dependent message.
     * Hides it when no errors are present. Else,
     */
    onErrorOnly?: boolean;
  }
>(function FormHelperText(props, ref) {
  const {
    component: Component = 'p',
    className: classNameProp,
    children,
    onErrorOnly = false,
  } = props;

  const StyledComponent = styled<any, any>(Component)`
    ${({ theme }) => css(theme.typography.caption)};
    margin: 3px 7px;
    line-height: 14px;

    &.error {
      color: ${({ theme }) => theme.colors.error};
    }

    &.disabled {
      ${!onErrorOnly && `display: none;`}
    }
  `;

  const contextValue = React.useContext(FormControlContext);

  return !onErrorOnly || contextValue.error ? (
    <StyledComponent
      ref={ref}
      className={clsx(pick(contextValue, ['error', 'disabled']), classNameProp)}
    >
      {children}
    </StyledComponent>
  ) : (
    <></>
  );
});

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
