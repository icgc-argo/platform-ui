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
import Checkbox from 'uikit/form/Checkbox';
import { css } from '@emotion/core';
import Tag from 'uikit/Tag';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import orderBy from 'lodash/orderBy';
import concat from 'lodash/concat';

import ViewAmountController from '../OptionsList/ViewAmountController';
import Tooltip from 'uikit/Tooltip';

export type FilterOption = {
  key: string;
  doc_count: number;
  isChecked: boolean;
};

type SelectableFilterOption = FilterOption & { isChecked: boolean };

const MAX_CHAR_LENGTH = 28;

const OptionsList: React.ComponentType<{
  options: Array<FilterOption>;
  searchQuery?: string;
  defaultRenderLimit?: number;
  countUnit?: string;
  onOptionToggle: (facetValue: string[] | string) => void;
  onSelectAllOptions: (allOptionsSelected: boolean) => void;
  parseDisplayValue: (inputValue: string) => string;
}> = ({
  options,
  searchQuery = '',
  defaultRenderLimit = 5,
  countUnit,
  onOptionToggle,
  onSelectAllOptions,
  parseDisplayValue = (value) => value,
}) => {
  const theme = useTheme();
  const [allOptionsVisible, setAllOptionsVisible] = React.useState(false);

  const queriedOptionKeys = React.useMemo(
    () =>
      options
        .filter(({ key }) => !searchQuery.length || key.search(new RegExp(searchQuery, 'i')) > -1)
        .map((option) => option.key),
    [searchQuery],
  );

  const StyledOption: React.ComponentType<{
    option: SelectableFilterOption;
  }> = ({ option }) => (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        height: 25px;
        padding: 2px 12px;
        width: calc(100% - (2 * 12px));
        &:hover {
          background: ${theme.colors.grey_3};
        }
        cursor: pointer;
      `}
      key={option.key}
      onClick={(e) => {
        e.stopPropagation();
        onOptionToggle(option.key);
      }}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Checkbox
          checked={option.isChecked}
          value={option.key}
          onChange={(e) => null}
          aria-label={`${option.key}-facet`}
          size="sm"
        />
        <Tooltip
          html={parseDisplayValue(option.key)}
          disabled={parseDisplayValue(option.key).length <= MAX_CHAR_LENGTH}
        >
          <Typography
            variant={'data'}
            css={css`
              margin: 0px 0px 0px 7px;
              list-style-type: none;
              display: inline-block;
              max-width: 185px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              vertical-align: middle;
              line-height: 20px;
            `}
            as={'li'}
          >
            {parseDisplayValue(option.key)}
          </Typography>
        </Tooltip>
      </div>

      <Tag
        variant={'NEUTRAL'}
        css={css`
          height: 18px;

          font-size: 10px;
          align-self: center;
        `}
      >
        {option.doc_count}
      </Tag>
    </div>
  );

  /* %%%%%%%%%%%%%%%%%% ~ Option Rendering Logic ~ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  const sortedOptions = React.useMemo(() => orderBy(options, ['isChecked'], ['desc']), [options]);

  const selectedOptions = React.useMemo(() => options.filter((option) => option.isChecked), [
    options,
  ]);

  const queriedOptions = React.useMemo(
    () =>
      sortedOptions.filter(
        (option) => queriedOptionKeys.includes(option.key) && !selectedOptions.includes(option),
      ),
    [searchQuery, sortedOptions],
  );

  const allOptionsSelected: boolean = (searchQuery ? queriedOptions : options).every(
    (opt) => opt.isChecked,
  );

  const defaultNonSelectedOptions = React.useMemo(
    () => sortedOptions.slice(0, defaultRenderLimit).filter((option) => !option.isChecked),
    [sortedOptions],
  );

  const optionsToShow = !!searchQuery
    ? concat(selectedOptions, queriedOptions)
    : allOptionsVisible
    ? sortedOptions
    : concat(selectedOptions, defaultNonSelectedOptions);

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  const onSelectAll = () => {
    if (searchQuery) {
      onOptionToggle(queriedOptionKeys);
    } else {
      onSelectAllOptions(allOptionsSelected);
    }
  };
  const numberOfMoreOptions = options.length - optionsToShow.length;

  return (
    <>
      {
        <div
          css={css`
            border-top: 1px solid;
            border-color: ${theme.colors.grey_2};
          `}
        >
          {countUnit && (
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                padding: 4px 12px 0px 12px;
              `}
            >
              <Typography variant={'caption'} color={theme.colors.grey}>
                # {countUnit}
              </Typography>
            </div>
          )}
          {optionsToShow.map((option) => (
            <StyledOption key={option.key} option={option} />
          ))}
        </div>
      }
      {!!options.length && (
        <ViewAmountController
          selectAllHander={onSelectAll}
          moreToggleHandler={() => {
            setAllOptionsVisible(!allOptionsVisible);
          }}
          selectAllState={allOptionsSelected}
          toggleVisiblityCss={
            searchQuery
              ? 'hidden'
              : numberOfMoreOptions === 0
              ? allOptionsVisible
                ? 'visible'
                : 'hidden'
              : 'visible'
          }
          toggleText={allOptionsVisible ? `Less` : `${numberOfMoreOptions} More`}
          moreOptionsAvailable={!allOptionsVisible}
        />
      )}
    </>
  );
};

export default OptionsList;
