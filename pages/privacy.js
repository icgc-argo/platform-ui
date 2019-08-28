//@flow
import PrivacyPage from 'components/pages/privacy';
import { createPage } from 'global/utils/pages';
import React from 'react';

export default createPage({
  isPublic: true,
})(({ redirect, egoJwt }) => {
  return <PrivacyPage />;
});
