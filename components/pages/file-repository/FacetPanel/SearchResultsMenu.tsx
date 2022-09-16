/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import React from 'react';
import { css, styled, UikitTheme } from '@icgc-argo/uikit';
import { Typography } from '@icgc-argo/uikit';
import { Icon } from '@icgc-argo/uikit';
import { SearchMenuDataNode } from './types';
import { useTheme } from '@icgc-argo/uikit';

const ResultsDropdown = styled('div')`
  position: absolute;
  top: 36px;
  left: 0px;
  background-color: white;
  width: 248px;
  box-shadow: ${({ theme }: { theme: UikitTheme }) => `1px solid ${theme.colors.primary_4}`};
  border-top: 0px;
  border-radius: 0px 0px 8px 8px;
  z-index: 2;
  padding-top: 2px;
  box-shadow: ${({ theme }: { theme: UikitTheme }) => theme.shadows.pageElement};
`;

const NoResultsContainer = styled(Typography)`
  color: ${({ theme }: { theme: UikitTheme }) => theme.colors.primary_2};
  font-size: 14px;
  font-style: italic;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 10px;
`;

const ListItem = styled(Typography)`
  word-break: break-all;
  margin: 0;
  padding: 2px 3px;
`;

const SearchResultsMenu = ({
  isLoading,
  searchData,
  onSelect,
}: {
  isLoading: boolean;
  searchData: SearchMenuDataNode[];
  onSelect: Function;
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <ResultsDropdown>
        <NoResultsContainer>
          <Icon
            name="spinner"
            fill={theme.colors.primary_2}
            css={css`
              margin-right: 10px;
            `}
          />
          Loading results...
        </NoResultsContainer>
      </ResultsDropdown>
    );
  } else {
    if (!searchData || searchData.length === 0) {
      return (
        <ResultsDropdown>
          <NoResultsContainer>No results found</NoResultsContainer>
        </ResultsDropdown>
      );
    }

    return (
      <>
        <ResultsDropdown>
          {searchData.map(({ resultId, secondaryText, subText }, i) => (
            <div
              css={css`
                cursor: pointer;
                padding: 2px;
                border-bottom: 1px solid ${theme.colors.primary_4};
                &:hover {
                  background-color: ${theme.colors.secondary_4};
                }
                &:last-child {
                  border-bottom: 0px;
                }
              `}
              onClick={() => onSelect(resultId)}
              key={`${resultId}-${i}`}
            >
              <ListItem
                css={css`
                  font-size: 11px;
                  font-weight: 500;
                `}
              >
                <>
                  <span style={{ fontWeight: 700 }}>{resultId} </span>
                  {`(${secondaryText})`}
                </>
              </ListItem>
              <ListItem
                css={css`
                  font-size: 9px;
                  font-weight: 300;
                `}
              >
                {subText}
              </ListItem>
            </div>
          ))}
        </ResultsDropdown>
      </>
    );
  }
};

export default SearchResultsMenu;
