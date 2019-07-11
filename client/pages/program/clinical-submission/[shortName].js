import React from 'react';

import { createPage } from 'global/utils/pages';
import programClinicalSubmission from 'components/pages/submission-system/program-clinical-submission';
import { isRdpcMember, isProgramAdmin } from 'global/utils/egoJwt';

export default createPage({
  isPublic: false,
  isAccessible: ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt) && isProgramAdmin({ egoJwt, programId: shortName });
  },
})(programClinicalSubmission);
