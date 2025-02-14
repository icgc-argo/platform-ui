import { Facet as FacetComp } from '@icgc-argo/uikit';
import { getOptions } from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';

const Facet = ({ facet, aggregations }: { facet: any; aggregations: unknown }) => {
  const { filters } = useFiltersContext();

  const props = {
    options: getOptions(facet, filters, aggregations),
    onOptionToggle: () => console.log('option toggle'),
    onSelectAllOptions: () => console.log('on select all'),
  };

  return <FacetComp subMenuName={facet.name} {...props} />;
};

export default Facet;
