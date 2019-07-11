import React from 'react';

import { createPage } from 'global/utils/pages';
import programIDRegistration from 'components/pages/submission-system/program-id-registration';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
})(programIDRegistration);
