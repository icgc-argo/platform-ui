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

import React, { ReactNode, useContext } from 'react';

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
  onChange?: (any) => any;
  error?: boolean;
  required?: boolean;
  value?: string;
}) => {
  const theme: UikitTheme = useTheme();
  const { onChange = props.onChange, isChecked } = useContext(RadioCheckContext);
  const {
    disabled = props.disabled,
    error = props.error,
    required = props.required,
  } = React.useContext(FormControlContext);

  const onClick = () => onChange(value);
  const calcChecked = typeof isChecked === 'function' ? isChecked(value) : isChecked || checked;

  return (
    <RadioCheckboxWrapper checked={calcChecked} disabled={disabled} error={error} onClick={onClick}>
      <Checkbox
        value={value}
        checked={calcChecked}
        disabled={disabled}
        onChange={onChange}
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
