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
import styled from '@emotion/styled';
import { withProps } from 'recompose';

import Icon from '../../Icon';
import Typography from '../../Typography';

export type PopupPosition = 'UP' | 'DOWN';
export const POPUP_POSITIONS = { UP: 'UP' as PopupPosition, DOWN: 'DOWN' as PopupPosition };

export const DropdownIcon = withProps(({ disabled, theme }) => ({
  name: 'chevron_down',
  fill: disabled ? theme.colors.grey_disabled : 'black',
}))(styled<typeof Icon, { disabled?: boolean }>(Icon)`
  height: 100%;
  width: 10px;
  padding: 10px;
  border-left: solid 1px
    ${({ theme, disabled }) => (disabled ? theme.colors.grey_2 : theme.colors.grey_1)};
`);

export const OptionsList = styled('ol')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  border: solid 1px ${({ theme }) => theme.colors.grey_1};
  background: ${({ theme }) => theme.colors.white};
  min-width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 100;

  &.${POPUP_POSITIONS.UP} {
    top: 0;
    transform: translateY(-100%);
  }
  &.${POPUP_POSITIONS.DOWN} {
    top: 100%;
  }
`;

const OptionContainer = styled('li')`
  list-style: none;
  min: 100%;
  padding: 5px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_4};
    cursor: pointer;
  }
`;

const OptionContent = withProps(() => ({
  variant: 'paragraph',
  component: 'span',
}))(Typography);

export const Option = ({ value, children, ...props }) => (
  <OptionContainer data-value={value} role="option" {...props}>
    <OptionContent>{children}</OptionContent>
  </OptionContainer>
);

export const HiddenSelect = styled('select')`
  opacity: 0;
  pointer-events: none;
  z-index: -1000;
  position: absolute;
`;
