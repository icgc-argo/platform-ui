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
import { precomputeApolloCache } from "global/utils/graphql";
import { UserQuery } from "components/UserPage/index.queries.js";
import UserPage from "components/UserPage";

export default createPage({
  getInitialProps: async ({ egoJwt, asPath, query, res }) => {
    const data = decodeToken(egoJwt);
    const firstName = data.context.user.firstName;
    const lastName = data.context.user.lastName;
    const extractedData = await precomputeApolloCache({
      query: UserQuery,
      variables: {}
    });
    return { firstName, lastName, extractedData };
  }
})(UserPage);
