import React from 'react';
import LoginPage from 'components/pages/login';
import HomePage from '../components/pages/Homepage';
import { createPage } from 'global/utils/pages';
import { getConfig } from 'global/config';

const { FEATURE_NEW_HOMEPAGE_ENABLED } = getConfig();
const landingPage = FEATURE_NEW_HOMEPAGE_ENABLED ? HomePage : LoginPage;

export default createPage({
  isPublic: true,
  getInitialProps: async () => ({}),
})(landingPage);
