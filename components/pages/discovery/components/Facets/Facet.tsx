import { css, Facet as FacetComp } from '@icgc-argo/uikit';
import { getOptions } from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import type { Facet as F } from './data/facet';

const Facet = ({ facet, aggregations }: { facet: F; aggregations: unknown }) => {
  const { filters } = useFiltersContext();
  console.log('facet', facet, filters, aggregations);
  const props = {
    options: getOptions(facet, filters, aggregations),
    onOptionToggle: () => console.log('option toggle'),
    onSelectAllOptions: () => console.log('on select all'),
  };

  return (
    <FacetComp
      subMenuName={facet.name}
      {...props}
      css={css({
        color: '#151C3D',
      })}
    />
  );
};

export default Facet;
