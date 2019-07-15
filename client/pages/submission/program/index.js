//@flow
import React from 'react';

import { isRdpcMember, isDccMember, canReadProgram } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submission-system/programs';

// $FlowFixMe .gql file not supported
import { programsListQuery } from 'components/pages/submission-system/programs/queries.gql';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) =>
    !isRdpcMember(egoJwt) && (isDccMember(egoJwt) || canReadProgram({ egoJwt, programId: '' })),
  getGqlQueriesToPrefetch: async () => [{ query: programsListQuery }],
})(ProgramsPage);
