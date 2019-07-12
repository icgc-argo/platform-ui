import React from 'react';

import { isRdpcMember, isProgramAdmin } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramManagement from 'components/pages/submission-system/program-management';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt) && isProgramAdmin({ egoJwt, programId: shortName });
  },
})(ProgramManagement);
