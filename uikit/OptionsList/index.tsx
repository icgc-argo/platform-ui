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
  isChecked: boolean;
};

type SelectableFilterOption = FilterOption & { isChecked: boolean };

const OptionsList: React.ComponentType<{
  options: Array<FilterOption>;
  searchQuery?: string;
  defaultRenderLimit?: number;
  countUnit?: string;
  onToggle: (facetValue: string[]) => void;
  onSelectAllValues: (allValuesSelected: boolean) => void;
}> = ({
  options,
  searchQuery = '',
  defaultRenderLimit = 5,
  countUnit,
  onToggle,
  onSelectAllValues,
}) => {
  const theme = useTheme();
  const [allOptionsVisible, setAllOptionsVisible] = React.useState(false);

  const queriedOptionKeys = React.useMemo(
    () =>
      options
        .filter(({ key }) => !searchQuery.length || key.search(new RegExp(searchQuery, 'i')) > -1)
        .map(option => option.key),
    [searchQuery],
  );

  const initialState = orderBy(options, ['doc_count'], ['desc']);
  const [optionStates, setOptionStates] = React.useState(initialState);

  // can changes be watched directly through options prop?
  React.useEffect(() => {
    setOptionStates(options);
  }, [options]);

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
        onToggle([option.key]);
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

  const allOptionsSelected: boolean = (searchQuery ? queriedOptions : options).every(
    opt => opt.isChecked,
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
      onToggle(queriedOptionKeys);
    } else {
      onSelectAllValues(allOptionsSelected);
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
