import PrivacyPage from 'components/pages/privacy';
import { createPage } from 'global/utils/pages';
import React from 'react';
import { getConfig } from 'global/config';
import { ERROR_STATUS_KEY } from 'pages/_error';

export default createPage({
  isPublic: true,
  getInitialProps: async () => {
    const { FEATURE_PRIVACY_PAGE_ENABLED } = getConfig();
    if (!FEATURE_PRIVACY_PAGE_ENABLED) {
      const err = new Error('Page Not Found') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 404;
      throw err;
    }
  },
})(() => {
  return <PrivacyPage />;
});
