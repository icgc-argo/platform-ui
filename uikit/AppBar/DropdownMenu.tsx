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

import React, { LiHTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import clsx from 'clsx';

const Ul = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.grey_4};
  left: 0;
  bottom: 0;
  margin: 0;
  transform: translateY(100%);
  width: 100%;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
  text-align: left;
  padding: 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
`;

export function DropdownMenu({ children, ...otherProps }) {
  return <Ul {...otherProps}>{children}</Ul>;
}

const Li = styled('li')`
  list-style: none;
  padding: 12px 16px;
  position: relative;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey_2};
  cursor: pointer;

  a {
    color: inherit;
    text-decoration: none;
  }

  &.active {
    color: ${({ theme }) => theme.colors.secondary};
    border-left: 3px solid ${({ theme }) => theme.colors.secondary};
    padding-left: 13px;
    background-color: ${({ theme }) => theme.colors.secondary_4};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:not(:last-child):after {
    content: '';
    width: 100%;
    height: 2px;
    left: 0px;
    bottom: -1px;
    box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.colors.grey_2};
    display: block;
    position: absolute;
  }
`;

export const DropdownMenuItem = React.forwardRef<
  HTMLLIElement,
  { active?: boolean } & LiHTMLAttributes<HTMLLIElement>
>(function DropdownMenuItem({ children, active, ...otherProps }, ref) {
  return (
    <Li {...otherProps} className={clsx({ active })} ref={ref}>
      {children}
    </Li>
  );
});
