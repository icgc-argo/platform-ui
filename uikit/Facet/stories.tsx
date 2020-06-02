import { storiesOf } from '@storybook/react';
import React from 'react';
import Facet from '.';
import { FilterOption } from '../OptionsList';
import { text } from '@storybook/addon-knobs';
import SqonBuilder from 'sqon-builder';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { get } from 'lodash';

const FacetStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = {
    countUnit: text('count unit description label', 'files'),
  };

  const defaultFilters = { op: 'and', content: [] };
  const [filters, setFilters] = React.useState(defaultFilters);

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
  ].map((opt: any) => ({
    ...opt,
    isChecked: (get(filters, 'content[0].content.value') || []).includes(opt.key),
  }));

  return (
    <div>
      <Facet
        subMenuName="Primary Site"
        options={exampleOptions}
        onSelect={facetValue => {
          const currentValue = get(filters, 'content[0].content.value');
          if (currentValue && currentValue.includes(facetValue)) {
            setFilters(
              SqonBuilder.has(
                'primary site',
                currentValue.filter((value: any) => value !== facetValue),
              ).build(),
            );
          } else {
            setFilters(
              SqonBuilder.has('primary site', [...(currentValue || []), facetValue]).build(),
            );
          }
        }}
        onSelectAllValues={allValuesSelected => {
          if (allValuesSelected) {
            setFilters(defaultFilters);
          } else {
            setFilters(SqonBuilder.has('primary site', exampleOptions.map(opt => opt.key)).build());
          }
        }}
        {...knobs}
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

export default FacetStories;
