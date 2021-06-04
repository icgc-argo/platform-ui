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

import Typography from '../Typography';

const MenuItemTypography: typeof Typography = withProps(() => ({
  variant: 'navigation',
}))(Typography);

export const MenuItemContent = styled(MenuItemTypography)`
  margin: 0px 24px;
  text-align: center;
  text-decoration: none;
`;
export const MenuItemContainer = styled<
  'div',
  {
    active: boolean;
  }
>('div', {
  shouldForwardProp: (propName) => propName !== 'active',
})`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
    background-color: ${({ theme }) => theme.appBar.menuItem.background.hover};
  }

  color: ${({ active, theme }) => (active ? theme.colors.accent1 : theme.colors.white)};
  border-left: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-right: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-bottom: solid 3px ${({ active, theme }) => (active ? theme.colors.accent1 : 'none')};
`;
export const MenuGroupDisplay = styled('div')`
  display: flex;
  flex-direction: row;
  & > :not(:first-of-type) {
    border-left: none;
  }
`;
export const AppBarContainer = styled('nav')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 58px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;
export const SectionDisplay = styled('div')`
  display: flex;
`;
export const LogoContainer = styled('span')`
  margin: 0px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImage = styled('img')`
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const UserBadgeContainer = styled('div')`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  margin: 0 -24px;
  padding: 0 16px;
  box-sizing: border-box;
`;
