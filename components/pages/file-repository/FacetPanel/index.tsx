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
import { QueryHookOptions, useQuery } from '@apollo/client';
import {
  Collapsible,
  Container,
  css,
  Facet,
  Icon,
  Input,
  MenuItem,
  NumberRangeFacet,
  OptionsListFilterOption,
  styled,
  SubMenu,
  Tab,
  Tabs,
  Tooltip,
  useClickAway,
  useTheme,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import { canReadSomeProgram, isDccMember } from 'global/utils/egoJwt';
import { trim } from 'lodash';
import { useState, useEffect, ComponentProps, createRef } from 'react';

import SqonBuilder from 'sqon-builder';
import useDebounce from '../hooks/useDebounce';
import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';
import useFiltersContext from '../hooks/useFiltersContext';
import { FileCentricDocumentFields } from '../types';
import {
  currentFieldValue,
  getDisplayName,
  getTooltipContent,
  inCurrentFilters,
  removeFilter,
  replaceFilter,
  clinicalDisplayValues,
  toDisplayValue,
  toggleFilter,
} from '../utils';
import {
  ArrayFieldKeys,
  CombinationKeys,
  FileRepoFiltersType,
  ScalarFieldKeys,
} from '../utils/types';
import FILE_REPOSITORY_FACETS_QUERY from './gql/FILE_REPOSITORY_FACETS_QUERY';
import SEARCH_BY_DONOR_QUERY from './gql/SEARCH_BY_DONOR_QUERY';
import SEARCH_BY_FILE_QUERY from './gql/SEARCH_BY_FILE_QUERY';
import SearchResultsMenu from './SearchResultsMenu';
import SelectedIds from './SelectedIds';
import TooltipFacet from './TooltipFacet';
import {
  DonorIdSearchQueryData,
  FacetDetails,
  FileFacetPath,
  FileIdSearchQueryData,
  FileRepoFacetsQueryData,
  FileRepoFacetsQueryVariables,
  GetAggregationResult,
  IdSearchQueryVariables,
  SearchMenuDataNode,
} from './types';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const createPresetFacets = (
  displayNames: ReturnType<typeof useFileCentricFieldDisplayName>['data'],
): Array<FacetDetails> => [
  {
    name: displayNames['embargo_stage'],
    facetPath: FileFacetPath.embargo_stage,
    variant: 'Tooltip',
    esDocumentField: FileCentricDocumentFields.embargo_stage,
    highlight: true,
  },
  {
    name: displayNames['release_state'],
    facetPath: FileFacetPath.release_state,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields.release_state,
    highlight: true,
  },
  {
    name: displayNames['study_id'],
    facetPath: FileFacetPath.study_id,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields.study_id,
  },
  {
    name: displayNames['donors.specimens.specimen_type'],
    facetPath: FileFacetPath.donors__specimens__specimen_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['donors.specimens.specimen_type'],
  },
  {
    name: displayNames['donors.specimens.specimen_tissue_source'],
    facetPath: FileFacetPath.donors__specimens__specimen_tissue_source,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['donors.specimens.specimen_tissue_source'],
  },
  {
    name: displayNames['has_clinical_data'],
    facetPath: FileFacetPath.has_clinical_data,
    variant: 'ClinicalData',
    esDocumentField: FileCentricDocumentFields.has_clinical_data,
  },
  {
    name: displayNames['analysis.experiment.experimental_strategy'],
    facetPath: FileFacetPath.analysis__experiment__experimental_strategy,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['analysis.experiment.experimental_strategy'],
  },
  {
    name: displayNames['data_category'],
    facetPath: FileFacetPath.data_category,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['data_category'],
  },
  {
    name: displayNames['data_type'],
    facetPath: FileFacetPath.data_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['data_type'],
  },
  {
    name: displayNames['file_type'],
    facetPath: FileFacetPath.file_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields.file_type,
  },
  {
    name: displayNames['file_access'],
    facetPath: FileFacetPath.file_access,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields.file_access,
  },
  {
    name: displayNames['analysis.workflow.workflow_name'],
    facetPath: FileFacetPath.analysis__workflow__workflow_name,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['analysis.workflow.workflow_name'],
  },
  {
    name: displayNames['analysis_tools'],
    facetPath: FileFacetPath.analysis_tools,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentFields['analysis_tools'],
  },
];

// TODO: Remove when Facet Tabs are deployed to production
const legacyDefaultTabs = [
  FileFacetPath.study_id,
  FileFacetPath.donors__specimens__specimen_type,
  FileFacetPath.donors__specimens__specimen_tissue_source,
  FileFacetPath.analysis__experiment__experimental_strategy,
  FileFacetPath.data_category,
  FileFacetPath.data_type,
  FileFacetPath.has_clinical_data,
  FileFacetPath.file_type,
  FileFacetPath.file_access,
  FileFacetPath.analysis__workflow__workflow_name,
  FileCentricDocumentFields.analysis_tools,
  FileFacetPath.release_state,
  FileFacetPath.embargo_stage,
];

const facetTabs = {
  clinical: [
    FileFacetPath.study_id,
    FileFacetPath.has_clinical_data,
    FileFacetPath.donors__specimens__specimen_type,
    FileFacetPath.donors__specimens__specimen_tissue_source,
    FileFacetPath.release_state,
    FileFacetPath.embargo_stage,
  ],
  file: [
    FileFacetPath.analysis__experiment__experimental_strategy,
    FileFacetPath.data_category,
    FileFacetPath.data_type,
    FileFacetPath.file_type,
    FileFacetPath.file_access,
    FileFacetPath.analysis__workflow__workflow_name,
    FileCentricDocumentFields.analysis_tools,
    FileFacetPath.release_state,
    FileFacetPath.embargo_stage,
  ],
};

const FacetContainer = styled(Container)`
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: calc(100vh - 58px);
  max-height: calc(100vh - 58px);
  overflow-y: auto;
  border-radius: 0;
`;

const useFileFacetQuery = (
  filters: FileRepoFiltersType,
  options: Omit<QueryHookOptions<any, any>, 'variables'> = {},
) => {
  return useQuery<FileRepoFacetsQueryData, FileRepoFacetsQueryVariables>(
    FILE_REPOSITORY_FACETS_QUERY,
    {
      ...options,
      variables: {
        filters,
      },
    },
  );
};

export const useDonorIdSearchQuery = (
  searchValue: string,
  excludedIds?: string[],
): { data: DonorIdSearchQueryData; idSearchResults?: SearchMenuDataNode[]; loading: boolean } => {
  const query = useQuery<DonorIdSearchQueryData, IdSearchQueryVariables>(SEARCH_BY_DONOR_QUERY, {
    skip: !searchValue,
    variables: {
      filters: {
        op: 'and',
        content: [
          {
            op: 'filter' as ArrayFieldKeys,
            content: {
              value: `*${searchValue}*`,
              fields: [
                FileCentricDocumentFields['donors.donor_id'],
                FileCentricDocumentFields['donors.submitter_donor_id'],
              ],
            },
          },
          {
            op: 'not' as CombinationKeys,
            content: [
              {
                op: 'in' as ArrayFieldKeys,
                content: {
                  field: FileCentricDocumentFields['donors.donor_id'],
                  value: excludedIds,
                },
              },
            ],
          },
          {
            op: 'not' as CombinationKeys,
            content: [
              {
                op: 'in' as ArrayFieldKeys,
                content: {
                  field: FileCentricDocumentFields['donors.submitter_donor_id'],
                  value: excludedIds,
                },
              },
            ],
          },
        ],
      },
    },
  });

  return query.data && !query.loading
    ? {
        data: query.data,
        idSearchResults: query.data.file.aggregations['donors__donor_id'].buckets
          .map(
            ({ key, doc_count }): SearchMenuDataNode => ({
              resultId: key,
              secondaryText: `${doc_count} files`,
              subText: '',
            }),
          )
          .slice(0, 5),
        loading: false,
      }
    : query;
};

const useFileIdSearchQuery = (
  searchValue: string,
  excludedIds: string[],
): { data: FileIdSearchQueryData; idSearchResults?: SearchMenuDataNode[]; loading: boolean } => {
  const { FEATURE_FACET_TABS_ENABLED } = getConfig();

  const fileIDQueryFilter = FEATURE_FACET_TABS_ENABLED
    ? {
        value: `*${searchValue}*`,
        fields: [FileCentricDocumentFields['object_id'], FileCentricDocumentFields['file_id']],
      }
    : {
        value: `*${searchValue.toLowerCase()}*`,
        fields: [
          'file_autocomplete.analyzed',
          'file_autocomplete.lowercase',
          'file_autocomplete.prefix',
        ],
      };

  const query = useQuery<FileIdSearchQueryData, IdSearchQueryVariables>(SEARCH_BY_FILE_QUERY, {
    skip: !searchValue,
    variables: {
      filters: {
        op: 'and',
        content: [
          {
            op: 'filter' as ArrayFieldKeys,
            content: fileIDQueryFilter,
          },
          {
            op: 'not' as CombinationKeys,
            content: [
              {
                op: 'in' as ArrayFieldKeys,
                content: {
                  field: FileCentricDocumentFields['object_id'],
                  value: excludedIds,
                },
              },
            ],
          },
          {
            op: 'not' as CombinationKeys,
            content: [
              {
                op: 'in' as ArrayFieldKeys,
                content: {
                  field: FileCentricDocumentFields['file_id'],
                  value: excludedIds,
                },
              },
            ],
          },
        ],
      },
    },
  });

  return query.data && !query.loading
    ? {
        data: query.data,
        idSearchResults: query.data.file.hits.edges
          .map(({ node }) => ({
            resultId: node.file_id,
            secondaryText: node.study_id,
            subText: node.data_category,
          }))
          .slice(0, 5),
        loading: false,
      }
    : query;
};

const fileIDSearch: FacetDetails = {
  name: 'Search by File ID',
  searchQuery: useFileIdSearchQuery,
  facetPath: FileFacetPath.file_id,
  variant: 'Other',
  esDocumentField: FileCentricDocumentFields.file_id,
  placeholderText: 'e.g. FL13796, 009f4750-e167...',
  tooltipContent: 'Enter a File ID or Object ID.',
};

const donorIDSearch: FacetDetails = {
  name: 'Search by Donor ID',
  searchQuery: useDonorIdSearchQuery,
  facetPath: FileFacetPath.donor_id,
  variant: 'Other',
  esDocumentField: FileCentricDocumentFields['donors.donor_id'],
  placeholderText: 'e.g. DO35083, PCSI_0103...',
  tooltipContent: 'Enter a Donor ID or Submitter Donor ID.',
};

const FacetPanel = () => {
  const { data: fieldDisplayNames, loading: loadingFieldDisplayNames } =
    useFileCentricFieldDisplayName();

  const { FEATURE_FACET_TABS_ENABLED } = getConfig();
  const { egoJwt, permissions } = useAuthContext();
  const embargoStageEnabled = !!egoJwt && canReadSomeProgram(permissions);

  const releaseStateEnabled = !!egoJwt && isDccMember(permissions);

  const [currentTab, setTabs] = useState(FEATURE_FACET_TABS_ENABLED ? 'clinical' : 'file');
  const currentSearch =
    FEATURE_FACET_TABS_ENABLED && currentTab === 'clinical' ? donorIDSearch : fileIDSearch;
  const [searchOpen, setSearchOpen] = useState(false);

  const presetFacets = createPresetFacets(fieldDisplayNames);
  const [expandedFacets, setExpandedFacets] = useState(
    [...presetFacets, fileIDSearch, donorIDSearch].map((facet) => facet.facetPath),
  );

  const theme = useTheme();
  const { filters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();

  const [aggregations, setAggregations] = useState({});

  const { data, loading } = useFileFacetQuery(filters, {
    onCompleted: (data) => {
      setAggregations(data ? data?.file?.aggregations : {});
    },
  });

  const clickHandler = (targetFacet: FacetDetails) => {
    const targetFacetPath = targetFacet.facetPath;
    if (expandedFacets.includes(targetFacetPath)) {
      setExpandedFacets(expandedFacets.filter((facet) => facet !== targetFacetPath));
    } else {
      setExpandedFacets(expandedFacets.concat(targetFacetPath));
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    setSearchQuery('');
  }, [currentTab]);

  const excludedIds = (currentFieldValue({
    filters,
    dotField: FileCentricDocumentFields[currentSearch.esDocumentField],
    op: 'in',
  }) || []) as Array<string>;

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { idSearchResults, loading: idSearchLoading } = currentSearch.searchQuery(
    debouncedSearchTerm,
    excludedIds,
  );

  const getOptions = (facet: FacetDetails) => {
    const options: OptionsListFilterOption[] = (
      aggregations[facet.facetPath] || { buckets: [] }
    ).buckets.map((bucket) => {
      const bucketKey = bucket.key_as_string ? bucket.key_as_string : bucket.key;
      return {
        ...bucket,
        key: bucketKey,
        isChecked: inCurrentFilters({
          currentFilters: filters,
          value: bucketKey,
          dotField: facet.esDocumentField,
        }),
      };
    });

    // Control ordering of options for specific facets
    switch (facet.facetPath) {
      case 'embargo_stage':
        const order = ['PROGRAM_ONLY', 'MEMBER_ACCESS', 'ASSOCIATE_ACCESS', 'PUBLIC'];
        return order
          .map((embargoStage) => options.find((option) => option.key === embargoStage))
          .filter(Boolean);
      default:
        return options;
    }
  };

  const getRangeFilters = (facetType: string, min: number, max: number): FileRepoFiltersType => {
    return {
      op: 'and',
      content: [
        ...(min
          ? [
              {
                op: '>=' as ScalarFieldKeys,
                content: {
                  field: facetType,
                  value: min,
                },
              },
            ]
          : []),
        ...(max
          ? [
              {
                op: '<=' as ScalarFieldKeys,
                content: {
                  field: facetType,
                  value: max,
                },
              },
            ]
          : []),
      ],
    };
  };

  const commonFacetProps: (facetDetails: FacetDetails) => {
    onClick: any;
    isExpanded: boolean;
    subMenuName: string;
    facetPath: string;
  } = (facetDetails) => ({
    onClick: (e) => {
      clickHandler(facetDetails);
    },
    isExpanded: expandedFacets.includes(facetDetails.facetPath),
    subMenuName: facetDetails.name,
    facetPath: facetDetails.facetPath,
  });

  const onFacetOptionToggle: (
    facetDetails: FacetDetails,
  ) => ComponentProps<typeof Facet>['onOptionToggle'] = (facetDetails) => {
    return (facetValue) => {
      const currentValue = SqonBuilder.has(facetDetails.esDocumentField, facetValue).build();

      replaceAllFilters(toggleFilter(currentValue, filters));
    };
  };
  const onFacetSelectAllOptionsToggle: (
    facetDetails: FacetDetails,
  ) => ComponentProps<typeof Facet>['onSelectAllOptions'] = (facetDetails) => {
    return (allOptionsSelected) => {
      if (allOptionsSelected) {
        const updatedFilters = removeFilter(
          facetDetails.esDocumentField,
          filters,
        ) as FileRepoFiltersType;
        replaceAllFilters(updatedFilters);
      } else {
        setFilterFromFieldAndValue({
          field: facetDetails.esDocumentField,
          value: aggregations[facetDetails.facetPath].buckets.map((v) => v.key),
        });
      }
    };
  };

  const onNumberRangeFacetSubmit: (
    facetDetails: FacetDetails,
  ) => ComponentProps<typeof NumberRangeFacet>['onSubmit'] = (facetDetails) => {
    return (min, max) => {
      const newFilters = getRangeFilters(facetDetails.name, min, max);
      // remove any existing fields for this facetDetails first
      const withPreviousFieldRemoved = removeFilter(
        facetDetails.name,
        filters,
      ) as FileRepoFiltersType;
      replaceAllFilters(replaceFilter(newFilters, withPreviousFieldRemoved));
    };
  };
  const numberRangeFacetMin: (
    facetDetails: FacetDetails,
  ) => ComponentProps<typeof NumberRangeFacet>['min'] = (facetDetails) => {
    return (
      currentFieldValue({
        filters,
        dotField: facetDetails.name,
        op: '>=',
      }) || ''
    ).toString();
  };
  const numberRangeFacetMax: (
    facetDetails: FacetDetails,
  ) => ComponentProps<typeof NumberRangeFacet>['max'] = (facetDetails) => {
    return (
      currentFieldValue({
        filters,
        dotField: facetDetails.name,
        op: '<=',
      }) || ''
    ).toString();
  };

  const facetContainerLoadingStyle = css`
    opacity: 0.5;
    pointer-events: 'none';
  `;

  const facetContainerDefaultStyle = css`
    opacity: 1;
    pointer-events: 'auto';
    overflow-x: hidden;
  `;
  const onRemoveSelectedId = (id: string) => {
    const idFilterToRemove = SqonBuilder.has(
      FileCentricDocumentFields[currentSearch.esDocumentField],
      id,
    ).build();
    replaceAllFilters(toggleFilter(idFilterToRemove, filters));
  };

  const searchRef = createRef<HTMLDivElement>();
  useClickAway({
    domElementRef: searchRef,
    onClickAway: () => setSearchOpen(false),
    onElementClick: () => {
      setSearchOpen(true);
    },
  });

  const containerProps = {
    css: css`
      flex-grow: 1;
    `,
  };
  const tabStyles = css`
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 9px 5px 0px;
    border: 1px solid ${theme.colors.grey_2};
    border-bottom: 1px none ${theme.colors.white};
    border-radius: 3px 3px 0px 0px;
    flex-grow: 1;
    width: 50%;
    :hover {
      background-color: ${theme.colors.grey_3};
    }

    &.active {
      border-bottom: 0px none ${theme.colors.white};
      border-top: 4px solid ${theme.colors.secondary};
      :hover {
        background-color: ${theme.colors.white};
      }
    }
  `;

  return (
    <FacetContainer
      // using css to fade and disable because FacetContainer uses over-flow which causes the DNAloader to move with scroll and not cover all facets
      css={loading ? facetContainerLoadingStyle : facetContainerDefaultStyle}
      theme={theme}
    >
      <SubMenu>
        {FEATURE_FACET_TABS_ENABLED && (
          <FacetRow>
            <Tabs
              value={currentTab}
              onChange={(e, value) => setTabs(value)}
              containerProps={containerProps}
            >
              <Tab value="clinical" label="Clinical Filters" css={tabStyles} />
              <Tab value="file" label="File Filters" css={tabStyles} />
            </Tabs>
          </FacetRow>
        )}
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
              {/* disabled for initial File Repo release */}
              {/* <FileSelectButton
                onFilesSelect={() => null} // TODO: implement upload action
                variant={BUTTON_VARIANTS.SECONDARY}
                size={BUTTON_SIZES.SM}
              >
                <Icon
                  name="upload"
                  height="12px"
                  fill={uploadDisabled ? 'white' : 'accent2_dark'}
                />
                {' Upload a list of ids'}
              </FileSelectButton> */}
            </div>
          </MenuItem>
        </FacetRow>
        {!loadingFieldDisplayNames &&
          presetFacets
            // Conditionally filter embargo_stage facet
            .filter((f) => {
              return f.facetPath === FileFacetPath.embargo_stage ? embargoStageEnabled : true;
            })
            //Conditionally filter release_state facet
            .filter((f) => {
              return f.facetPath === FileFacetPath.release_state ? releaseStateEnabled : true;
            })
            .filter((f) => {
              // show facets based on tabs if this feature is enabled.
              return FEATURE_FACET_TABS_ENABLED
                ? facetTabs[currentTab].includes(f.facetPath)
                : legacyDefaultTabs.includes(f.facetPath);
            })
            .map((facetDetails, index) => {
              const facetProps = commonFacetProps(facetDetails);
              const highlightCss = facetDetails.highlight
                ? css`
                    .FacetRow {
                      background-color: ${theme.colors.warning_4};
                    }
                    .FacetMenu {
                      background-color: ${theme.colors.warning_4};

                      .MenuItemContent:hover {
                        background-color: ${theme.colors.warning_3};
                      }

                      .StyledOption:hover {
                        background-color: ${theme.colors.warning_3};
                      }
                    }
                  `
                : css``;

              return (
                <FacetRow
                  key={`${facetDetails.name}-${index}`}
                  className={'FacetRow'}
                  css={highlightCss}
                >
                  {facetDetails.variant === 'Basic' && (
                    <Facet
                      {...facetProps}
                      key={facetDetails.name}
                      options={getOptions(facetDetails)}
                      countUnit={'files'}
                      onOptionToggle={onFacetOptionToggle(facetDetails)}
                      onSelectAllOptions={onFacetSelectAllOptionsToggle(facetDetails)}
                      parseDisplayValue={toDisplayValue}
                    />
                  )}
                  {facetDetails.variant === 'Number' && (
                    <NumberRangeFacet
                      {...facetProps}
                      onSubmit={onNumberRangeFacetSubmit(facetDetails)}
                      min={numberRangeFacetMin(facetDetails)}
                      max={numberRangeFacetMax(facetDetails)}
                    />
                  )}
                  {facetDetails.variant === 'Tooltip' && (
                    <TooltipFacet
                      {...facetProps}
                      key={facetDetails.name}
                      options={getOptions(facetDetails)}
                      countUnit={'files'}
                      onOptionToggle={onFacetOptionToggle(facetDetails)}
                      onSelectAllOptions={onFacetSelectAllOptionsToggle(facetDetails)}
                      parseDisplayValue={(key) => getDisplayName(facetDetails.esDocumentField, key)}
                      tooltipContent={getTooltipContent(facetDetails.facetPath)}
                    />
                  )}
                  {facetDetails.variant === 'ClinicalData' && (
                    <Facet
                      {...facetProps}
                      key={facetDetails.name}
                      options={getOptions(facetDetails)}
                      countUnit={'files'}
                      onOptionToggle={onFacetOptionToggle(facetDetails)}
                      onSelectAllOptions={onFacetSelectAllOptionsToggle(facetDetails)}
                      parseDisplayValue={clinicalDisplayValues}
                    />
                  )}
                </FacetRow>
              );
            })}
      </SubMenu>
      <Collapsible />
    </FacetContainer>
  );
};

export default FacetPanel;
