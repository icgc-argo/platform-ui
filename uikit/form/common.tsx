/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import Typography from '../Typography';
import React from 'react';

import { INPUT_STATES as INPUT_THEME_STATES } from '../theme/defaultTheme/input';

export type InputSize = 'sm' | 'lg';

export const INPUT_SIZES = {
  SM: 'sm' as InputSize,
  LG: 'lg' as InputSize,
};

export const INPUT_STATES = INPUT_THEME_STATES;

export type StyledInputWrapperProps = {
  disabled?: boolean;
  error?: boolean | string;
  inputState?: keyof typeof INPUT_THEME_STATES;
  size?: 'sm' | 'lg';
  getOverrideCss?: (a: any) => any;
};
export const StyledInputWrapper = styled<'div', StyledInputWrapperProps>('div')`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  min-height: ${({ size = INPUT_SIZES.SM }) => {
    switch (size) {
      case INPUT_SIZES.SM:
        return '32px';
      case INPUT_SIZES.LG:
        return '38px';
      default:
        return '30px';
    }
  }};

  color: ${({ theme, disabled, error }) =>
    theme.input.textColors[disabled ? 'disabled' : 'default']};
  background-color: ${({ theme, disabled }) =>
    theme.input.colors[disabled ? 'disabled' : 'default']};
  font-size: ${({ theme, size }) => theme.input.fontSizes[size]};
  border-color: ${({ theme, inputState, error, disabled }) => {
    const state = error ? 'error' : disabled ? 'disabled' : inputState;
    return theme.input.borderColors[state];
  }};

  &:hover {
    border-color: ${({ theme, disabled, error }) => {
      if (error) return theme.colors.error;
      else if (disabled) return theme.colors.grey_disabled;
      else return theme.colors.secondary_1;
    }};
  }

  ${({ inputState, theme }) =>
    inputState === 'focus' && `box-shadow: 0px 0px 4px 0px ${theme.colors.secondary_1};`}
  ${({ getOverrideCss, ...rest }) => (getOverrideCss ? getOverrideCss(rest) : '')}
`;

type RadioCheckboxWrapperProps = {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean | string;
  focused?: boolean;
};
export const RadioCheckboxWrapper = styled<'div', RadioCheckboxWrapperProps>('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ error, theme }) =>
    error ? theme.radiocheckbox.borderColors.error : theme.radiocheckbox.borderColors.default};

  background-color: ${({ theme, disabled, checked }) =>
    theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : checked ? 'checked' : 'default']};

  color: ${({ theme, disabled }) =>
    theme.radiocheckbox.textColors[disabled ? 'disabled' : 'default']};

  padding: 4px 6px 4px 8px;

  label {
    ${({ theme }) => css(theme.typography.paragraph)};
    line-height: normal;
    position: relative;
    cursor: pointer;
    color: inherit;
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  ${({ focused, theme }) => focused && `box-shadow: 0px 0px 4px 0px ${theme.colors.secondary_1};`}
  &:focus {
    box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.colors.secondary_1};
  }
`;

export const StyledGroup = styled('div')`
  div {
    margin-top: 2px;
  }
  div:first-child {
    margin: 0;
  }
`;
