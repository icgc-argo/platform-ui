import { storiesOf } from '@storybook/react';
import React from 'react';
import NumberRangeFacet from '.';

const NumberRangeFacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <NumberRangeFacet subMenuName="Age at Diagnosis" />;
});

export default NumberRangeFacetStories;
