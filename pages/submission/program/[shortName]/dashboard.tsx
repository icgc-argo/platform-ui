
import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramDashboard from 'components/pages/submission-system/program-dashboard';
import { isRdpcMember, canReadProgram } from 'global/utils/egoJwt';
import SIDE_MENU_PROGRAM_LIST from 'components/pages/submission-system/SIDE_MENU_PROGRAM_LIST.gql';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return !isRdpcMember(egoJwt) && canReadProgram({ egoJwt, programId: shortName });
  },
  getGqlQueriesToPrefetch: async () => [{ query: SIDE_MENU_PROGRAM_LIST }],
})(ProgramDashboard);
