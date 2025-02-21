import { css, Facet as FacetComp } from '@icgc-argo/uikit';
import {
  getOptions,
  useFacetOptionToggle,
  useFacetSelectAllOptionsToggle,
} from 'components/pages/file-repository/FacetPanel';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { PropsWithChildren } from 'react';
import { FacetData } from '../../data/facet';

export const Facet = ({ facet, aggregations }: { facet: FacetData; aggregations: unknown }) => {
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

export const FacetRow = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div css={css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' })}>
      {children}
    </div>
  );
};
