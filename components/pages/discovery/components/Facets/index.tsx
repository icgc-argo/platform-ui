import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { get } from 'lodash';
import { PropsWithChildren, useState } from 'react';
import { FACET_OPTIONS } from './data/facet';
import DISCOVERY_FACETS_QUERY from './DISCOVERY_FACETS_QUERY';
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
  const { filters } = useFiltersContext();
  const {
    data: responseData,
    loading,
    error,
  } = useQuery(DISCOVERY_FACETS_QUERY, {
    variables: { filters },
  });

  const aggregations = get(responseData, 'file.aggregations');

  console.log('data', aggregations, error, loading);

  return (
    <>
      <FiltersSearchBox
        title="Filter"
        isExpanded={expandAll}
        onClick={() => setExpandAll((s) => !s)}
      />
      {loading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div css={css({ flex: 1, overflow: 'scroll' })}>
          {FACET_OPTIONS.map(({ folder, contents }) => {
            return (
              <FacetFolder title={folder} onClick={() => console.log('a')} override={expandAll}>
                {contents.map((facet) => {
                  return (
                    <FacetRow>
                      <Facet facet={facet} aggregations={aggregations} />
                    </FacetRow>
                  );
                })}
              </FacetFolder>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Facets;
