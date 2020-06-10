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
import mockFacetData from './mockFacetData';
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
} from '../utils';
import SqonBuilder from 'sqon-builder';
import { FileRepoFiltersType, ScalarFieldKeys } from '../utils/types';
import { FilterOption } from 'uikit/OptionsList';

const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type FacetDetails = {
  name: string;
  variant: 'Basic' | 'Number' | 'Other';
};

const presetFacets: Array<FacetDetails> = [
  { name: 'program', variant: 'Basic' },
  { name: 'primary site', variant: 'Basic' },
  { name: 'age at diagnosis', variant: 'Number' },
  { name: 'vital status', variant: 'Basic' },
  { name: 'gender', variant: 'Basic' },
  { name: 'experimental strategy', variant: 'Basic' },
  { name: 'data type', variant: 'Basic' },
];

const fileIDSearch: FacetDetails = { name: 'Search Files by ID', variant: 'Other' };
const FacetContainer = styled('div')`
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

export default () => {
  const [expandedFacets, setExpandedFacets] = React.useState(concat(presetFacets, fileIDSearch));
  const uploadDisabled = false; // TODO: implement correctly
  const theme = useTheme();
  const { filters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();
  const clickHandler = (targetFacet: FacetDetails) => {
    if (expandedFacets.includes(targetFacet)) {
      setExpandedFacets(expandedFacets.filter(facet => facet !== targetFacet));
    } else {
      setExpandedFacets(expandedFacets.concat(targetFacet));
    }
  };
  const [queriedFileIDs, setQueriedFileIDs] = React.useState('');
  const getOptions = (facetType: string): FilterOption[] => {
    return mockFacetData[facetType].map(d => {
      return {
        ...d,
        isChecked: inCurrentFilters({
          currentFilters: filters,
          value: d.key,
          dotField: facetType,
        }),
      };
    });
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
  return (
    <FacetContainer>
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
            onClick={e => clickHandler(fileIDSearch)}
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
              onClick={e => e.stopPropagation()}
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
                onChange={e => {
                  setQueriedFileIDs(e.target.value);
                }}
              />
              <FileSelectButton
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
              </FileSelectButton>
            </div>
          </MenuItem>
        </FacetRow>
        {presetFacets.map(type => {
          const props = {
            onClick: e => {
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
                  options={getOptions(type.name)}
                  countUnit={'files'}
                  onOptionToggle={facetValue => {
                    const currentValue = SqonBuilder.has(type.name, facetValue).build();
                    replaceAllFilters(toggleFilter(currentValue, filters));
                  }}
                  onSelectAllOptions={allOptionsSelected => {
                    if (allOptionsSelected) {
                      const updatedFilters = removeFilter(
                        type.name,
                        filters,
                      ) as FileRepoFiltersType;
                      replaceAllFilters(updatedFilters);
                    } else {
                      setFilterFromFieldAndValue({
                        field: type.name,
                        value: mockFacetData[type.name].map(v => v.key),
                      });
                    }
                  }}
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
