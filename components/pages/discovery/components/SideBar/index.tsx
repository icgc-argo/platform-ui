/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

import { useTheme } from '@icgc-argo/uikit';

const SideBar = () => {
  const theme = useTheme();
  return (
    <FacetRow
      css={css`
        border-top: 1px solid ${theme.colors.grey_2};
      `}
    >
      <MenuItem
        onClick={(e) => clickHandler(currentSearch)}
        selected={expandedFacets.includes(currentSearch.facetPath)}
        className="FacetMenu"
        content={currentSearch.name}
        chevronOnLeftSide={true}
        isFacetVariant={true}
        RightSideComp={
          <Tooltip position={'right'} html={currentSearch.tooltipContent}>
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
          {excludedIds.length > 0 && (
            <SelectedIds ids={excludedIds} onRemove={onRemoveSelectedId} />
          )}
          <div
            css={css`
              position: relative;
              width: 250px;
            `}
            ref={searchRef}
          >
            <Input
              size="sm"
              aria-label="search-for-files"
              placeholder={currentSearch.placeholderText}
              preset="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(trim(e.target.value));
                if (searchQuery && searchQuery.length >= 1) setSearchOpen(true);
              }}
              css={css`
                &:hover {
                  background-color: white;
                }
                border-radius: 8px;
              `}
            />
            {searchQuery && searchQuery.length >= 1 && searchOpen ? (
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
                <SearchResultsMenu
                  searchData={idSearchResults}
                  isLoading={idSearchLoading}
                  onSelect={(value) => {
                    setFilterFromFieldAndValue({
                      field: FileCentricDocumentFields[currentSearch.esDocumentField],
                      value,
                    });
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                />
              </>
            ) : null}
          </div>
        </div>
      </MenuItem>
    </FacetRow>
  );
};

export default SideBar;
