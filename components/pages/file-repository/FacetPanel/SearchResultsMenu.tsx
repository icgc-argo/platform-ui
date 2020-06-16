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

import { css } from 'uikit';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { IdSearchQueryData } from './types';
import { useTheme } from 'uikit/ThemeProvider';

const getDropdownStyle = (theme) => `
  position: absolute;
  top: 36px;
  left: 0px;
  background-color: white;
  width: 254px;
  border: 1px solid ${theme.colors.primary_4};
  border-top: 0px;
  border-radius: 0px 0px 8px 8px;
  z-index: 2;
  padding-top: 2px;
`;

const SearchResultsMenu = ({
  isLoading,
  searchData,
  onSelect,
}: {
  isLoading: boolean;
  searchData: IdSearchQueryData;
  onSelect: Function;
}) => {
  const theme = useTheme();
  if (isLoading || !searchData) {
    return (
      <div
        css={css`
          ${getDropdownStyle(theme)}
        `}
      >
        <Typography
          css={css`
            color: ${theme.colors.primary_1};
            font-size: 14px;
            font-style: italic;
            margin: 0;
            display: flex;
            align-items: center;
            padding: 8px 0 8px 10px;
          `}
        >
          <Icon
            name="spinner"
            fill={theme.colors.primary_1}
            css={css`
              margin-right: 10px;
            `}
          />
          Loading results...
        </Typography>
      </div>
    );
  } else {
    if (searchData.file.hits.total === 0) {
      return (
        <div
          css={css`
            ${getDropdownStyle(theme)}
          `}
        >
          <Typography
            css={css`
              color: ${theme.colors.primary_1};
              font-size: 14px;
              font-style: italic;
              margin: 0;
              display: flex;
              align-items: center;
              padding: 8px 0 8px 10px;
            `}
          >
            No results found
          </Typography>
        </div>
      );
    }
    return (
      <>
        <div
          css={css`
            ${getDropdownStyle(theme)}
          `}
        >
          {searchData.file.hits.edges.slice(0, 5).map(({ node }) => {
            return (
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
                onClick={() => onSelect(node.object_id)}
                key={node.object_id}
              >
                <Typography
                  css={css`
                    font-size: 11px;
                    font-weight: 500;
                    padding: 2px 3px;
                    margin: 0;
                    word-break: break-all;
                  `}
                >
                  {node.object_id}
                </Typography>
                <Typography
                  css={css`
                    font-size: 9px;
                    font-weight: 300;
                    word-break: break-all;
                    margin: 0;
                    padding: 2px 3px;
                  `}
                >
                  {node.file.name}
                </Typography>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default SearchResultsMenu;
