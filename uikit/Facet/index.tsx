import React from 'react';
import { MenuItem } from '../SubMenu';

import { css } from '@emotion/core';

import OptionsList, { FilterOption } from 'uikit/OptionsList';

const Facet = ({ subMenuName, options }: { subMenuName: string; options: Array<FilterOption> }) => {
  const [searchQueryState, setSearchQueryState] = React.useState('');

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
        <OptionsList options={options} searchQuery={searchQueryState} />
      </MenuItem>
    </>
  );
};

export default Facet;
