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
import { Icon } from '@icgc-argo/uikit';
import { Values } from 'global/utils/typeUtils';
import { ComponentType, PropsWithChildren, useEffect, useState } from 'react';

const styles = {
  container: css({ ':hover': { cursor: 'pointer' } }),
  folder: css({
    display: 'flex',
    height: '36px',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#225088',
    padding: '9px',
    color: 'white',

    h2: { margin: 0, fontSize: '14px', fontWeight: 400, color: 'white' },
  }),
  content: (isOpen) => ({ display: isOpen ? 'block' : 'none' }),
};

const ArrowToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick?: () => void }) => {
  return (
    <Icon
      onClick={onClick}
      name={isOpen ? 'chevron_up' : 'chevron_down'}
      fill="white"
      height="8px"
    />
  );
};

const Mode = {
  TOGGLE: 'TOGGLE',
  OPEN: 'OPEN',
} as const;
type Mode = Values<typeof Mode>;

/**
 *
 * @param param0
 * @returns
 */
export const FacetFolder = ({
  title,
  onClick,
  override,
  Toggle,
  mode = Mode.TOGGLE,
  children,
}: PropsWithChildren<{
  title: string;
  onClick?: ({ isOpen }: { isOpen: boolean }) => void;
  override?: boolean;
  Toggle?: ComponentType<{ isOpen: boolean; onClick?: () => void }>;
  mode?: Mode;
}>) => {
  const isToggleMode = mode === Mode.TOGGLE;

  const [isOpen, setIsOpen] = useState(!isToggleMode);

  const ToggleComp = Toggle || ArrowToggle;

  // example use: expand all from parent component
  useEffect(() => {
    setIsOpen(override);
  }, [override]);

  return (
    <div css={styles.container}>
      <div css={styles.folder}>
        <h2>{title}</h2>
        <div css={css({ marginLeft: 'auto' })}>
          <ToggleComp
            isOpen={isOpen}
            onClick={() => {
              onClick && onClick({ isOpen });
              isToggleMode && setIsOpen((isOpen) => !isOpen);
            }}
          />
        </div>
      </div>
      <div css={styles.content(isToggleMode ? isOpen : true)}>{children}</div>
    </div>
  );
};

export const FiltersSearchBox = ({ isOpen, onClick }) => {
  return (
    <FacetFolder
      title="Filters"
      Toggle={() => {
        return (
          <div onClick={() => onClick()}>
            Expand All <ArrowToggle isOpen={isOpen} />
          </div>
        );
      }}
      mode={Mode.OPEN}
    >
      <div> search box </div>
    </FacetFolder>
  );
};

export const FacetGroup = ({ children }: PropsWithChildren<{}>) => {
  return <div>{children}</div>;
};
