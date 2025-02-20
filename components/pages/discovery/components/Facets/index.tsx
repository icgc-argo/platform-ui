import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import {
  getOptions,
  useFacetOptionToggle,
  useFacetSelectAllOptionsToggle,
} from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { get } from 'lodash';
import { PropsWithChildren, useState } from 'react';
import { FACET_OPTIONS } from '../../data/facet';
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

const facetPaths = FACET_OPTIONS.flatMap((folder) =>
  folder.contents.map((facet) => facet.facetPath),
);

/**
 *
 * Takes aggregations state and a set of facets
 * Adds in relevant state for facets
 * return Facet component with state and callbacks
 *
 * @param param0
 * @param
 * @param
 * @returns
 */
const FacetCollection = ({ aggregations, isLoading, staticFacets }) => {
  const { filters } = useFiltersContext();

  const [expandedFacets, setExpandedFacets] = useState(facetPaths);

  const renderedFacets = staticFacets.map(({ folder, contents }) => {
    return (
      <FacetFolder title={folder} onClick={() => console.log('a')} override={true}>
        {contents.map((facet) => {
          const options = getOptions(facet, filters, aggregations);
          const onOptionToggle = useFacetOptionToggle(facet);
          const onSelectAllOptions = useFacetSelectAllOptionsToggle(facet, aggregations);

          const facetProps = {
            ...facet,
            ...{
              options,
              onOptionToggle,
              onSelectAllOptions,
              isExpanded: expandedFacets.includes(facet.facetPath),
            },
          };
          return (
            <FacetRow>
              <Facet facet={facetProps} aggregations={aggregations} />
            </FacetRow>
          );
        })}
      </FacetFolder>
    );
  });

  return renderedFacets;
};

const Facets = () => {
  const [isFacetsExpanded, setFacetsExpanded] = useState(false);
  const { filters } = useFiltersContext();
  const {
    data: responseData,
    loading: isLoading,
    error,
  } = useQuery(DISCOVERY_FACETS_QUERY, {
    variables: { filters },
  });

  const aggregations = get(responseData, 'file.aggregations', {});

  return (
    <>
      <FiltersSearchBox
        title="Filter"
        isExpanded={isFacetsExpanded}
        onClick={() => setFacetsExpanded((isExpanded) => !isExpanded)}
      />

      <div css={css({ flex: 1, overflow: 'scroll' })}>
        <FacetCollection
          aggregations={aggregations}
          staticFacets={FACET_OPTIONS}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Facets;
