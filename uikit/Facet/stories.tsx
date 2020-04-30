import { storiesOf } from '@storybook/react';
import React from 'react';
import Facet from '.';
import { FilterOption } from '../OptionsList';
import { text } from '@storybook/addon-knobs';

const FacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = {
    countUnit: text('count unit description label', 'files'),
  };
  const exampleOptions: Array<FilterOption> = [
    { key: 'Gall Bladder', doc_count: 587 },
    { key: 'Breast', doc_count: 525 },
    { key: 'Prostate', doc_count: 510 },
    { key: 'Brain', doc_count: 478 },
    { key: 'Liver', doc_count: 415 },
    { key: 'Eye', doc_count: 623 },
    { key: 'Bone', doc_count: 834 },
    { key: 'Cardiac', doc_count: 626 },
    { key: 'Colorectal', doc_count: 144 },
    { key: 'Skin', doc_count: 882 },
    { key: 'Bile Duct', doc_count: 573 },
    { key: 'Esophagus', doc_count: 221 },
  ];
  return <Facet subMenuName="Primary Site" options={exampleOptions} {...knobs} />;
});

export default FacetStories;
