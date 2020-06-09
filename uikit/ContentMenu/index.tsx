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
import Typography from 'uikit/Typography';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Cont = styled('div')`
  margin-top: 14px;
  border-left: 2px solid ${({ color, theme }) => (color ? color : theme.colors.secondary)};
`;

const Anchor = styled<'a', { disabled: boolean; active: boolean }>('a')`
  /** specificty for docusaurus, easier to edit here */
  > div {
    background-color: ${({ active, theme: { colors } }) =>
      active ? colors.secondary_4 : colors.white};
    > span {
      color: ${({ disabled, active, theme: { colors } }) =>
        disabled ? colors.grey_1 : active ? colors.secondary_dark : colors.primary};

      font-weight: ${({ active }) => (active ? '600' : 'normal')};
    }
  }

  &:hover {
    text-decoration: none;

    > div {
      background-color: ${({ theme: { colors }, active }) =>
        active ? colors.secondary_4 : colors.grey_3};
      > span {
        color: ${({ theme: { colors }, active }) =>
          active ? colors.secondary_dark : colors.primary};
      }
    }
  }
`;

const MenuItem = ({ name, onClick, disabled, active }) => {
  return (
    <Anchor onClick={onClick} active={active} disabled={disabled}>
      <div
        css={css`
          padding: 8px 0 8px 16px;

          &:hover {
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
          }
        `}
        onClick={onClick}
      >
        <Typography variant="data">{name}</Typography>
      </div>
    </Anchor>
  );
};

const Menu = ({
  title,
  contents,
  color,
  scrollYOffset = 0,
}: {
  title: string;
  contents: Array<{
    name: string;
    contentRef?: React.RefObject<HTMLElement>;
    disabled?: boolean;
    active?: boolean;
  }>;
  color?: string;
  // use case: fixed header on page, need extra offset to scroll to top of content
  scrollYOffset?: number;
}) => {
  return (
    <div>
      <Typography variant="sectionHeader" color="primary">
        {title}
      </Typography>
      <Cont color={color}>
        {contents.map(({ name, contentRef, disabled, active }, index) => (
          <MenuItem
            active={active}
            key={index}
            name={name}
            disabled={disabled}
            onClick={() => {
              if (!disabled && contentRef && contentRef.current) {
                window.scrollTo(0, contentRef.current.offsetTop - scrollYOffset);
              }
            }}
          />
        ))}
      </Cont>
    </div>
  );
};

export default Menu;
