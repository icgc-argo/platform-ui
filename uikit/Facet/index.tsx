import React from 'react';
import { MenuItem } from '../SubMenu';
import Checkbox from 'uikit/form/Checkbox';
import { css } from '@emotion/core';
import Tag from 'uikit/Tag';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import orderBy from 'lodash/orderBy';

import ViewAmountController from '../ViewAmountController';

export type FilterOption = {
  key: string;
  doc_count: number;
};

type SelectableFilterOption = FilterOption & { isChecked: boolean };

const Facet = ({ subMenuName, options }: { subMenuName: string; options: Array<FilterOption> }) => {
  const theme = useTheme();
  const [allOptionsVisible, setAllOptionsVisible] = React.useState(false);

  const [searchQueryState, setSearchQueryState] = React.useState('');
  const queriedOptionKeys = options
    .filter(
      ({ key }) => !searchQueryState.length || key.search(new RegExp(searchQueryState, 'i')) > -1,
    )
    .map(option => option.key);

  const [selectAll, setSelectAll] = React.useState(true);

  const initalStates = options.map(option => {
    return { ...option, isChecked: false };
  });

  const [optionStates, setOptionStates] = React.useState<Array<SelectableFilterOption>>(
    initalStates,
  );

  const defaultRenderLimit = 5;

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

  const [visibleOptions, setVisibleOptions] = React.useState([]);

  const toggleOption = (optionKey: string) => {
    setOptionStates(
      optionStates.map(state => ({
        ...state,
        isChecked: state.key === optionKey ? !state.isChecked : state.isChecked,
      })),
    );
  };

  const renderOptions = (arr: Array<SelectableFilterOption>) =>
    arr.map(inputOption => <StyledOption option={inputOption} />);

  React.useEffect(() => {
    const sortedOptions = orderBy(optionStates, ['isChecked', 'key'], ['desc', 'asc']);

    const selectedOptions = optionStates.filter(option => option.isChecked);

    if (searchQueryState) {
      const queriedOptions = sortedOptions.filter(
        option => queriedOptionKeys.includes(option.key) && !selectedOptions.includes(option),
      );
      setVisibleOptions(renderOptions(selectedOptions.concat(queriedOptions)));
    } else {
      if (allOptionsVisible) {
        setVisibleOptions(renderOptions(sortedOptions));
      } else {
        const defaultNonSelectedOptions = sortedOptions
          .slice(0, defaultRenderLimit)
          .filter(option => !option.isChecked);
        setVisibleOptions(renderOptions(selectedOptions.concat(defaultNonSelectedOptions)));
      }
    }
  }, [allOptionsVisible, searchQueryState, optionStates]);

  const numberofMoreOptions = options.length - visibleOptions.length;

  return (
    <>
      <MenuItem
        content={subMenuName}
        chevronOnLeftSide={true}
        isFacetVariant={true}
        searchStateParams={{ query: searchQueryState, querySetter: setSearchQueryState }}
        css={css`
          width: 300px;
        `}
      >
        {
          <div
            css={css`
              border-top: 1px solid;
              border-color: ${theme.colors.grey_2};
            `}
          >
            {visibleOptions}
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
      </MenuItem>
      <div>
        {JSON.stringify(optionStates.filter(state => state.isChecked).map(state => state.key))}
      </div>
    </>
  );
};

export default Facet;
