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
import { Icon, Input } from '@icgc-argo/uikit';
import { PropsWithChildren, useEffect, useState } from 'react';

const commonStyle = {
  container: css({}),
  header: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '> div, svg': {
      marginLeft: 'auto',
    },
  }),
};

const facetFolderStyles = {
  container: css({ ':hover': { cursor: 'pointer' } }),
  folder: css([
    {
      height: '36px',
      padding: '9px',
      h2: { margin: 0, fontSize: '14px', fontWeight: 400 },
    },
  ]),
  content: (isOpen) => ({ display: isOpen ? 'block' : 'none' }),
};

const ArrowToggle = ({ isOpen }) => {
  return <Icon name={isOpen ? 'chevron_up' : 'chevron_down'} fill="white" height="8px" />;
};

export const FacetFolder = ({
  title,
  onClick,
  override,
  children,
}: PropsWithChildren<{
  title: string;
  onClick: ({ isOpen }: { isOpen: boolean }) => void;
  override?: boolean;
}>) => {
  const [isOpen, setIsOpen] = useState(false);

  // example use: expand all from parent component
  useEffect(() => {
    setIsOpen(override);
  }, [override]);

  return (
    <div
      css={css([commonStyle.container, facetFolderStyles.container])}
      onClick={() => {
        onClick({ isOpen });
        setIsOpen((isOpen) => !isOpen);
      }}
    >
      <div css={css([commonStyle.header, facetFolderStyles.folder])}>
        <h2>{title}</h2>
        <ArrowToggle isOpen={isOpen} />
      </div>
      <div css={facetFolderStyles.content(isOpen)}>{children}</div>
    </div>
  );
};

const filtersSearchBoxStyles = {
  folder: css([
    css({
      h2: { margin: 0, fontSize: '16px', fontWeight: 400 },
    }),
  ]),
};

export const FiltersSearchBox = ({ title, onClick, isExpanded }) => {
  return (
    <div css={css([commonStyle.container, css({ height: '100px' })])}>
      <div css={css([commonStyle.header, filtersSearchBoxStyles.folder])}>
        <h2>{title}</h2>
        <div onClick={() => onClick()}>
          Expand All <ArrowToggle isOpen={isExpanded} />
        </div>
      </div>

      <Input
        size="sm"
        aria-label="search-for-files"
        placeholder={'try searcing for a filter'}
        preset="search"
        value={'1'}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        css={css({ padding: '12px 6px 0 6px' })}
      />
    </div>
  );
};

export const FacetGroup = ({ children }: PropsWithChildren<{}>) => {
  return <div>{children}</div>;
};
