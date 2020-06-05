import { storiesOf } from '@storybook/react';
import React from 'react';
import NumberRangeFacet from '.';

const NumberRangeFacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const [range, setRange] = React.useState({ min: null, max: null });
  return (
    <div>
      <NumberRangeFacet
        subMenuName="Age at Diagnosis"
        onSubmit={(min, max) => setRange({ min, max })}
      />
    </div>
  );
});

export default NumberRangeFacetStories;
