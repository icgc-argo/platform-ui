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
import { css } from '@emotion/react';

import FormControlContext from './FormControlContext';

const FormControl = React.forwardRef<
  HTMLElement,
  {
    className?: string;
    /**
     * The contents of the form control.
     */
    children?: React.ReactNodeArray | React.ReactNode;
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component?: keyof HTMLElementTagNameMap;
    /**
     * If `true`, the label should be displayed in an error state.
     */
    error?: boolean | string;
    /**
     * If `true`, the label will indicate that the input is required.
     */
    required?: boolean;
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
  }
>(function FormControl(
  {
    component: Component = 'div' as any,
    disabled = false,
    error = false,
    required = false,
    ...other
  },
  ref,
) {
  const [focused, setFocused] = React.useState(false);

  const childContext = {
    disabled,
    error,
    required,
    focused,
    handleFocus: () => {
      setFocused(true);
    },
    handleBlur: () => {
      setFocused(false);
    },
  };

  return (
    <FormControlContext.Provider value={childContext}>
      <Component
        ref={ref}
        css={css`
          margin-bottom: 10px;
        `}
        {...other}
      />
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

export default FormControl;
