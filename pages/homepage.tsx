import { createPage } from 'global/utils/pages';
import React from 'react';
import HomePage from 'components/pages/Homepage';

export default createPage({
  isPublic: true,
})(() => {
  return <HomePage />;
});
