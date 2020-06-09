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

import HyperLink from 'uikit/Link';
import { css } from '@emotion/core';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';

const ViewAmountController: React.ComponentType<{
  /** Function to handle what happens when the selectAll/DeselectAll button is clicked */
  selectAllHander: () => any;
  /** Function to handle what happens when more/less toggle is clicked */
  moreToggleHandler: () => any;
  /** whether or not selectAll has been triggered */
  selectAllState: boolean;
  /** whether or not there are more hidden options available to view */
  moreOptionsAvailable: boolean;
  /** what to set the visibility property of, for the more/less toggle  */
  toggleVisiblityCss?: string;
  /** the text for the more/less toggle  */
  toggleText?: string;
}> = ({
  selectAllHander,
  moreToggleHandler,
  selectAllState,
  moreOptionsAvailable,

  toggleVisiblityCss = 'visible',
  toggleText = 'More / Collapse',
}) => {
  const theme = useTheme();
  return (
    <div
      className=""
      css={css`
        display: flex;
        justify-content: space-between;
        padding: 6px 12px;
        border-bottom: 1px solid;
        border-color: ${theme.colors.grey_2};
      `}
      onClick={e => e.stopPropagation()}
    >
      <HyperLink
        css={css`
          font-size: 11px;
        `}
        onClick={e => {
          selectAllHander();
        }}
      >
        {selectAllState ? 'Deselect all' : 'Select all'}
      </HyperLink>

      {/* The div containing the show more / show less toggler */}
      <div
        css={css`
          display: flex;
          align-content: center;
          align-items: center;
          visibility: ${toggleVisiblityCss};
        `}
      >
        <HyperLink
          css={css`
            display: flex;
            align-items: center;
            font-size: 11px;
          `}
          onClick={e => {
            moreToggleHandler();
          }}
        >
          <Icon
            name={moreOptionsAvailable ? 'plus_circle' : 'minus_circle'}
            css={css`
              margin-right: 6px;
              --iconSize: 12px;
              width: var(--iconSize);
              height: var(--iconSize);
            `}
            fill={theme.colors.accent2}
          />
          {toggleText}
        </HyperLink>
      </div>
    </div>
  );
};

export default ViewAmountController;
