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

export type FilterOption = {
  key: string;
  doc_count: number;
};

type SelectableFilterOption = FilterOption & { isChecked: boolean };

const OptionsList: React.ComponentType<{
  options: Array<FilterOption>;
  searchQuery?: string;
  defaultRenderLimit?: number;
  countUnit?: string;
}> = ({ options, searchQuery = '', defaultRenderLimit = 5, countUnit }) => {
  const theme = useTheme();
  const [allOptionsVisible, setAllOptionsVisible] = React.useState(false);

  const queriedOptionKeys = React.useMemo(
    () =>
      options
        .filter(({ key }) => !searchQuery.length || key.search(new RegExp(searchQuery, 'i')) > -1)
        .map(option => option.key),
    [searchQuery],
  );

  const [selectAll, setSelectAll] = React.useState(true);

  const initalStates = orderBy(
    options.map(option => {
      return { ...option, isChecked: false };
    }),
    ['doc_count'],
    ['desc'],
  );

  const [optionStates, setOptionStates] = React.useState(initalStates);

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
      onClick={e => {
        e.stopPropagation();
        toggleOption(option.key);
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
          onChange={e => null}
          aria-label={`${option.key}-facet`}
          size="sm"
        />
        <Typography
          variant={'data'}
          css={css`
            margin: 0px 0px 0px 7px;
            list-style-type: none;
          `}
          as={'li'}
        >
          {option.key}
        </Typography>
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

  const toggleOption = (optionKey: string) => {
    const targetState = optionStates.find(state => state.key === optionKey);
    const updatedStates = [
      ...optionStates.filter(state => state !== targetState),
      { ...targetState, isChecked: !targetState.isChecked },
    ];
    setOptionStates(updatedStates);
  };

  /* %%%%%%%%%%%%%%%%%% ~ Option Rendering Logic ~ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  const sortedOptions = React.useMemo(() => orderBy(optionStates, ['isChecked'], ['desc']), [
    optionStates,
  ]);

  const selectedOptions = React.useMemo(() => optionStates.filter(option => option.isChecked), [
    optionStates,
  ]);

  const queriedOptions = React.useMemo(
    () =>
      sortedOptions.filter(
        option => queriedOptionKeys.includes(option.key) && !selectedOptions.includes(option),
      ),
    [searchQuery, sortedOptions],
  );

  const defaultNonSelectedOptions = React.useMemo(
    () => sortedOptions.slice(0, defaultRenderLimit).filter(option => !option.isChecked),
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
      setOptionStates(
        optionStates.map(state =>
          queriedOptionKeys.includes(state.key) ? { ...state, isChecked: selectAll } : { ...state },
        ),
      );
    } else {
      if (selectAll) {
        setOptionStates(
          sortedOptions.map(state => {
            return { ...state, isChecked: selectAll };
          }),
        );
      } else setOptionStates(initalStates);
      setSelectAll(!selectAll);
    }
  };
  const numberofMoreOptions = options.length - optionsToShow.length;

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
          {optionsToShow.map(option => (
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
          selectAllState={selectAll}
          toggleVisiblityCss={
            searchQuery
              ? 'hidden'
              : numberofMoreOptions === 0
              ? allOptionsVisible
                ? 'visible'
                : 'hidden'
              : 'visible'
          }
          toggleText={allOptionsVisible ? `Less` : `${numberofMoreOptions} More`}
          moreOptionsAvailable={!allOptionsVisible}
        />
      )}
    </>
  );
};

export default OptionsList;
