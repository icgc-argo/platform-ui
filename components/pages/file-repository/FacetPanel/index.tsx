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

import React, { useState, useEffect } from 'react';
import Facet from 'uikit/Facet';
import { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import FileSelectButton from 'uikit/FileSelectButton';
import { SubMenu } from 'uikit/SubMenu';
import { css, styled } from 'uikit';
import Typography from 'uikit/Typography';
import { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';
import { Collapsible } from 'uikit/PageLayout';
import NumberRangeFacet from 'uikit/Facet/NumberRangeFacet';
import useFiltersContext from '../hooks/useFiltersContext';
import {
  removeFilter,
  inCurrentFilters,
  toggleFilter,
  replaceFilter,
  currentFieldValue,
  toDisplayValue,
  getDisplayName,
  getTooltipContent,
} from '../utils';
import SqonBuilder from 'sqon-builder';
import {
  FileRepoFiltersType,
  ScalarFieldKeys,
  ArrayFieldKeys,
  CombinationKeys,
} from '../utils/types';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import FILE_REPOSITORY_FACETS_QUERY from './FILE_REPOSITORY_FACETS_QUERY.gql';
import {
  FacetDetails,
  FileFacetPath,
  FileRepoFacetsQueryData,
  FileRepoFacetsQueryVariables,
  GetAggregationResult,
  IdSearchQueryVariables,
  IdSearchQueryData,
} from './types';
import Container from 'uikit/Container';
import SEARCH_BY_QUERY from './SEARCH_BY_QUERY.gql';
import { concat, trim } from 'lodash';
import SearchResultsMenu from './SearchResultsMenu';
import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';
import { FileCentricDocumentField } from '../types';
import SelectedIds from './SelectedIds';
import useDebounce from '../hooks/useDebounce';
import useClickAway from 'uikit/utils/useClickAway';
import TooltipFacet from './TooltipFacet';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const createPresetFacets = (
  displayNames: ReturnType<typeof useFileCentricFieldDisplayName>['data'],
): Array<FacetDetails> => {
  const { FEATURE_ACCESS_FACET_ENABLED } = getConfig();
  const { token: egoJwt } = useAuthContext();

  return concat(
    FEATURE_ACCESS_FACET_ENABLED && !!egoJwt
      ? [
          {
            name: displayNames['release_stage'],
            facetPath: FileFacetPath.release_stage,
            variant: 'Tooltip',
            esDocumentField: FileCentricDocumentField.release_stage,
          } as FacetDetails,
        ]
      : [],
    [
      {
        name: displayNames['study_id'],
        facetPath: FileFacetPath.study_id,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField.study_id,
      },
      {
        name: displayNames['donors.specimens.specimen_type'],
        facetPath: FileFacetPath.donors__specimens__specimen_type,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['donors.specimens.specimen_type'],
      },
      {
        name: displayNames['donors.specimens.specimen_tissue_source'],
        facetPath: FileFacetPath.donors__specimens__specimen_tissue_source,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['donors.specimens.specimen_tissue_source'],
      },
      {
        name: displayNames['analysis.experiment.experimental_strategy'],
        facetPath: FileFacetPath.analysis__experiment__experimental_strategy,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['analysis.experiment.experimental_strategy'],
      },
      {
        name: displayNames['data_category'],
        facetPath: FileFacetPath.data_category,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['data_category'],
      },
      {
        name: displayNames['data_type'],
        facetPath: FileFacetPath.data_type,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['data_type'],
      },
      {
        name: displayNames['file_type'],
        facetPath: FileFacetPath.file_type,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField.file_type,
      },
      {
        name: displayNames['file_access'],
        facetPath: FileFacetPath.file_access,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField.file_access,
      },
      {
        name: displayNames['analysis.workflow.workflow_name'],
        facetPath: FileFacetPath.analysis__workflow__workflow_name,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['analysis.workflow.workflow_name'],
      },
      {
        name: displayNames['analysis_tools'],
        facetPath: FileFacetPath.analysis_tools,
        variant: 'Basic',
        esDocumentField: FileCentricDocumentField['analysis_tools'],
      },
    ],
  );
};

const fileIDSearch: FacetDetails = {
  name: 'Search Files',
  facetPath: FileFacetPath.object_id,
  variant: 'Other',
  esDocumentField: FileCentricDocumentField.object_id,
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

const useIdSearchQuery = (
  searchValue: string,
  excludedIds: string[],
): { data: IdSearchQueryData; loading: boolean } => {
  return useQuery<IdSearchQueryData, IdSearchQueryVariables>(SEARCH_BY_QUERY, {
    skip: !searchValue,
    variables: {
      filters: {
        op: 'and',
        content: [
          {
            op: 'filter' as ArrayFieldKeys,
            content: {
              value: `*${searchValue.toLowerCase()}*`,
              fields: [
                'file_autocomplete.analyzed',
                'file_autocomplete.lowercase',
                'file_autocomplete.prefix',
              ],
            },
          },
          {
            op: 'not' as CombinationKeys,
            content: [
              {
                op: 'in' as ArrayFieldKeys,
                content: {
                  field: FileCentricDocumentField['object_id'],
                  value: excludedIds,
                },
              },
            ],
          },
        ],
      },
    },
  });
};

export default () => {
  const {
    data: fieldDisplayNames,
    loading: loadingFieldDisplayNames,
  } = useFileCentricFieldDisplayName();
  const presetFacets = createPresetFacets(fieldDisplayNames);
  const [expandedFacets, setExpandedFacets] = React.useState(
    [...presetFacets, fileIDSearch].map((facet) => facet.facetPath),
  );
  const [searchOpen, setSearchOpen] = React.useState(false);
  const uploadDisabled = false; // TODO: implement correctly
  const theme = useTheme();
  const { filters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();

  const [aggregations, setAggregations] = React.useState({});

  const { data, loading } = useFileFacetQuery(filters, {
    onCompleted: (data) => {
      setAggregations(data ? data.file.aggregations : {});
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

  const [searchQuery, setSearchQuery] = React.useState('');

  const excludedIds = (currentFieldValue({
    filters,
    dotField: FileCentricDocumentField['object_id'],
    op: 'in',
  }) || []) as Array<string>;

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  //mapper <====>

  /**
   * Order release stage options
   * Removes invalid keys eg. '__missing__'
   */
  const orderReleaseStage = (options: FilterOption[]) => {
    const order = ['OWN_PROGRAM', 'FULL_PROGRAMS', 'ASSOCIATE_PROGRAMS', 'PUBLIC_QUEUE', 'PUBLIC'];
    return order.map((order) => options.find((option) => option.key === order));
  };

  // function to manipulate options values eg. to preserve order
  const prepareOptions = (
    options: FilterOption[],
    prepare: (options: FilterOption[]) => FilterOption[],
  ) => prepare(options);

  const getOptions: GetAggregationResult = (facet) => {
    return (aggregations[facet.facetPath] || { buckets: [] }).buckets.map((bucket) => ({
      ...bucket,
      isChecked: inCurrentFilters({
        currentFilters: filters,
        value: bucket.key,
        dotField: facet.esDocumentField,
      }),
    }));
  };

  const { data: idSearchData, loading: idSearchLoading } = useIdSearchQuery(
    debouncedSearchTerm,
    excludedIds,
  );

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

  const commonFacetProps = (facetDetails: FacetDetails) => ({
    onClick: (e) => {
      clickHandler(facetDetails);
    },
    isExpanded: expandedFacets.includes(facetDetails.facetPath),
    subMenuName: facetDetails.name,
    facetPath: facetDetails.facetPath,
  });

  const onFacetOptionToggle: (
    facetDetails: FacetDetails,
  ) => React.ComponentProps<typeof Facet>['onOptionToggle'] = (facetDetails) => {
    return (facetValue) => {
      const currentValue = SqonBuilder.has(facetDetails.esDocumentField, facetValue).build();
      replaceAllFilters(toggleFilter(currentValue, filters));
    };
  };
  const onFacetSelectAllOptionsToggle: (
    facetDetails: FacetDetails,
  ) => React.ComponentProps<typeof Facet>['onSelectAllOptions'] = (facetDetails) => {
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
  ) => React.ComponentProps<typeof NumberRangeFacet>['onSubmit'] = (facetDetails) => {
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
  ) => React.ComponentProps<typeof NumberRangeFacet>['min'] = (facetDetails) => {
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
  ) => React.ComponentProps<typeof NumberRangeFacet>['max'] = (facetDetails) => {
    return (
      currentFieldValue({
        filters,
        dotField: facetDetails.name,
        op: '<=',
      }) || ''
    ).toString();
  };

  const facetContianerLoadingStyle = css`
    opacity: 0.5;
    pointer-events: 'none';
  `;

  const facetContainerDefaultStyle = css`
    opacity: 1;
    pointer-events: 'auto';
  `;
  const onRemoveSelectedId = (id: string) => {
    const idFilterToRemove = SqonBuilder.has(FileCentricDocumentField['object_id'], id).build();
    replaceAllFilters(toggleFilter(idFilterToRemove, filters));
  };

  const searchRef = React.createRef<HTMLDivElement>();
  useClickAway({
    domElementRef: searchRef,
    onClickAway: () => setSearchOpen(false),
    onElementClick: () => {
      setSearchOpen(true);
    },
  });

  return (
    <FacetContainer
      // using css to fade and disable because FacetContainer uses over-flow which causes the DNAloader to move with scroll and not cover all facets
      css={loading ? facetContianerLoadingStyle : facetContainerDefaultStyle}
      theme={theme}
    >
      <SubMenu>
        <FacetRow>
          <Typography
            as="span"
            css={css`
              font-size: 16px;
              padding: 8px 14px;
            `}
            color={theme.colors.primary}
          >
            Filters
          </Typography>
        </FacetRow>
        <FacetRow
          css={css`
            border-top: 1px solid ${theme.colors.grey_2};
          `}
        >
          <MenuItem
            onClick={(e) => clickHandler(fileIDSearch)}
            selected={expandedFacets.includes(fileIDSearch.facetPath)}
            className="FacetMenu"
            content={fileIDSearch.name}
            chevronOnLeftSide={true}
            isFacetVariant={true}
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
                align-items: center;
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
                  placeholder="e.g. DO9182, Sa1246.bam..."
                  preset="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(trim(e.target.value));
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
                      searchData={idSearchData}
                      isLoading={idSearchLoading}
                      onSelect={(value) => {
                        setFilterFromFieldAndValue({
                          field: FileCentricDocumentField['object_id'],
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
          presetFacets.map((facetDetails) => {
            const facetProps = commonFacetProps(facetDetails);

            return (
              <FacetRow key={facetDetails.name}>
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
                    parseDisplayValue={(key) => getDisplayName(facetDetails.name, key)}
                    tooltipContent={getTooltipContent(facetDetails.name)}
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
