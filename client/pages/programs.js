//@flow
import React from 'react';

import { isRdpcMember } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submissionSystem/programs';
import { programsQuery } from 'components/pages/submissionSystem/programs/queries';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => !isRdpcMember(egoJwt),
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    const cache = await getApolloCacheForQueries([{ query: programsQuery }]);
    return { cache };
  },
  getGqlQueriesToPrefetch: async () => [{ query: programsQuery }],
})(ProgramsPage);
