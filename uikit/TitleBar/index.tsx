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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import Icon from '../Icon';
import useTheme from '../utils/useTheme';

const Nav = styled('nav')`
  padding: 18px 29px 18px 0;
  ${({ theme }) => css(theme.typography.title)};
  & a {
    color: ${({ theme }) => theme.titleBar.linkColor};
    text-decoration: none;
  }
`;

const Ol = styled('ol')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const Li = styled('li')`
  list-style: none;
  ${({ theme }) => css(theme.typography.title)};
`;

const Sep = styled('li')`
  list-style: none;
  display: flex;
  user-select: none;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 30px;
`;

const interleave = (arr = [], y) => {
  const [x, ...xs] = arr;
  return xs.length === 0 ? [x] : [x, y, ...interleave(xs, y)];
};

const TitleBar: React.ComponentType<{
  className?: string;
  id?: string;
  children: React.ReactNode | React.ReactNodeArray;
}> = ({ children, className, id }) => {
  const theme = useTheme();

  const allItems = interleave(
    React.Children.toArray(children).filter(child => React.isValidElement(child)),
    <Sep>
      <Icon width="12px" height="12px" name="chevron_right" fill={theme.titleBar.separatorColor} />
    </Sep>,
  ).map((child, index) =>
    child.type === Sep ? (
      <React.Fragment key={`child-${index}`}>{child}</React.Fragment>
    ) : (
      <Li key={`child-${index}`}>{child}</Li>
    ),
  );

  return (
    <Nav className={className} id={id}>
      <Ol>{allItems}</Ol>
    </Nav>
  );
};

export default TitleBar;
