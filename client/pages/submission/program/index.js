//@flow
import React from 'react';

import { isRdpcMember, isDccMember } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submission-system/programs';
import SIDE_MENU_PROGRAM_LIST from 'components/pages/submission-system/SIDE_MENU_PROGRAM_LIST.gql';

import programsListQuery from 'components/pages/submission-system/programs/queries.gql';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => isDccMember(egoJwt),
  getGqlQueriesToPrefetch: async () => [{ query: SIDE_MENU_PROGRAM_LIST }],
})(ProgramsPage);
