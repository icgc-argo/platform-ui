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

import React, { useState, useContext, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import useTheme from '../../utils/useTheme';

import css from '@emotion/css';
import FormControlContext from '../FormControl/FormControlContext';

const Textarea: React.ComponentType<
  {
    ['aria-label']: string;
    error?: boolean;
  } & TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ error, disabled, className, ...props }) => {
  const theme = useTheme();

  const { disabled: calcDisabled = disabled, error: calcError = error } =
    useContext(FormControlContext) || {};

  return (
    <textarea
      className={clsx({ error: calcError, disabled: calcDisabled }, className)}
      css={css`
        ${css(theme.typography.paragraph as any)};
        resize: vertical;
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        border: 1px solid;
        border-radius: 8px;
        border-color: ${theme.input.borderColors.default};
        background-color: ${theme.input.colors.default};

        &:hover {
          border-color: ${theme.input.borderColors.hover} !important;
        }

        &:focus {
          outline: 0;
          border-color: ${theme.input.borderColors.focus};
        }

        &.error {
          border-color: ${theme.input.borderColors.error};
        }

        &.disabled {
          background-color: ${theme.input.colors.disabled};
        }
      `}
      aria-label={props['aria-label']}
      disabled={calcDisabled}
      id={props.id}
      {...props}
    />
  );
};

export default Textarea;
