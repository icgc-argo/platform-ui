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
import { capitalize } from 'global/utils/stringUtils';
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
import concat from 'lodash/concat';
import useFiltersContext from '../hooks/useFiltersContext';
import {
  removeFilter,
  inCurrentFilters,
  toggleFilter,
  replaceFilter,
  currentFieldValue,
  toDisplayValue,
  getFiltersValue,
} from '../utils';
import SqonBuilder from 'sqon-builder';
import { FileRepoFiltersType, ScalarFieldKeys } from '../utils/types';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import FILE_REPOSITORY_FACETS_QUERY from './FILE_REPOSITORY_FACETS_QUERY.gql';
import {
  FacetDetails,
  FileFacetPath,
  FileRepoFacetsQueryData,
  FileRepoFacetsQueryVariables,
  GetAggregationResult,
} from './types';
import { FileCentricDocumentField } from '../FileTable/types';
import Container from 'uikit/Container';
import SEARCH_BY_QUERY from './SEARCH_BY_QUERY.gql';
import { trim } from 'lodash';
import { Gap, OptionsWrapper } from 'uikit/form/MultiSelect';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const presetFacets: Array<FacetDetails> = [
  {
    name: 'program id',
    facetPath: FileFacetPath.study_id,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.study_id,
  },
  {
    name: 'gender',
    facetPath: FileFacetPath.donors__gender,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField['donors.gender'],
  },
  {
    name: 'experimental strategy',
    facetPath: FileFacetPath.analysis__experiment__experimental_strategy,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField['analysis.experiment.experimental_strategy'],
  },
  {
    name: 'data type',
    facetPath: FileFacetPath.data_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.data_type,
  },
  {
    name: 'file type',
    facetPath: FileFacetPath.file_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.file_type,
  },
  {
    name: 'variant class',
    facetPath: FileFacetPath.variant_class,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.variant_class,
  },
  {
    name: 'file access',
    facetPath: FileFacetPath.file_access,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.file_access,
  },
];

// TODO: implement correctly. probably need extended/different type to account for multiple search fields
const fileIDSearch: FacetDetails = {
  name: 'Search Files by ID',
  facetPath: FileFacetPath.study_id,
  variant: 'Other',
  esDocumentField: FileCentricDocumentField.study_id,
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

// from https://usehooks.com/useDebounce/
const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
};

const useIdSearchQuery = (searchValue, excludedIds) => {
  return useQuery<any, any>(SEARCH_BY_QUERY, {
    skip: searchValue.length <= 1,
    variables: {
      filters: {
        op: 'and',
        content: [
          {
            op: 'filter',
            content: {
              value: `*${searchValue}*`,
              fields: ['file_autocomplete'],
            },
          },
          {
            op: 'not',
            content: [
              {
                op: 'in',
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
  const [expandedFacets, setExpandedFacets] = React.useState(concat(presetFacets, fileIDSearch));
  const uploadDisabled = false; // TODO: implement correctly
  const theme = useTheme();
  const { filters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();

  const { data, loading } = useFileFacetQuery(filters);
  const aggregations = data ? data.file.aggregations : {};

  const clickHandler = (targetFacet: FacetDetails) => {
    if (expandedFacets.includes(targetFacet)) {
      setExpandedFacets(expandedFacets.filter((facet) => facet !== targetFacet));
    } else {
      setExpandedFacets(expandedFacets.concat(targetFacet));
    }
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const excludedIds = currentFieldValue({
    filters,
    dotField: FileCentricDocumentField['object_id'],
    op: 'in',
  });

  const debouncedSearchTerm = useDebounce(searchQuery, 500);
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

  const ResultsMenu = () => {
    if (idSearchLoading) {
      return (
        <div
          css={css`
            position: absolute;
            top: 37px;
            left: 12px;
            background-color: white;
            width: 215px;
            padding: 5px 5px;
            border: 1px solid lightgray;
            border-radius: 8px;
          `}
        >
          <Typography
            css={css`
              font-style: italic;
              display: flex;
              align-items: center;
              margin: 0;
            `}
          >
            <Icon
              name="spinner"
              css={css`
                margin-right: 10px;
              `}
            />
            Loading results...
          </Typography>
        </div>
      );
    } else {
      if (idSearchData && idSearchData.file.hits.total === 0) {
        return (
          <div>
            <Typography
              css={css`
                font-style: italic;
              `}
            >
              No results found
            </Typography>
          </div>
        );
      } else {
        return (
          <div
            css={css`
              position: absolute;
              top: 40px;
              left: 15px;
              z-index: 10;
              background-color: white;
              width: 225px;
              padding: 5px 5px;
            `}
          >
            {idSearchData &&
              idSearchData.file.hits.edges.slice(0, 5).map(({ node }) => {
                return (
                  <div
                    onClick={() =>
                      setFilterFromFieldAndValue({
                        field: FileCentricDocumentField['object_id'],
                        value: node.object_id,
                      })
                    }
                    key={node.object_id}
                  >
                    <Typography
                      bold
                      css={css`
                        font-size: 12px;
                        padding: 2px 3px;
                        margin: 0;
                      `}
                    >
                      {node.object_id}
                    </Typography>
                    <Typography
                      css={css`
                        font-size: 9px;
                        word-break: break-word;
                        margin: 0;
                      `}
                    >
                      {node.file.name}
                    </Typography>
                  </div>
                );
              })}
          </div>
        );
      }
    }
  };

  return (
    <FacetContainer loading={loading} theme={theme}>
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
            selected={expandedFacets.includes(fileIDSearch)}
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
                &:hover {
                  background-color: ${theme.colors.grey_3};
                }
                position: relative;
              `}
            >
              <Input
                size="sm"
                aria-label="search-for-files"
                placeholder="e.g. FL9998, DO9898…"
                preset="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(trim(e.target.value));
                }}
                css={css`
                  z-index: 5;
                `}
              />

              {searchQuery && searchQuery.length >= 2 ? <ResultsMenu /> : null}
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
        {presetFacets.map((type) => {
          const props = {
            onClick: (e) => {
              clickHandler(type);
            },
            isExpanded: expandedFacets.includes(type),
            subMenuName: capitalize(type.name),
          };

          return (
            <FacetRow key={type.name}>
              {type.variant === 'Basic' && (
                <Facet
                  {...props}
                  options={getOptions(type)}
                  countUnit={'files'}
                  onOptionToggle={(facetValue) => {
                    const currentValue = SqonBuilder.has(type.esDocumentField, facetValue).build();
                    replaceAllFilters(toggleFilter(currentValue, filters));
                  }}
                  onSelectAllOptions={(allOptionsSelected) => {
                    if (allOptionsSelected) {
                      const updatedFilters = removeFilter(
                        type.esDocumentField,
                        filters,
                      ) as FileRepoFiltersType;
                      replaceAllFilters(updatedFilters);
                    } else {
                      setFilterFromFieldAndValue({
                        field: type.esDocumentField,
                        value: aggregations[type.facetPath].buckets.map((v) => v.key),
                      });
                    }
                  }}
                  parseDisplayValue={toDisplayValue}
                />
              )}
              {type.variant === 'Number' && (
                <NumberRangeFacet
                  {...props}
                  onSubmit={(min, max) => {
                    const newFilters = getRangeFilters(type.name, min, max);
                    // remove any existing fields for this type first
                    const withPreviousFieldRemoved = removeFilter(
                      type.name,
                      filters,
                    ) as FileRepoFiltersType;
                    replaceAllFilters(replaceFilter(newFilters, withPreviousFieldRemoved));
                  }}
                  min={(
                    currentFieldValue({
                      filters,
                      dotField: type.name,
                      op: '>=',
                    }) || ''
                  ).toString()}
                  max={(
                    currentFieldValue({
                      filters,
                      dotField: type.name,
                      op: '<=',
                    }) || ''
                  ).toString()}
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
