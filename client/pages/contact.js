//@flow
import React from 'react';
import urlJoin from 'url-join';
import Router from 'next/router';

import { EGO_API_ROOT, EGO_CLIENT_ID } from 'global/config';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';
import { getRedirectPathForUser } from 'global/utils/pages';
import { createPage } from 'global/utils/pages';
import ContactPage from 'components/pages/contact';

export default createPage({
  isPublic: true,
})(({ redirect, egoJwt }) => {
  return <ContactPage />;
});
