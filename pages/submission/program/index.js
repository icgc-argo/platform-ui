//@flow
import React from 'react';

import { isRdpcMember, isDccMember } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submission-system/programs';
import SIDE_MENU_PROGRAM_LIST from 'components/pages/submission-system/SIDE_MENU_PROGRAM_LIST.gql';
import PROGRAMS_LIST_QUERY from 'components/pages/submission-system/programs/PROGRAMS_LIST_QUERY.gql';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => isDccMember(egoJwt),
  getGqlQueriesToPrefetch: async () => [
    { query: SIDE_MENU_PROGRAM_LIST },
    { query: PROGRAMS_LIST_QUERY },
  ],
})(ProgramsPage);
