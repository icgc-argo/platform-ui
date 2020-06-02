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

import React from 'react';
import { MenuItem } from '../SubMenu';

import { css } from '@emotion/core';

import OptionsList, { FilterOption } from 'uikit/OptionsList';

const Facet = ({
  subMenuName,
  options,
  isSelected,
  onClick,
  countUnit,
}: {
  subMenuName: string;
  options: Array<FilterOption>;
  isSelected?: boolean;
  onClick?: (e: any) => void;
  countUnit?: string;
}) => {
  const [searchQueryState, setSearchQueryState] = React.useState('');

  return (
    <>
      <MenuItem
        className="FacetMenu"
        onClick={onClick}
        selected={isSelected}
        content={subMenuName}
        chevronOnLeftSide={true}
        isFacetVariant={true}
        searchBar={true}
        searchStateParams={{ query: searchQueryState, querySetter: setSearchQueryState }}
        css={css`
          width: 300px;
        `}
      >
        <OptionsList options={options} searchQuery={searchQueryState} countUnit={countUnit} />
      </MenuItem>
    </>
  );
};

export default Facet;
