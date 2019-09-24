import { storiesOf } from '@storybook/react';
import React from 'react';
import Link, { LINK_VARIANTS } from '.';
import { action } from '@storybook/addon-actions';
import { select, boolean } from '@storybook/addon-knobs';

const LinkStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select('variant', Object.values(LINK_VARIANTS));
  return (
    <>
      <Link href="http://www.google.com" variant={variant}>
        Link to Google
      </Link>
    </>
  );
});

export default LinkStories;
