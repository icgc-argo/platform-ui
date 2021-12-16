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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import FocusWrapper from 'uikit/FocusWrapper';

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

  color: ${({ theme, variant }) => theme.button.textColors[variant].default};
  background-color: ${({ theme, variant }) => theme.button.colors[variant].default};
  border-color: ${({ theme, variant }) => theme.button.borderColors[variant].default};
  border-width: ${({ theme, size }) => theme.button.borderWeights[size]};
  padding: ${({ theme, size }) => theme.button.paddings[size]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme, size }) => theme.button.fontSizes[size]};

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
export default StyledButton;
