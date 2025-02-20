import { css, Facet as FacetComp } from '@icgc-argo/uikit';
import {
  getOptions,
  useFacetOptionToggle,
  useFacetSelectAllOptionsToggle,
} from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { FacetData } from '../../data/facet';

const Facet = ({ facet, aggregations }: { facet: FacetData; aggregations: unknown }) => {
  const { filters } = useFiltersContext();

  const props = {
    options: getOptions(facet, filters, aggregations),
    onOptionToggle: useFacetOptionToggle(facet),
    onSelectAllOptions: useFacetSelectAllOptionsToggle(facet, aggregations),
    ...facet,
  };

  return (
    <FacetComp
      subMenuName={facet.name}
      {...props}
      css={css({
        color: 'black',
      })}
    />
  );
};

export default Facet;
