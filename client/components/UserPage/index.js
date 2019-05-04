//@flow
import React from "react";
import { get } from "lodash";
import urlJoin from "url-join";
import fetch from "isomorphic-fetch";

import { gql, InMemoryCache, type GraphQLError } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";

import { createPage } from "global/utils/pages";
import { decodeToken } from "global/utils/egoJwt";
import { API_ROOT } from "global/config";
import { UserQuery } from "./index.queries.js";

const useQuery = (input: {
  query: any,
  variables?: { [k: string]: any },
  client?: ApolloClient<any>,
  cache?: any,
  observe?: Array<any>
}) => {
  const link = (createHttpLink({
    uri: urlJoin(API_ROOT, "graphql")
  }): any);
  const client =
    input.client ||
    new ApolloClient<any>({
      cache: new InMemoryCache().restore(input.cache),
      link,
      connectToDevTools: true
    });
  const initialState: {
    data: any,
    errors: void | Array<GraphQLError>,
    loading: boolean
  } = {
    data: undefined,
    loading: true,
    errors: []
  };
  const [state, setState] = React.useState(initialState);
  React.useEffect(() => {
    client
      .query({
        query: input.query,
        variables: input.variables
      })
      .then(({ data, errors, loading }) => setState({ data, errors, loading }));
  }, input.observe || []);
  return state;
};

export default ({ egoJwt, firstName, lastName, extractedData }: any) => {
  const [id, setId] = React.useState(2);
  const { data, loading, errors } = useQuery({
    cache: extractedData,
    query: UserQuery,
    variables: {
      userId: id
    },
    observe: [id]
  });

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
