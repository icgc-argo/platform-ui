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

import * as React from 'react';
import { useState } from 'react';
import Container from '@icgc-argo/uikit/Container';
import DropdownButton from '@icgc-argo/uikit/DropdownButton';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import useClickAway from '@icgc-argo/uikit/utils/useClickAway';
import Icon from '@icgc-argo/uikit/Icon';
import { Input } from '@icgc-argo/uikit/form';
import Button from '@icgc-argo/uikit/Button';
import { css } from '@icgc-argo/uikit';
import Typography from '@icgc-argo/uikit/Typography';
import SearchResultsMenu from 'components/pages/file-repository/FacetPanel/SearchResultsMenu';
import ClinicalDownloadButton from '../DownloadButtons';
import {
  CompletionStates,
  ClinicalEntitySearchResultResponse,
  emptySearchResponse,
} from '../common';
import {
  searchBackgroundStyle,
  searchTitleParentStyle,
  searchBoldTextStyle,
  searchClearFilterStyle,
  searchRightSideGroupStyle,
  searchFilterParentStyle,
  searchDropdownStyle,
  searchDownArrowStyle,
  searchBarParentStyle,
  searchInputFieldStyle,
  searchFilterButtonStyle,
  searchFilterContainerStyle,
  searchFilterIconStyle,
  searchDownloadIconStyle,
} from './style';

const COMPLETION_OPTIONS = {
  all: {
    display: `All Donors`,
    value: CompletionStates['all'],
  },
  invalid: {
    display: `Invalid Donors`,
    value: CompletionStates['invalid'],
  },
  complete: {
    display: `Complete Donors`,
    value: CompletionStates['complete'],
  },
  incomplete: {
    display: `Incomplete Donors`,
    value: CompletionStates['incomplete'],
  },
};

const MENU_ITEMS = Object.values(COMPLETION_OPTIONS);

export default function SearchBar({
  noData,
  onChange,
  completionState,
  loading,
  keyword,
  setKeyword,
  donorSearchResults,
}: {
  noData: boolean;
  onChange: React.Dispatch<React.SetStateAction<CompletionStates>>;
  completionState: CompletionStates;
  loading: boolean;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  donorSearchResults: ClinicalEntitySearchResultResponse;
}) {
  const theme = useTheme();
  const [displayText, setDisplayText] = useState('- Select an option -');
  const [searchOpen, setSearchOpen] = useState(false);
  const setSearchValue = (value) => {
    setKeyword(value);
    setSearchOpen(false);
  };

  const menuItemDropdownRef = React.createRef() as React.RefObject<HTMLDivElement>;
  useClickAway({
    domElementRef: menuItemDropdownRef,
    onElementClick: setSearchValue,
    onClickAway: () => setSearchOpen(false),
  });

  const {
    clinicalSearchResults: { searchResults, totalResults },
  } = donorSearchResults || emptySearchResponse;
  const searchResultItems =
    searchResults
      .map((result) => {
        const { donorId, submitterDonorId } = result;
        return donorId ? { resultId: `DO${donorId}`, secondaryText: submitterDonorId } : null;
      })
      .filter((result) => !!result)
      .slice(0, 20) || [];

  const titleText =
    keyword && searchResultItems.length === 1
      ? `${searchResultItems[0].resultId}`
      : keyword && searchResults.length > 1
      ? `${searchResultItems.length} Donors`
      : COMPLETION_OPTIONS[completionState].display;

  return (
    <Container css={searchBackgroundStyle}>
      {/* First Item - title */}
      <Typography css={searchTitleParentStyle} variant="subtitle2">
        Clinical Data for: <b css={searchBoldTextStyle}>{titleText}</b>
        {keyword && (
          <Button
            onClick={() => {
              setKeyword('');
            }}
            css={searchClearFilterStyle}
            variant="secondary"
          >
            <u>Clear Filters</u>
          </Button>
        )}
      </Typography>

      {/* Grouping second to forth item together */}
      <div css={searchRightSideGroupStyle}>
        {/* Second item - filter */}
        <div css={searchFilterParentStyle}>
          <Typography variant="subtitle2">Quick Filters:</Typography>
          <DropdownButton
            css={searchDropdownStyle}
            value={completionState}
            variant="secondary"
            size="sm"
            onItemClick={(e) => {
              onChange(e.value);
              const completionDisplayText = COMPLETION_OPTIONS[e.value]
                ? `Show ${COMPLETION_OPTIONS[e.value].display}`
                : '- Select an option -';
              setDisplayText(completionDisplayText);
            }}
            menuItems={MENU_ITEMS}
          >
            {displayText}
            <Icon name="chevron_down" fill="accent2_dark" css={searchDownArrowStyle} />
          </DropdownButton>
        </div>

        {/* Third item - search bar */}
        <div css={searchBarParentStyle}>
          <Input
            aria-label="search-for-files"
            size="sm"
            placeholder={'Donor ID/Submitter Donor ID'}
            preset="search"
            showClear={true}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (keyword && keyword.length >= 1) setSearchOpen(true);
            }}
            getOverrideCss={() => searchInputFieldStyle}
          />
          {keyword && keyword.length >= 1 && searchOpen ? (
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
                ref={menuItemDropdownRef}
              />
              <SearchResultsMenu
                searchData={searchResultItems}
                isLoading={loading}
                onSelect={setSearchValue}
              />
            </>
          ) : null}
          <Button css={searchFilterButtonStyle} variant="secondary">
            <span css={searchFilterContainerStyle}>
              <Icon name="filter" fill="accent2_dark" height="12px" css={searchFilterIconStyle} />{' '}
              List
            </span>
          </Button>
        </div>
        {/* Fourth item - download button*/}

        <ClinicalDownloadButton searchResults={searchResults} text="Clinical Data" />
        {/* <Button
          css={css`
            margin: 5px 10px 5px 10px;
            height: fit-content;
            :disabled {
              background: #f6f6f7;
              color: ${theme.colors.grey_1};
            }
          `}
          variant="secondary"
          disabled={noData}
        >
          <Icon
            css={searchDownloadIconStyle}
            name="download"
            fill={noData ? 'grey_1' : 'accent2_dark'}
            height="12px"
          />
          Clinical Data
        </Button> */}
      </div>
    </Container>
  );
}
