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

import React, { AnchorHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '..';

type LinkVariant = 'INLINE' | 'BLOCK';
export type HyperLinkProps = {
  variant?: LinkVariant;
  uppercase?: boolean;
  withChevron?: boolean;
  underline?: boolean;
  bold?: boolean;
  href?: string;
  invert?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const StyledLink = styled<'a', HyperLinkProps>('a')`
  ${({ theme }) => css(theme.typography.default)}
  cursor: pointer;
  color: ${({ theme, invert }) => (invert ? theme.colors.white : theme.colors.accent2_dark)};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'inherit')};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'default')};

  :hover {
    color: ${({ theme }) => theme.colors.accent2_1};
  }
  :active {
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

const Link = React.forwardRef<HTMLAnchorElement, HyperLinkProps>(
  (
    {
      href,
      variant = LINK_VARIANTS.INLINE,
      uppercase = variant === LINK_VARIANTS.BLOCK,
      withChevron = variant === LINK_VARIANTS.BLOCK,
      underline = variant === LINK_VARIANTS.INLINE,
      bold = variant === LINK_VARIANTS.BLOCK,
      invert = false,
      children,
      ...rest
    },
    ref,
  ) => (
    <StyledLink
      ref={ref}
      uppercase={uppercase}
      underline={underline}
      bold={bold}
      href={href}
      invert={invert}
      {...rest}
    >
      {children}
      {withChevron && ' ›'}
    </StyledLink>
  ),
);

export const LINK_VARIANTS = Object.freeze({
  INLINE: 'INLINE' as LinkVariant,
  BLOCK: 'BLOCK' as LinkVariant,
});

export default Link;
