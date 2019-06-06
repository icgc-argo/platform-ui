import { storiesOf } from '@storybook/react';
import React from 'react';
import DnaLoader from '.';
import { number } from '@storybook/addon-knobs';

const DnaLoaderStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const dotsCount = number('dotsCount', 5);
  return (
    <DnaLoader style={{ background: 'white' }} dotsCount={dotsCount}>
      Skeleton
    </DnaLoader>
  );
});

export default DnaLoaderStories;
