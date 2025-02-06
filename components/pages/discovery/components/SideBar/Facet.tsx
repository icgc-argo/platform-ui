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
import { PropsWithChildren } from 'react';

const styles = {
  parent: css({ ':hover': { cursor: 'pointer' } }),
  folder: css({
    display: 'flex',
    height: '36px',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#225088',
    padding: '9px',

    h2: { margin: 0, fontSize: '14px', fontWeight: 400, color: 'white' },
    svg: { marginLeft: 'auto' },
  }),
  content: (isOpen) => ({ display: isOpen ? 'block' : 'none' }),
};

export const FacetFolder = ({
  title,
  isOpen,
  onClick,
  children,
}: PropsWithChildren<{ title: string; isOpen: boolean; onClick: () => void }>) => {
  return (
    <div css={styles.parent} onClick={onClick}>
      <div css={styles.folder}>
        <h2>{title}</h2>
        <Icon name={isOpen ? 'chevron_up' : 'chevron_down'} fill="white" height="8px" />
      </div>
      <div css={styles.content(isOpen)}>{children}</div>
    </div>
  );
};

export const FacetGroup = ({ children }: PropsWithChildren<{}>) => {
  return <div>{children}</div>;
};
