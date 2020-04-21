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
}> = ({ options, searchQuery = '', defaultRenderLimit = 5 }) => {
  const theme = useTheme();
  const [allOptionsVisible, setAllOptionsVisible] = React.useState(false);

  const queriedOptionKeys = options
    .filter(({ key }) => !searchQuery.length || key.search(new RegExp(searchQuery, 'i')) > -1)
    .map(option => option.key);

  const [selectAll, setSelectAll] = React.useState(true);

  const initalStates = options.map(option => {
    return { ...option, isChecked: false };
  });

  const [optionStates, setOptionStates] = React.useState(initalStates);

  const StyledOption: React.ComponentType<{
    option: SelectableFilterOption;
  }> = ({ option }) => (
    <MenuItem
      key={option.key}
      css={css`
        height: 35px;
      `}
      level={1}
      selected={false}
      onClick={e => {
        toggleOption(option.key);
      }}
      content={
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
          `}
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
              onChange={e => console.log(e)}
              aria-label={`${option.key}-facet`}
            />
            <Typography
              variant={'subtitle2'}
              css={css`
                margin: 0px 0px 0px 7px;
              `}
            >
              {option.key}
            </Typography>
          </div>

          <Tag variant={'NEUTRAL'}>{option.doc_count}</Tag>
        </div>
      }
    />
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
  const sortedOptions = React.useMemo(
    () => orderBy(optionStates, ['isChecked', 'key'], ['desc', 'asc']),
    [optionStates],
  );

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
          {optionsToShow.map(option => (
            <StyledOption key={option.key} option={option} />
          ))}
        </div>
      }
      <ViewAmountController
        selectAllHander={() => {
          setOptionStates(
            optionStates.map(state => {
              return { ...state, isChecked: selectAll };
            }),
          );
          setSelectAll(!selectAll);
        }}
        moreToggleHandler={() => {
          setAllOptionsVisible(!allOptionsVisible);
        }}
        selectAllState={selectAll}
        toggleVisiblityCss={
          numberofMoreOptions === 0 ? (allOptionsVisible ? 'visible' : 'hidden') : 'visible'
        }
        toggleText={allOptionsVisible ? `Less` : `${numberofMoreOptions} More`}
        moreOptionsAvailable={!allOptionsVisible}
      />
    </>
  );
};

export default OptionsList;
