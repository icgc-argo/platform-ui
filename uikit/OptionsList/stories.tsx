import { storiesOf } from '@storybook/react';
import React from 'react';
import OptionsList, { FilterOption } from '.';

const OptionsListStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const exampleOptions: Array<FilterOption> = [
    { key: 'Helion', doc_count: 587 },
    { key: 'SCV', doc_count: 525 },
    { key: 'Siege Tank', doc_count: 510 },
    { key: 'Medivac', doc_count: 478 },
    { key: 'Reaper', doc_count: 415 },
    { key: 'Battlecruiser', doc_count: 623 },
    { key: 'Thor', doc_count: 834 },
    { key: 'Widow Mine', doc_count: 626 },
    { key: 'Raven', doc_count: 144 },
    { key: 'Viking', doc_count: 882 },
    { key: 'Ghost', doc_count: 573 },
    { key: 'Cyclone', doc_count: 221 },
    { key: 'Liberator', doc_count: 523 },
    { key: 'Banshee', doc_count: 949 },
    { key: 'Hellbat', doc_count: 2000 },
  ];
  return <OptionsList options={exampleOptions} />;
});

export default OptionsListStories;
