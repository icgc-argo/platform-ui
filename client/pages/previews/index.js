// @flow
import React from 'react';
import urlJoin from 'url-join';

import { createPage } from 'global/utils/pages';
import Error500Page from 'components/pages/500';

// this page is only for internal consumption so we don't care if it's broken in client-side navigation
import fs from 'fs';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({
    pages: fs
      .readdirSync(module.id.split('index.js').join(''))
      .filter(fileName => !fileName.includes('index.js'))
      .map(path => path.split('.js').join('')),
  }),
})(({ pages }) => (
  <div
    style={{
      padding: '10px',
    }}
  >
    {pages.map(page => (
      <div
        style={{
          padding: '5px',
        }}
      >
        <a href={urlJoin('previews', page)}>{page}</a>
      </div>
    ))}
  </div>
));
