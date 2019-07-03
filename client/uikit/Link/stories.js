import { storiesOf } from '@storybook/react';
import React from 'react';
import Link from '.';
import { action } from '@storybook/addon-actions';

const LinkStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <>
    <Link href="http://www.google.com">Link to Google</Link>
    <Link
      href="http://www.google.com"
      Component={props => <div onClick={action('click')} {...props} />}
    >
      This just logs
    </Link>
  </>
));

export default LinkStories;
