//@flow
import React from 'react';
import { get } from 'lodash';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import { isRdpcMember, getAuthorizedProgramPolicies, decodeToken } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submissionSystem/programs';
import { programsQuery } from 'components/pages/submissionSystem/programs/queries';
import createInMemoryCache from 'global/utils/createInMemoryCache';
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
