import { storiesOf } from '@storybook/react';
import React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Banner, { BANNER_VARIANTS, BANNER_SIZE } from '.';

const BannerStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select('variant', [undefined, ...Object.values(BANNER_VARIANTS)], undefined);
  const size = select('size', [undefined, ...Object.values(BANNER_SIZE)], undefined);
  const title = text('title', 'Hipster Ipsum');
  const content = text(
    'content',
    'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  );
  return <Banner variant={variant} title={title} content={content} size={size} />;
});

export default BannerStories;
