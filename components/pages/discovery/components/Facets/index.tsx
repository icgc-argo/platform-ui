import { css } from '@emotion/react';
import { Facet } from '@icgc-argo/uikit';
import { getOptions } from 'components/pages/file-repository/FacetPanel';
import { PropsWithChildren } from 'react';
import { facets } from '../SideBar/data';
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
                    <Facet
                      subMenuName={facet.name}
                      options={getOptions(facet, filters, aggregations)}
                      onOptionToggle={() => console.log('option toggle')}
                      onSelectAllOptions={() => console.log('on select all')}
                    />
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
