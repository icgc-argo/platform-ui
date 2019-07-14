import { isRdpcMember, canWriteSomeProgram } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submission-system/programs';

import programsListQuery from 'components/pages/submission-system/programs/queries.gql';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => !isRdpcMember(egoJwt) && canWriteSomeProgram(egoJwt),
  getGqlQueriesToPrefetch: async () => [{ query: programsListQuery }],
})(ProgramsPage);
