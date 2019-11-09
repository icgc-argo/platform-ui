import { introspectSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { validate, specifiedRules, NoUnusedFragmentsRule } from 'graphql/validation';
import path from 'path';
import { expect } from 'chai';
import urlJoin from 'url-join';
import { compileGqlAst, getGqlFiles, ABSOLUTE_ROOT_DIR } from './compilation.test';

require('dotenv').config();

const GRAPHQL_URL = urlJoin(process.env.GATEWAY_API_ROOT, 'graphql');
const validationRules = specifiedRules.filter(rule => rule !== NoUnusedFragmentsRule);

describe('compatible', async () => {
  it(`must be compatible`, async () => {
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
    const gqlFiles = await getGqlFiles();
    gqlFiles.forEach(({ dir, file }) => {
      describe(path.resolve(dir, file).replace(ABSOLUTE_ROOT_DIR, ''), () => {
        it(`must be compliant with gql API at ${GRAPHQL_URL}`, () => {
          validateGqlFileAgainstSchema(schema)({ dir, file });
        });
      });
    });
  });
});

const validateGqlFileAgainstSchema = schema => ({ dir, file }) => {
  const queryFilePath = path.resolve(dir, file);
  const queryAst = compileGqlAst(queryFilePath);
  const errors = validate(schema, queryAst, validationRules);
  if (errors.length) {
    throw new Error(`validation failed for ${queryFilePath}: ${errors}`);
  }
  expect(errors).to.be.empty;
};
