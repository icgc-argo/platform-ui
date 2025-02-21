/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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
import { PropsWithChildren } from 'react';
import { ArrowToggle, commonStyle } from './common';

const facetFolderStyles = {
  container: css({ ':hover': { cursor: 'pointer' } }),
  folder: css([
    {
      height: '36px',
      padding: '9px',
      h2: { margin: 0, fontSize: '14px', fontWeight: 400, color: 'white' },
    },
  ]),
  content: (isExpanded) => ({ display: isExpanded ? 'block' : 'none' }),
};

export const FacetFolder = ({
  title,
  children,
  onClick,
  isExpanded,
}: PropsWithChildren<{
  title: string;
  onClick;
  isExpanded: boolean;
}>) => {
  return (
    <div css={css([facetFolderStyles.container])} onClick={onClick}>
      <div css={css([commonStyle.header, facetFolderStyles.folder])}>
        <h2>{title}</h2>
        <ArrowToggle isOpen={isExpanded} />
      </div>
      <div css={facetFolderStyles.content(isExpanded)}>{children}</div>
    </div>
  );
};
