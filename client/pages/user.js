//@flow
import React from "react";
import { get } from "lodash";
import urlJoin from "url-join";
import fetch from "isomorphic-fetch";

import { gql, InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";

import { createPage } from "global/utils/pages";
import { decodeToken } from "global/utils/egoJwt";
import { API_ROOT } from "global/config";
import { UserQuery } from "components/UserPage/index.queries.js";
import UserPage from "components/UserPage";

const precomputeApolloCache = async ({ query, variables }) => {
  const link = (createHttpLink({
    uri: urlJoin(API_ROOT, "graphql")
  }): any);
  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache()
  });
  const x = await client.query({
    query,
    variables: {
      userId: 2
    }
  });
  return client.extract();
};

export default createPage({
  getInitialProps: async ({ egoJwt, asPath, query, res }) => {
    const data = decodeToken(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    const extractedData = await precomputeApolloCache({
      query: UserQuery,
      variables: {}
    });
    return { firstName, lastName, extractedData };
  }
})(UserPage);
