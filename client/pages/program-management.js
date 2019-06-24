//@flow
import React from 'react';

import { isRdpcMember } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramManagement from 'components/pages/submissionSystem/program-management';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';

// $FlowFixMe .gql file not supported
import { programsListQuery } from 'components/pages/submissionSystem/programs/queries.gql';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => !isRdpcMember(egoJwt),
  getGqlQueriesToPrefetch: async () => [{ query: programsListQuery }],
})(ProgramManagement);
