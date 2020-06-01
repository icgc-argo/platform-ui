import { storiesOf } from '@storybook/react';
import React from 'react';
import NumberRangeFacet from '.';
import { defaultFilters } from 'components/pages/file-repository/hooks/useFiltersContext';
import Typography from 'uikit/Typography';
import SqonBuilder from 'sqon-builder';

const NumberRangeFacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const [filters, setFilters] = React.useState(defaultFilters);
  return (
    <div>
      <NumberRangeFacet
        subMenuName="Age at Diagnosis"
        onChange={(min, max) => {
          const newFilters = SqonBuilder.gt('age at diagnosis', min).lt('age at diagnosis', max);
          setFilters(newFilters);
        }}
      />
      <Typography>{JSON.stringify(filters)}</Typography>
    </div>
  );
});

export default NumberRangeFacetStories;
