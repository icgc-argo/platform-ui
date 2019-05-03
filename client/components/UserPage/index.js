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
import { UserQuery } from "./index.queries.js";

export default ({ egoJwt, firstName, lastName, extractedData }: any) => {
  const [data, setData] = React.useState(null);
  const [id, setId] = React.useState(2);
  const link = (createHttpLink({
    uri: urlJoin(API_ROOT, "graphql")
  }): any);
  const client = new ApolloClient({
    cache: new InMemoryCache().restore(extractedData),
    link,
    connectToDevTools: true
  });
  React.useEffect(() => {
    client
      .query({
        query: UserQuery,
        variables: {
          userId: id
        }
      })
      .then(({ data }) => setData(data));
  }, [id]);
  return (
    <div>
      Logged in user: {firstName} {lastName}
      <div>id: {id}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => setId(id - 1)}>previous</button>
      <button onClick={() => setId(id + 1)}>next</button>
    </div>
  );
};
