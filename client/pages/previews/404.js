// @flow
import React from 'react';
import { createPage } from 'global/utils/pages';
import Error404Page from 'components/pages/404';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(Error404Page);
