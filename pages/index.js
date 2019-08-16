// @flow
import React from 'react';
import LoginPage from 'components/pages/login';
import { createPage } from 'global/utils/pages';

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(LoginPage);
