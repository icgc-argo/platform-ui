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
          const newFilters = {
            op: 'and',
            content: [
              ...(min
                ? [
                    {
                      op: '>=',
                      content: {
                        field: 'age at diagnosis',
                        value: min,
                      },
                    },
                  ]
                : []),
              ...(max
                ? [
                    {
                      op: '<=',
                      content: {
                        field: 'age at diagnosis',
                        value: max,
                      },
                    },
                  ]
                : []),
            ],
          };
          setFilters(newFilters);
        }}
      />
      <Typography>{JSON.stringify(filters)}</Typography>
    </div>
  );
});

export default NumberRangeFacetStories;
