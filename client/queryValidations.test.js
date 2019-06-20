import gql from 'graphql-tag';
import { introspectSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { validate } from 'graphql/validation';
import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import findFiles from 'file-regex/dist';
import urlJoin from 'url-join';

require('dotenv').config();

const GRAPHQL_URL = urlJoin(process.env.API_ROOT, 'graphql');

const validateGqlFileAgainstSchema = schema => ({ dir, file }) => {
  const queryFilePath = path.resolve(dir, file);
  let queryAst;
  try {
    queryAst = gql`
      ${fs.readFileSync(queryFilePath)}
    `;
  } catch (err) {
    throw new Error(`failed to parse AST for ${queryFilePath}: ${err}`);
  }
  const errors = validate(schema, queryAst);
  if (errors.length) {
    throw new Error(`validation failed for ${queryFilePath}: ${errors}`);
  }
  expect(errors).to.be.empty;
};

const runTest = async () => {
  const apolloLink = new HttpLink({
    uri: GRAPHQL_URL,
    fetch,
  });
  let schema;
  try {
    schema = await introspectSchema(apolloLink);
  } catch (err) {
    throw new Error(`failed to retrieve remote schema`);
  }
  const gqlFiles = await findFiles(path.resolve(__dirname, 'components'), /\.gql$/, Infinity);
  gqlFiles.forEach(validateGqlFileAgainstSchema(schema));
};

describe('all gql queries', () => {
  it(`must be compliant with gql API at ${GRAPHQL_URL}`, async () => {
    await runTest();
  });
});
