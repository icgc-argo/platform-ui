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

import React, { ReactNode, useContext, useRef, useState } from 'react';

import { css, UikitTheme } from '../../';
import Icon from '../../Icon';
import { useTheme } from '../../ThemeProvider';
import Checkbox from '../Checkbox';
import { RadioCheckboxWrapper } from '../common';
import FormControlContext from '../FormControl/FormControlContext';
import RadioCheckContext from '../RadioCheckboxGroup/RadioCheckContext';

const FormCheckbox = ({
  checked,
  children,
  value,
  ...props
}: {
  checked?: boolean;
  children: ReactNode;
  disabled?: boolean;
  error?: boolean;
  onBlur?: (e: any) => any;
  onChange?: (e: any) => any;
  onFocus?: (e: any) => any;
  required?: boolean;
  value?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme: UikitTheme = useTheme();
  const checkboxRef = useRef<HTMLInputElement>();
  const hiddenCheckboxRef = useRef<HTMLInputElement>();
  const { onChange = props.onChange, isChecked } = useContext(RadioCheckContext);

  const {
    disabled = props.disabled,
    error = props.error,
    focused,
    handleBlur = props.onBlur,
    handleFocus = props.onFocus,
    required = props.required,
  } = React.useContext(FormControlContext);

  const onBlur = (event) => {
    if (!(checkboxRef.current === event.target || hiddenCheckboxRef.current === event.target)) {
      setIsFocused(false);
      handleBlur?.(event);
    }
  };

  const onClick = (event) => {
    if (!(checkboxRef.current === event.target || hiddenCheckboxRef.current === event.target)) {
      checkboxRef.current.click();
    }
  };

  const onFocus = (event) => {
    if (!(checkboxRef.current === event.target || hiddenCheckboxRef.current === event.target)) {
      setIsFocused(true);
      handleFocus?.(event);
    }
  };

  const calcChecked = typeof isChecked === 'function' ? isChecked(value) : isChecked || checked;

  return (
    <RadioCheckboxWrapper
      checked={calcChecked}
      disabled={disabled}
      error={error}
      focused={focused || isFocused}
      onClick={onClick}
    >
      <Checkbox
        value={value}
        checked={calcChecked}
        disabled={disabled}
        forwardedRefs={[checkboxRef, hiddenCheckboxRef]}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        aria-label={props['aria-label']}
      />

      <label
        css={css`
          margin-left: 8px;
        `}
      >
        {children}

        {required && (
          <span>
            <Icon
              css={css`
                margin-bottom: 5px;
                margin-left: 5px;
              `}
              width="6px"
              height="6px"
              name="asterisk"
              fill={theme.colors.error}
            />
          </span>
        )}
      </label>
    </RadioCheckboxWrapper>
  );
};

export default FormCheckbox;
