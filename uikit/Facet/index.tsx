import React from 'react';
import { MenuItem } from '../SubMenu';
import Icon from 'uikit/Icon';
import Checkbox from 'uikit/form/Checkbox';
import { css } from '@emotion/core';
import Tag from 'uikit/Tag';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import orderBy from 'lodash/orderBy';

import HyperLink from 'uikit/Link';

export type FilterOption = {
  name: string;
  quantity: number;
};
const Facet = ({ subMenuName, options }: { subMenuName: string; options: Array<FilterOption> }) => {
  const [allOptionsVisible, setAllOptionsVisible] = React.useState(false);

  const [searchQueryState, setSearchQueryState] = React.useState('');
  const queriedOptionNames = options
    .filter(
      ({ name }) => !searchQueryState.length || name.search(new RegExp(searchQueryState, 'i')) > -1,
    )
    .map(option => option.name);

  const [selectedFacetOptions, setSelectedFacetOptions] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(true);

  const defaultRenderLimit = 5;

  const buildStyledOption = (option: FilterOption) => {
    const [checked, setChecked] = React.useState(false);
    const styledOption = (
      <MenuItem
        key={option.name}
        css={css`
          height: 35px;
        `}
        level={1}
        selected={false}
        onClick={e => {
          setChecked(!checked);
          !selectedFacetOptions.includes(option.name)
            ? setSelectedFacetOptions([...selectedFacetOptions, option.name])
            : setSelectedFacetOptions(selectedFacetOptions.filter(name => name !== option.name));
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
                checked={selectedFacetOptions.includes(option.name)}
                value={option.name}
                onChange={e => console.log(e)}
                aria-label={`${option.name}-facet`}
              />
              <Typography
                variant={'subtitle2'}
                css={css`
                  margin: 0px 0px 0px 7px;
                `}
              >
                {option.name}
              </Typography>
            </div>

            <Tag variant={'NEUTRAL'}>{option.quantity}</Tag>
          </div>
        }
      />
    );

    return {
      styledOption: styledOption,
      isOptionChecked: selectedFacetOptions.includes(option.name),
      name: option.name,
    };
  };

  const allRenderedOptions = options.map(option => buildStyledOption(option));
  const [visibleOptions, setVisibleOptions] = React.useState([]);

  const getStyledOptions = (inputArray: typeof allRenderedOptions) =>
    inputArray.map(optionObject => optionObject.styledOption);

  React.useEffect(() => {
    const sortedOptions = orderBy(allRenderedOptions, ['isOptionChecked', 'name'], ['desc', 'asc']);
    const selectedOptions = sortedOptions.filter(option => option.isOptionChecked);

    if (searchQueryState) {
      const queriedOptions = sortedOptions.filter(
        option => queriedOptionNames.includes(option.name) && !selectedOptions.includes(option),
      );
      setVisibleOptions(getStyledOptions(selectedOptions.concat(queriedOptions)));
    } else {
      if (allOptionsVisible) {
        setVisibleOptions(getStyledOptions(sortedOptions));
      } else {
        const defaultNonSelectedOptions = sortedOptions
          .slice(0, defaultRenderLimit)
          .filter(option => !option.isOptionChecked);
        setVisibleOptions(getStyledOptions(selectedOptions.concat(defaultNonSelectedOptions)));
      }
    }
  }, [allOptionsVisible, selectedFacetOptions, searchQueryState]);

  const numberofMoreOptions = options.length - visibleOptions.length;
  const moreToggleVisibility =
    numberofMoreOptions === 0 ? (allOptionsVisible ? 'visible' : 'hidden') : 'visible';
  const viewAmountController = (
    <div
      className=""
      css={css`
        display: flex;
        justify-content: space-between;
        padding: 12px;
      `}
      onClick={e => e.stopPropagation()}
    >
      <HyperLink
        onClick={e => {
          selectAll
            ? setSelectedFacetOptions(options.map(option => option.name))
            : setSelectedFacetOptions([]);
          setSelectAll(!selectAll);
        }}
      >
        {selectAll ? 'Select all' : 'Deselect all'}
      </HyperLink>

      {/* The div containing the show more / show less toggler */}
      <div
        css={css`
          display: flex;
          align-content: center;
          align-items: center;
          visibility: ${moreToggleVisibility};
        `}
      >
        <HyperLink
          css={css`
            display: flex;
            align-items: center;
          `}
          onClick={e => {
            setAllOptionsVisible(!allOptionsVisible);
          }}
        >
          <Icon
            name={allOptionsVisible ? 'minus_circle' : 'plus_circle'}
            css={css`
              margin-right: 6px;
            `}
            fill={useTheme().colors.accent2}
          />
          {allOptionsVisible ? `Less` : `${numberofMoreOptions} More`}
        </HyperLink>
      </div>
    </div>
  );

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
              border-color: ${useTheme().colors.grey_2};
            `}
          >
            {visibleOptions}
          </div>
        }
        {viewAmountController}
      </MenuItem>
      <div>{JSON.stringify(selectedFacetOptions)}</div>
    </>
  );
};

export default Facet;
