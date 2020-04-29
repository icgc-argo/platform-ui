import React from 'react';
import { MenuItem } from '../SubMenu';

import { css } from '@emotion/core';

import OptionsList, { FilterOption } from 'uikit/OptionsList';

const Facet = ({
  subMenuName,
  options,
  isSelected,
  onClick,
  countUnit,
}: {
  subMenuName: string;
  options: Array<FilterOption>;
  isSelected?: boolean;
  onClick?: (e: any) => void;
  countUnit?: string;
}) => {
  const [searchQueryState, setSearchQueryState] = React.useState('');

  return (
    <>
      <MenuItem
        className="FacetMenu"
        onClick={onClick}
        selected={isSelected}
        content={subMenuName}
        chevronOnLeftSide={true}
        isFacetVariant={true}
        searchBar={true}
        searchStateParams={{ query: searchQueryState, querySetter: setSearchQueryState }}
        css={css`
          width: 300px;
        `}
      >
        <OptionsList options={options} searchQuery={searchQueryState} countUnit={countUnit} />
      </MenuItem>
    </>
  );
};

export default Facet;
