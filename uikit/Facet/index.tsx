import React from 'react';
import { MenuItem } from '../SubMenu';

import { css } from '@emotion/core';

import OptionsList, { FilterOption } from 'uikit/OptionsList';

const Facet = ({
  subMenuName,
  options,
  isSelected,
  onClick,
}: {
  subMenuName: string;
  options: Array<FilterOption>;
  isSelected?: boolean;
  onClick?: (e: any) => void;
}) => {
  const [searchQueryState, setSearchQueryState] = React.useState('');

  return (
    <>
      <MenuItem
        onClick={onClick}
        selected={isSelected}
        content={subMenuName}
        chevronOnLeftSide={true}
        isFacetVariant={true}
        searchStateParams={{ query: searchQueryState, querySetter: setSearchQueryState }}
        css={css`
          width: 300px;
        `}
      >
        <OptionsList options={options} searchQuery={searchQueryState} />
      </MenuItem>
    </>
  );
};

export default Facet;
