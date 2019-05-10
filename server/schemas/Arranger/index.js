import {
  makeRemoteExecutableSchema,
  introspectSchema,
  transformSchema,
  FilterRootFields,
} from 'graphql-tools';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import urlJoin from 'url-join';

import { ARRANGER_ROOT, ARRANGER_PROJECT_ID, EGO_JWT_SECRET } from '../../config';

const apiRoot = urlJoin(ARRANGER_ROOT, ARRANGER_PROJECT_ID, 'graphql');

export default async () => {
  const link = setContext((request, { graphqlContext = {} } = {}) => ({
    headers: {
      Authorization: graphqlContext.isUserRequest
        ? `Bearer ${graphqlContext.egoToken}`
        : `Bearer ${EGO_JWT_SECRET}`,
    },
  })).concat(
    new HttpLink({
      uri: apiRoot,
      fetch,
    }),
  );
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema: schema,
    link,
  });
  const transformedSchema = transformSchema(executableSchema, [
    new FilterRootFields(
      (operation, rootField) =>
        !['viewer', 'saveAggsState', 'saveColumnsState', 'saveMatchBoxState'].includes(rootField),
    ),
  ]);
  return transformedSchema;
};
