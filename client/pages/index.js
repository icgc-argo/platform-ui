// @flow
import React from 'react';
import LandingPage from 'components/pages/landing';
import { createPage } from 'global/utils/pages';

export default createPage({
  isPublic: true,
  getInitialProps: LandingPage.getInitialProps,
})(props => <LandingPage {...props} />);
