import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramDashboard from 'components/pages/submission-system/program-dashboard';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
})(ProgramDashboard);
