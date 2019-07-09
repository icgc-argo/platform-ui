import React from 'react';

import { isRdpcMember, isProgramAdmin } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramManagement from 'components/pages/submissionSystem/program-management';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt)(egoJwt) && isProgramAdmin({ egoJwt, programId: shortName });
  },
})(ProgramManagement);
