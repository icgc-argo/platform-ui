import TeamPage from 'components/pages/team';
import { createPage } from 'global/utils/pages';
import React from 'react';

export default createPage({
  isPublic: true,
})(() => {
  return <TeamPage />;
});
