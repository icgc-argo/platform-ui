// @flow
import React from 'react';
import { createPage } from 'global/utils/pages';
import Error401Page from 'components/pages/401';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(Error401Page);
