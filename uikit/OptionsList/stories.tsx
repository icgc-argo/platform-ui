import { storiesOf } from '@storybook/react';
import React from 'react';
import OptionsList, { FilterOption } from '.';
import { get } from 'lodash';
import SqonBuilder from 'sqon-builder';
import Typography from 'uikit/Typography';
import { css } from 'uikit';

const OptionsListStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const defaultFilters = { op: 'and', content: [] };
  const [filters, setFilters] = React.useState(defaultFilters);

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
  ].map((opt: any) => ({
    ...opt,
    isChecked: (get(filters, 'content[0].content.value') || []).includes(opt.key),
  }));
  return (
    <div>
      <OptionsList
        options={exampleOptions}
        onToggle={facetValue => {
          const currentValue = get(filters, 'content[0].content.value');
          if (currentValue && currentValue.includes(facetValue)) {
            setFilters(
              SqonBuilder.has(
                'character',
                currentValue.filter((value: any) => value !== facetValue),
              ).build(),
            );
          } else {
            setFilters(SqonBuilder.has('character', [...(currentValue || []), facetValue]).build());
          }
        }}
        onSelectAllValues={allValuesSelected => {
          if (allValuesSelected) {
            setFilters(defaultFilters);
          } else {
            setFilters(SqonBuilder.has('character', exampleOptions.map(opt => opt.key)).build());
          }
        }}
      />
      <Typography
        css={css`
          margin-top: 20px;
          color: black;
        `}
      >
        {filters && JSON.stringify(filters)}
      </Typography>
    </div>
  );
});

export default OptionsListStories;
