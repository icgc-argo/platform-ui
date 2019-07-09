import React from 'react';

import { isRdpcMember } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramManagement from 'components/pages/submissionSystem/program-management';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => !isRdpcMember(egoJwt),
})(ProgramManagement);
