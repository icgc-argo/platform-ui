//@flow
import React from 'react';
import { createPage } from 'global/utils/pages';
import ContactPage from 'components/pages/contact';

export default createPage({
  isPublic: true,
})(({ redirect, egoJwt }) => {
  return <ContactPage />;
});
