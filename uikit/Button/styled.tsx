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

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import FocusWrapper from 'uikit/FocusWrapper';

import { BUTTON_VARIANTS } from './constants';
import { ButtonSize, ButtonVariant } from './types';

const StyledButton = styled<
  typeof FocusWrapper,
  {
    size: ButtonSize;
    variant: ButtonVariant;
    disabled: boolean;
  }
>(FocusWrapper)`
  ${({ theme }) => css(theme.typography.default)};
  align-items: center;
  border: none;
  box-shadow: none;
  display: flex;
  font-weight: 600;
  justify-content: center;
  outline: none;
  text-transform: uppercase;
  transition: all 0.25s;

  color: ${({ theme, variant }) => theme.button.textColors[variant].default};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme, size }) => theme.button.fontSizes[size]};

  &:disabled {
    color: ${({ theme, variant }) => theme.button.textColors[variant].disabled};
  }

  ${({ size, theme, variant }) =>
    variant === BUTTON_VARIANTS.LINK
      ? `
        &:hover:not(:disabled) {
          color: ${theme.button.textColors[variant].hover};
        }
      `
      : `
        background-color: ${theme.button.colors[variant].default};
        border-color: ${theme.button.borderColors[variant].default};
        border-radius: 100px;
        border-style: solid;
        border-width: ${theme.button.borderWeights[size]};
        padding: ${theme.button.paddings[size]};
        
        &:focus {
          background-color: ${theme.button.colors[variant].focus};
        }

        &:hover {
          background-color: ${theme.button.colors[variant].hover};
          border-color: ${theme.button.borderColors[variant].hover};
        }

        &:active {
          background-color: ${theme.button.colors[variant].active};
          border-color: ${theme.button.borderColors[variant].active};
        }
        
        &:disabled {
          background-color: ${theme.button.colors[variant].disabled};
          border-color: ${theme.button.borderColors[variant].disabled};
        }
      `}
`;
export default StyledButton;
