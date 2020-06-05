import React from 'react';
import { MenuItem } from '../SubMenu';

import { css } from '@emotion/core';

import OptionsList, { FilterOption } from 'uikit/OptionsList';

const Facet = ({
  subMenuName,
  options,
  isExpanded,
  onClick,
  countUnit,
  onOptionToggle,
  onSelectAllValues,
}: {
  subMenuName: string;
  options: Array<FilterOption>;
  isExpanded?: boolean;
  onClick?: (e: any) => void;
  countUnit?: string;
  onOptionToggle: (facetValue: string | string[]) => void;
  onSelectAllValues: (allValuesSelected: boolean) => void;
}) => {
  const [searchQueryState, setSearchQueryState] = React.useState('');

  return (
    <>
      <MenuItem
        className="FacetMenu"
        onClick={onClick}
        selected={isExpanded}
        content={subMenuName}
        chevronOnLeftSide={true}
        isFacetVariant={true}
        searchBar={true}
        searchStateParams={{ query: searchQueryState, querySetter: setSearchQueryState }}
        css={css`
          width: 300px;
        `}
      >
        <OptionsList
          options={options}
          searchQuery={searchQueryState}
          countUnit={countUnit}
          onOptionToggle={onOptionToggle}
          onSelectAllValues={onSelectAllValues}
        />
      </MenuItem>
    </>
  );
};

export default Facet;
