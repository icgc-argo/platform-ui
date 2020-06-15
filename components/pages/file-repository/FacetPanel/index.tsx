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
import concat from 'lodash/concat';
import useFiltersContext from '../hooks/useFiltersContext';
import {
  removeFilter,
  inCurrentFilters,
  toggleFilter,
  replaceFilter,
  currentFieldValue,
  toDisplayValue,
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
import useFileCentricFieldDisplayName from '../hooks/useFileCentricFieldDisplayName';
import DnaLoader from 'uikit/DnaLoader';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const createPresetFacets = (
  displayNames: ReturnType<typeof useFileCentricFieldDisplayName>['data'],
): Array<FacetDetails> => [
  {
    name: displayNames['study_id'],
    facetPath: FileFacetPath.study_id,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.study_id,
  },
  {
    name: displayNames['donors.gender'],
    facetPath: FileFacetPath.donors__gender,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField['donors.gender'],
  },
  {
    name: displayNames['analysis.experiment.experimental_strategy'],
    facetPath: FileFacetPath.analysis__experiment__experimental_strategy,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField['analysis.experiment.experimental_strategy'],
  },
  {
    name: displayNames['data_type'],
    facetPath: FileFacetPath.data_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.data_type,
  },
  {
    name: displayNames['file_type'],
    facetPath: FileFacetPath.file_type,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.file_type,
  },
  {
    name: displayNames['variant_class'],
    facetPath: FileFacetPath.variant_class,
    variant: 'Basic',
    esDocumentField: FileCentricDocumentField.variant_class,
  },
  {
    name: displayNames['file_access'],
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

export default () => {
  const {
    data: fieldDisplayNames,
    loading: loadingFieldDisplayNames,
  } = useFileCentricFieldDisplayName();
  const presetFacets = createPresetFacets(fieldDisplayNames);
  const [expandedFacets, setExpandedFacets] = React.useState(
    [...presetFacets, fileIDSearch].map((facet) => facet.facetPath),
  );
  const uploadDisabled = false; // TODO: implement correctly
  const theme = useTheme();
  const { filters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();

  const { data, loading } = useFileFacetQuery(filters);
  const aggregations = data ? data.file.aggregations : {};

  const clickHandler = (targetFacet: FacetDetails) => {
    const targetFacetPath = targetFacet.facetPath;
    if (expandedFacets.includes(targetFacetPath)) {
      setExpandedFacets(expandedFacets.filter((facet) => facet !== targetFacetPath));
    } else {
      setExpandedFacets(expandedFacets.concat(targetFacetPath));
    }
  };
  const [queriedFileIDs, setQueriedFileIDs] = React.useState('');

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
                &:hover {
                  background-color: ${theme.colors.grey_3};
                }
              `}
            >
              <Input
                size="sm"
                aria-label="search-for-files"
                css={css`
                  ${css(theme.typography.data as any)}
                  margin-bottom: 6px;
                `}
                placeholder="e.g. FL9998, DO9898…"
                preset="search"
                value={queriedFileIDs}
                onChange={(e) => {
                  setQueriedFileIDs(e.target.value);
                }}
              />
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
          presetFacets.map((type) => {
            const facetProps = commonFacetProps(type);

            return (
              <FacetRow key={type.name}>
                {type.variant === 'Basic' && (
                  <Facet
                    {...facetProps}
                    options={getOptions(type)}
                    countUnit={'files'}
                    onOptionToggle={onFacetOptionToggle(type)}
                    onSelectAllOptions={onFacetSelectAllOptionsToggle(type)}
                    parseDisplayValue={toDisplayValue}
                  />
                )}
                {type.variant === 'Number' && (
                  <NumberRangeFacet
                    {...facetProps}
                    onSubmit={onNumberRangeFacetSubmit(type)}
                    min={numberRangeFacetMin(type)}
                    max={numberRangeFacetMax(type)}
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
