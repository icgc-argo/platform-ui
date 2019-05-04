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

export const precomputeApolloCache: ({
  query: any,
  variables: { [k: string]: any }
}) => Promise<any> = async ({ query, variables }) => {
  const link = (createHttpLink({
    uri: urlJoin(API_ROOT, "graphql")
  }): any);
  const client = new ApolloClient({
    ssrMode: true,
    link: link,
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
