import { storiesOf } from '@storybook/react';
import React from 'react';
import Affix from '.';

const AffixStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return (
    <div style={{ height: '200vh' }}>
      Some text
      <Affix top={10}>Affix content</Affix>
    </div>
  );
});

export default AffixStories;
