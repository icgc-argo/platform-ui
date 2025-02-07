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

import { css, Facet, Icon, Input, MenuItem, styled, Tooltip, useTheme } from '@icgc-argo/uikit';
import { FacetFolder, FiltersSearchBox } from './Facet';
import { PropsWithChildren, useState } from 'react';
import { facets } from './data';

const FacetRow = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div css={css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' })}>
      {children}
    </div>
  );
};

const SideBar = () => {
  const theme = useTheme();

  const [expandAll, setExpandAll] = useState(false);

  return (
    <div>
      <button onClick={() => setExpandAll((s) => !s)}>EXPAND ALL</button>
      <FiltersSearchBox
        title="Filter"
        isExpanded={expandAll}
        onClick={() => setExpandAll((s) => !s)}
      />
      {facets.map(({ folder, contents }) => {
        return (
          <FacetFolder title={folder} onClick={() => console.log('a')} override={expandAll}>
            {contents.map((facet) => {
              return (
                <Facet
                  subMenuName={facet.name}
                  options={[{ doc_count: 222, isChecked: false, key: 'a' }]}
                  onOptionToggle={() => console.log('option toggle')}
                  onSelectAllOptions={() => console.log('on select all')}
                />
              );
            })}
          </FacetFolder>
        );
      })}
      <FacetFolder title={'test'} onClick={() => console.log('a')}>
        hi
      </FacetFolder>
      <FacetRow></FacetRow>
    </div>
  );
};

export default SideBar;
