import {
  makeRemoteExecutableSchema,
  introspectSchema,
  transformSchema,
  FilterRootFields
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import {
  ARRANGER_ROOT,
  ARRANGER_PROJECT_ID,
  EGO_JWT_SECRET
} from "../../config";
import urlJoin from "url-join";

const apiRoot = urlJoin(ARRANGER_ROOT, ARRANGER_PROJECT_ID, "graphql");

const createFetcher = ({ egoSecret }) => (_, rest) =>
  fetch(apiRoot, {
    method: "POST",
    ...rest,
    headers: {
      ...(rest.headers || {}),
      Authorization: `Bearer ${egoSecret}`,
      "Content-Type": "application/json"
    }
  });

export default async () => {
  const link = new HttpLink({
    uri: apiRoot,
    fetch: createFetcher({ egoSecret: EGO_JWT_SECRET })
  });
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema: schema,
    link
  });
  const transformedSchema = transformSchema(executableSchema, [
    new FilterRootFields((operation, rootField) => rootField !== "viewer")
  ]);
  return transformedSchema;
};
