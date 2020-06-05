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

import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import defaultTheme from 'uikit/theme/defaultTheme';

type TagVariant = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' | 'UPDATE' | 'NEUTRAL';
export const TAG_VARIANTS: { [k in TagVariant]: k } = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  UPDATE: 'UPDATE',
  NEUTRAL: 'NEUTRAL',
};

const Tag = styled<'div', { variant?: keyof typeof TAG_VARIANTS }>('div')`
  ${({ theme }) => css(theme.typography.paragraph as any)};
  box-sizing: border-box;
  display: inline-block;
  min-height: 14px;
  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 8px;
  background-color: ${({ theme, variant = 'INFO' }) =>
    ({
      [TAG_VARIANTS.ERROR]: theme.colors.error,
      [TAG_VARIANTS.WARNING]: theme.colors.warning,
      [TAG_VARIANTS.INFO]: theme.colors.secondary,
      [TAG_VARIANTS.SUCCESS]: theme.colors.accent1_dimmed,
      [TAG_VARIANTS.UPDATE]: theme.colors.accent3_dark,
      [TAG_VARIANTS.NEUTRAL]: theme.colors.grey_2,
    }[variant])};
  color: ${({ theme, variant = 'INFO' }) => (variant === TAG_VARIANTS.NEUTRAL ? 'black' : 'white')};
`;

export default Tag;
