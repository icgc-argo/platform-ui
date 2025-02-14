import { css } from '@emotion/react';
import { PropsWithChildren, useState } from 'react';
import { facets } from '../SideBar/data';
import Facet from './Facet';
import { FacetFolder } from './Folder';
import { FiltersSearchBox } from './Search';

const FacetRow = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div css={css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' })}>
      {children}
    </div>
  );
};

const Facets = () => {
  const [expandAll, setExpandAll] = useState(false);

  return (
    <>
      <FiltersSearchBox
        title="Filter"
        isExpanded={expandAll}
        onClick={() => setExpandAll((s) => !s)}
      />
      <div css={css({ flex: 1, overflow: 'scroll' })}>
        {facets.map(({ folder, contents }) => {
          return (
            <FacetFolder title={folder} onClick={() => console.log('a')} override={expandAll}>
              {contents.map((facet) => {
                return (
                  <FacetRow>
                    <Facet facet={facet} aggregations={{}} />
                  </FacetRow>
                );
              })}
            </FacetFolder>
          );
        })}
      </div>
    </>
  );
};

export default Facets;
