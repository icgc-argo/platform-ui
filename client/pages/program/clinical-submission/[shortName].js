import React from 'react';

import { createPage } from 'global/utils/pages';
import programClinicalSubmission from 'components/pages/submission-system/program-clinical-submission';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return true;
  },
})(programClinicalSubmission);
