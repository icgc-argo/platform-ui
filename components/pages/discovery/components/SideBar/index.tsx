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

import { css, Icon, Input, MenuItem, styled, Tooltip, useTheme } from '@icgc-argo/uikit';
import { FacetFolder, FiltersSearchBox } from './Facet';
import { useState } from 'react';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const x = [
  'General',
  'Demographic',
  'Biospecimen',
  'Diagnosis',
  'Treatment',
  'Assessment',
  'Molecular',
];

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
      {x.map((d) => {
        return (
          <FacetFolder title={d} onClick={() => console.log('a')} override={expandAll}>
            hi
          </FacetFolder>
        );
      })}
      <FacetFolder title={'test'} onClick={() => console.log('a')}>
        hi
      </FacetFolder>
      <FacetRow
        css={css`
          border-top: 1px solid ${theme.colors.grey_2};
        `}
      >
        <MenuItem
          onClick={(e) => console.log('click')}
          content={'menu content'}
          chevronOnLeftSide={true}
          isFacetVariant={true}
          RightSideComp={
            <Tooltip position={'right'} html={'tooltip'}>
              <Icon name="question_circle" fill="primary_2" width="18px" height="18px" />
            </Tooltip>
          }
          css={css`
            flex: 1;
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            css={css`
              padding: 6px 12px;
              border-bottom: 1px solid ${theme.colors.grey_2};
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: left;
            `}
          >
            <div
              css={css`
                position: relative;
                width: 250px;
              `}
            >
              <Input
                size="sm"
                aria-label="search-for-files"
                placeholder={'place hodler'}
                preset="search"
                value={'search value'}
                onChange={(e) => {
                  console.log('input change');
                }}
                css={css`
                  &:hover {
                    background-color: white;
                  }
                  border-radius: 8px;
                `}
              />

              <>
                <div
                  css={css`
                    background: transparent;
                    border-right: 1px solid ${theme.colors.primary_4};
                    border-left: 1px solid ${theme.colors.primary_4};
                    height: 18px;
                    width: 248px;
                    z-index: 0;
                    position: absolute;
                    top: 28px;
                  `}
                />
                <div>search resulsts</div>
              </>
            </div>
          </div>
        </MenuItem>
      </FacetRow>
    </div>
  );
};

export default SideBar;
