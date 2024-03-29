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

import ClinicalDownloadButton from '../DownloadButtons';
import {
  Button,
  Container,
  css,
  DropdownButton,
  Icon,
  Input,
  Typography,
  useClickAway,
  useTheme,
} from '@icgc-argo/uikit';
import SearchResultsMenu from 'components/pages/file-repository/FacetPanel/SearchResultsMenu';
import { Dispatch, SetStateAction, useState, createRef, RefObject, useEffect } from 'react';
import FilterModal from './FilterModal';
import {
  ClinicalEntitySearchResultResponse,
  CompletionStates,
  emptySearchResponse,
  clinicalEntityFields,
  TsvDownloadIds,
} from '../common';
import {
  searchBackgroundStyle,
  searchBarParentStyle,
  searchBoldTextStyle,
  searchClearFilterStyle,
  searchDownArrowStyle,
  searchDownloadButtonStyle,
  searchDropdownStyle,
  searchFilterButtonStyle,
  searchFilterContainerStyle,
  searchFilterIconStyle,
  searchFilterParentStyle,
  searchInputFieldStyle,
  searchRightSideGroupStyle,
  searchTitleParentStyle,
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
  setModalVisible,
  noData,
  completionState,
  setCompletionState,
  programShortName,
  loading,
  keyword,
  setKeyword,
  useDefaultQuery,
  currentDonors,
  setSelectedDonors,
  donorSearchResults,
  tsvDownloadIds,
  modalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  noData: boolean;
  completionState: CompletionStates;
  setCompletionState: Dispatch<SetStateAction<CompletionStates>>;
  programShortName: string;
  loading: boolean;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  useDefaultQuery: boolean;
  currentDonors: number[];
  setSelectedDonors: React.Dispatch<React.SetStateAction<string>>;
  donorSearchResults: ClinicalEntitySearchResultResponse;
  tsvDownloadIds: TsvDownloadIds;
  modalVisible: boolean;
}) {
  const theme = useTheme();
  const [displayText, setDisplayText] = useState('- Select an option -');
  const [searchOpen, setSearchOpen] = useState(false);
  const setFilterValue = (value) => {
    setKeyword(value);
    setSelectedDonors(value);
    setSearchOpen(false);
  };

  const menuItemDropdownRef = createRef() as RefObject<HTMLDivElement>;
  useClickAway({
    domElementRef: menuItemDropdownRef,
    onElementClick: setFilterValue,
    onClickAway: () => setSearchOpen(false),
  });

  const {
    clinicalSearchResults: { searchResults },
  } = donorSearchResults || emptySearchResponse;

  const titleText =
    currentDonors.length === 1
      ? `DO${currentDonors[0]}`
      : currentDonors.length > 1
      ? `${currentDonors.length} Donors`
      : keyword
      ? `${searchResults.length} Donors`
      : COMPLETION_OPTIONS[completionState].display;

  const searchResultMenuItems =
    searchResults
      .map((result) => {
        const { donorId, submitterDonorId } = result;
        return donorId ? { resultId: `DO${donorId}`, secondaryText: submitterDonorId } : null;
      })
      .filter((result) => !!result)
      .slice(0, 20) || [];

  useEffect(() => {
    const completionDisplayText = COMPLETION_OPTIONS[completionState]
      ? `Show ${COMPLETION_OPTIONS[completionState].display}`
      : '- Select an option -';

    setDisplayText(completionDisplayText);
  }, [completionState]);

  return (
    <Container css={searchBackgroundStyle}>
      {modalVisible && (
        <FilterModal
          setModalVisible={setModalVisible}
          setSelectedDonors={setSelectedDonors}
          programShortName={programShortName}
        />
      )}
      {/* First Item - title */}
      <Typography css={searchTitleParentStyle} variant="subtitle2">
        Clinical Data for: <b css={searchBoldTextStyle}>{titleText}</b>
        {!useDefaultQuery && (
          <Button
            onClick={() => {
              setFilterValue('');
              setCompletionState(CompletionStates.all);
            }}
            css={searchClearFilterStyle}
            variant="secondary"
          >
            <u>Clear Filters</u>
          </Button>
        )}
      </Typography>

      {/* Grouping second to fourth item together */}
      <div css={searchRightSideGroupStyle}>
        {/* Second item - filter */}
        <div css={searchFilterParentStyle}>
          <Typography variant="label">Quick Filters:</Typography>
          <DropdownButton
            css={searchDropdownStyle}
            disabled={!!currentDonors.length}
            value={completionState}
            variant="secondary"
            size="sm"
            onItemClick={(e) => {
              setCompletionState(e.value);
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
            getOverrideCss={() => searchInputFieldStyle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setSearchOpen(false);
            }}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setFilterValue('');
              } else {
                setKeyword(e.target.value);
                setSearchOpen(true);
              }
            }}
            placeholder={'Donor ID/Submitter Donor ID'}
            preset="search"
            showClear={true}
            size="sm"
            value={keyword}
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
                searchData={searchResultMenuItems}
                isLoading={loading}
                onSelect={setFilterValue}
              />
            </>
          ) : null}
          <Button
            css={searchFilterButtonStyle}
            variant="secondary"
            onClick={() => setModalVisible(true)}
          >
            <span css={searchFilterContainerStyle}>
              <Icon name="filter" fill="accent2_dark" height="12px" css={searchFilterIconStyle} />{' '}
              List
            </span>
          </Button>
        </div>

        {/* Fourth item - download button*/}
        <div css={searchDownloadButtonStyle}>
          <ClinicalDownloadButton
            tsvDownloadIds={tsvDownloadIds}
            text="Clinical Data"
            entityTypes={clinicalEntityFields}
            completionState={completionState}
            disabled={noData}
          />
        </div>
      </div>
    </Container>
  );
}
