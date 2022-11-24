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

import { useQuery } from '@apollo/client';
import {
  Button,
  Container,
  css,
  DnaLoader,
  Icon,
  Link,
  TitleBar,
  Typography,
  useTheme,
  VerticalTabs,
} from '@icgc-argo/uikit';
import useGlobalLoader from 'components/GlobalLoader';
import { getConfig } from 'global/config';
import { DOCS_SUBMITTED_DATA_PAGE } from 'global/constants/docSitePaths';
import useUrlParamState from 'global/hooks/useUrlParamState';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Row, setConfiguration } from 'react-grid-system';
import ClinicalDownloadButton from './DownloadButtons';
import SubmissionLayout from '../layout';
import ClinicalEntityDataTable from './ClinicalEntityDataTable';
import {
  aliasedEntityNames,
  clinicalEntityDisplayNames,
  clinicalEntityFields,
  ClinicalEntityQueryResponse,
  ClinicalEntitySearchResultResponse,
  defaultClinicalEntityFilters,
  emptyResponse,
  CompletionStates,
  emptySearchResponse,
  hasClinicalErrors,
  parseDonorIdString,
  reverseLookUpEntityAlias,
} from './common';
import SUBMITTED_DATA_SIDE_MENU_QUERY from './gql/SUBMITTED_DATA_SIDE_MENU_QUERY';
import SearchBar from './SearchBar';
import CLINICAL_ENTITY_SEARCH_RESULTS_QUERY from './SearchBar/gql/CLINICAL_ENTITY_SEARCH_RESULTS_QUERY';

setConfiguration({ gutterWidth: 9 });

const defaultClinicalEntityTab = 'donor';

export default function ProgramSubmittedData({ donorId = '' }: { donorId: string }) {
  const programShortName = useRouter().query.shortName as string;
  const theme = useTheme();
  const [keyword, setKeyword] = useState('');
  const [filterTextBox, setFilterTextBox] = useState('');
  const isFilterUsed = !!filterTextBox;
  const [completionState, setCompletionState] = useState(CompletionStates['all']);
  const { setGlobalLoading } = useGlobalLoader();
  const { FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClinicalEntityTab, setSelectedClinicalEntityTab] = useUrlParamState(
    'tab',
    defaultClinicalEntityTab,
    {
      serialize: (v) => v,
      deSerialize: (v) => v,
    },
  );
  const currentEntity: string = reverseLookUpEntityAlias(selectedClinicalEntityTab);
  const [selectedDonors, setSelectedDonors] = useUrlParamState('donorId', donorId, {
    serialize: (v) => v,
    deSerialize: (v) => v,
  });
  const currentDonor = selectedDonors && [parseDonorIdString(selectedDonors)];
  // Matches multiple digits and/or digits preceded by DO, followed by a comma, space, or end of string
  // Example: DO259138, 2579137, DASH-7, DO253290abcdef
  // Regex will match first 2 Donor IDs, but not 3rd Submitter ID or 4th case w/ random text
  const searchDonorIds =
    keyword
      .match(/(?=DO|\d)\d+(?=,| |$)/gi)
      ?.filter((match) => !!match)
      .map((idString) => parseInt(idString)) || [];

  // Matches 'D' or 'DO' exactly (case insensitive)
  const donorPrefixSearch = keyword.match(/^(d|do)\b/gi);

  const searchSubmitterIds = donorPrefixSearch
    ? []
    : keyword.split(/, |,/).filter((word) => !!word);

  // Format text coming from filter
  const filterDonorIds =
    filterTextBox
      .match(/(^\d)\d*|((?<=,)|(?<=DO))\d*/gi)
      ?.filter((match) => !!match)
      .map((idString) => parseInt(idString)) || [];

  const filterSubmitterIds =
    filterTextBox
      .split(',')
      .map((str) => str.trim())
      .filter((word) => !!word) || [];

  // Side Menu Query (Populates Clinical Entity Table)
  const { data: sideMenuQuery, loading: sideMenuLoading } =
    FEATURE_SUBMITTED_DATA_ENABLED &&
    useQuery<ClinicalEntityQueryResponse>(SUBMITTED_DATA_SIDE_MENU_QUERY, {
      errorPolicy: 'all',
      variables: {
        programShortName,
        filters: {
          ...defaultClinicalEntityFilters,
          completionState,
          donorIds: isFilterUsed
            ? filterDonorIds
            : currentDonor && !searchDonorIds.length
            ? currentDonor
            : searchDonorIds,
          submitterDonorIds: isFilterUsed ? filterSubmitterIds : searchSubmitterIds,
        },
      },
    });

  useEffect(() => {
    setGlobalLoading(sideMenuLoading);
  }, [sideMenuLoading]);

  const { clinicalData: sideMenuData } =
    sideMenuQuery == undefined || sideMenuLoading ? emptyResponse : sideMenuQuery;

  // Search Result Query
  const { data: searchResultData, loading: searchResultsLoading } =
    useQuery<ClinicalEntitySearchResultResponse>(CLINICAL_ENTITY_SEARCH_RESULTS_QUERY, {
      errorPolicy: 'all',
      variables: {
        programShortName,
        filters: {
          ...defaultClinicalEntityFilters,
          completionState,
          donorIds: isFilterUsed ? filterDonorIds : searchDonorIds,
          submitterDonorIds: isFilterUsed ? filterSubmitterIds : searchSubmitterIds,
          entityTypes: ['donor'],
        },
      },
    });

  const menuItems = clinicalEntityFields.map((entity) => (
    <VerticalTabs.Item
      key={entity}
      active={selectedClinicalEntityTab === aliasedEntityNames[entity]}
      onClick={(e) => setSelectedClinicalEntityTab(aliasedEntityNames[entity])}
      disabled={
        !sideMenuData.clinicalEntities.some((e) => e.entityName === aliasedEntityNames[entity])
      }
    >
      {clinicalEntityDisplayNames[entity]}
      {hasClinicalErrors(sideMenuData, entity) && (
        <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
      )}
    </VerticalTabs.Item>
  ));

  const useDefaultQuery =
    !isFilterUsed &&
    !currentDonor &&
    (donorPrefixSearch || (searchDonorIds.length === 0 && searchSubmitterIds.length === 0)) &&
    completionState === 'all';

  const noSearchData = searchResultData === null || searchResultData === undefined;
  const searchResults = noSearchData ? emptySearchResponse : searchResultData;
  const noData = sideMenuData.clinicalEntities.length === 0 && noSearchData && !currentDonor;

  return (
    <SubmissionLayout
      subtitle={`${programShortName} Dashboard`}
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          `}
        >
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Submitted Data
              </div>
            </Row>
          </TitleBar>
          <Link
            target="_blank"
            href={DOCS_SUBMITTED_DATA_PAGE}
            bold
            withChevron
            uppercase
            underline={false}
            css={css`
              font-size: 14px;
            `}
          >
            HELP
          </Link>
        </div>
      }
    >
      <SearchBar
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setFilterTextBox={setFilterTextBox}
        filterTextBox={filterTextBox}
        completionState={completionState}
        setCompletionState={setCompletionState}
        programShortName={programShortName}
        keyword={keyword}
        loading={searchResultsLoading}
        noData={noData}
        useDefaultQuery={useDefaultQuery}
        currentDonor={currentDonor}
        donorSearchResults={searchResults}
        setUrlDonorIds={setSelectedDonors}
        setKeyword={setKeyword}
      />
      {searchResultsLoading ? (
        <DnaLoader />
      ) : (
        <Container>
          <div
            css={css`
              width: 100%;
            `}
          >
            {/* Sidebar */}
            <div
              css={css`
                width: 20%;
                max-width: 170px;
                display: inline-block;
                border: 1px solid ${theme.colors.grey_2}; ;
              `}
            >
              <VerticalTabs>{menuItems}</VerticalTabs>
            </div>
            {/* Content */}
            <div
              css={css`
                display: inline-block;
                height: 100%;
                width: calc(97% - 170px);
                vertical-align: top;
                padding: 8px 12px;
              `}
            >
              {/* Header */}
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <Typography
                  variant="subtitle2"
                  css={css`
                    margin-top: 4px;
                    margin-left: 4px;
                  `}
                >
                  {clinicalEntityDisplayNames[currentEntity]} Data
                </Typography>

                <ClinicalDownloadButton
                  searchResults={searchResultData.clinicalSearchResults.searchResults}
                  text={`${clinicalEntityDisplayNames[currentEntity]} Data`}
                  entityTypes={[currentEntity]}
                  completionState={completionState}
                  disabled={noData}
                />
              </div>
              {/* DataTable */}
              <div>
                <ClinicalEntityDataTable
                  entityType={currentEntity}
                  program={programShortName}
                  completionState={completionState}
                  currentDonor={currentDonor}
                  donorSearchResults={searchResultData}
                  useDefaultQuery={useDefaultQuery}
                  noData={noData}
                />
              </div>
            </div>
          </div>
        </Container>
      )}
    </SubmissionLayout>
  );
}
