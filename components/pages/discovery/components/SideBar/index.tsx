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

import {
  css,
  Facet,
  Icon,
  Input,
  MenuItem,
  styled,
  Tooltip,
  UikitIconNames,
  useTheme,
} from '@icgc-argo/uikit';
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

// const FacetContainer = styled(Container)`
//   z-index: 1;
//   background: ${({ theme }) => theme.colors.white};
//   box-shadow: ${({ theme }) => theme.shadows.pageElement};
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;
//   height: calc(100vh - 58px);
//   max-height: calc(100vh - 58px);
//   border-radius: 0;
// `;

const SidebarComp = ({ children }: PropsWithChildren) => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#04518C',
        color: 'white',
      })}
    >
      {children}
    </div>
  );
};

const Toggle = ({
  onClick,
  size = '10px',
  direction = 'left',
  className,
}: {
  onClick: () => void;
  size: string;
  direction?: 'left' | 'right'; // valid for UikitIconNames
  className?;
}) => {
  const fill = 'white';

  return (
    <div
      css={css([
        {
          height: '50px',
          backgroundColor: '#04518C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
          '> div': {
            marginRight: '12px',
          },
        },
      ])}
      className={className}
    >
      <div
        onClick={onClick}
        css={css({
          ':hover': {
            cursor: 'pointer',
          },
        })}
      >
        <Icon
          name={`chevron_${direction}` as UikitIconNames}
          width={size}
          height={size}
          fill={fill}
        />
        <Icon
          name={`chevron_${direction}` as UikitIconNames}
          width={size}
          height={size}
          fill={fill}
          css={css({ marginLeft: '-4px' })}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ toggle, open }) => {
  const theme = useTheme();

  const [expandAll, setExpandAll] = useState(false);

  return (
    <SidebarComp>
      {open ? (
        <>
          <FiltersSearchBox
            title="Filter"
            isExpanded={expandAll}
            onClick={() => setExpandAll((s) => !s)}
          />
          <div css={css({ flex: 1, overflow: 'scroll' })}>
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
          <Toggle onClick={toggle} size="10px" />
        </>
      ) : (
        <Toggle
          onClick={toggle}
          size="10px"
          css={css({
            height: '80px',
            position: 'absolute',
            top: 'calc(50% - 40px)',
            width: '40px',
          })}
        />
      )}
    </SidebarComp>
  );
};

//

export default Sidebar;
