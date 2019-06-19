//@flow
import React from 'react';

import { isRdpcMember } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submissionSystem/programs';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';

// $FlowFixMe .gql file not supported
import { programsListQuery } from 'components/pages/submissionSystem/programs/queries.gql';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => !isRdpcMember(egoJwt),
  getGqlQueriesToPrefetch: async () => [{ query: programsListQuery }],
})(ProgramsPage);
