//@flow
import ContactPage from 'components/pages/contact';
import { createPage } from 'global/utils/pages';
import React from 'react';

export default createPage({
  isPublic: true,
})(({ redirect, egoJwt }) => {
  return <ContactPage />;
});
