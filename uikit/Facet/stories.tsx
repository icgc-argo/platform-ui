import { storiesOf } from '@storybook/react';
import React from 'react';
import Facet, { FilterOption } from '.';

const FacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const exampleOptions: Array<FilterOption> = [
    { name: 'Gall Bladder', quantity: 587 },
    { name: 'Breast', quantity: 525 },
    { name: 'Prostate', quantity: 510 },
    { name: 'Brain', quantity: 478 },
    { name: 'Liver', quantity: 415 },
    { name: 'Eye', quantity: 623 },
    { name: 'Bone', quantity: 834 },
    { name: 'Cardiac', quantity: 626 },
    { name: 'Colorectal', quantity: 144 },
    { name: 'Skin', quantity: 882 },
    { name: 'Bile Duct', quantity: 573 },
    { name: 'Esophagus', quantity: 221 },
  ];
  return <Facet subMenuName="Primary Site" options={exampleOptions} />;
});

export default FacetStories;
