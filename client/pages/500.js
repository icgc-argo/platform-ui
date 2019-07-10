// @flow
import React from 'react';
import { createPage } from 'global/utils/pages';
import Error500Page from 'components/pages/500';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(Error500Page);
