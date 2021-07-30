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

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Radio from '../Radio';
import css from '@emotion/css';
import RadioCheckContext from '../RadioCheckboxGroup/RadioCheckContext';

/**
 * FormRadio to be used with RadioCheckboxGroup
 */
const FormRadio: React.ComponentType<{
  id?: string;
  name?: string;
  value?: any;
  children: React.ReactNode;
  checked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  'aria-label'?: string;
}> = (props) => {
  const { ['aria-label']: ariaLabel, value, children, checked = false } = props;
  const { onChange, isChecked, disabled } = useContext(RadioCheckContext) || {
    ...props,
    isChecked: props.checked,
  };
  const onClick = () => !disabled && onChange(value);
  const calcChecked = isChecked
    ? isChecked instanceof Function
      ? isChecked(value)
      : isChecked
    : checked;

  return (
    <RadioCheckboxWrapper disabled={disabled} checked={calcChecked} onClick={onClick}>
      <Radio aria-label={ariaLabel} checked={calcChecked} disabled={disabled} onChange={onChange} />
      <label
        css={css`
          margin-left: 8px;
        `}
      >
        {children}
      </label>
    </RadioCheckboxWrapper>
  );
};

export default FormRadio;
