import { introspectSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { validate, specifiedRules, NoUnusedFragmentsRule } from 'graphql/validation';
import path from 'path';
import { expect } from 'chai';
import urlJoin from 'url-join';
import { ABSOLUTE_ROOT_DIR, compileGqlAst, getGqlFiles } from './utils';

require('dotenv').config();

const GRAPHQL_URL = urlJoin(process.env.GATEWAY_API_ROOT, 'graphql');
const validationRules = specifiedRules.filter(rule => rule !== NoUnusedFragmentsRule);

describe('this test', async () => {
  let gqlFiles;
  it('can get gql files', async () => {
    gqlFiles = await getGqlFiles();
  });
  it(`can retrieve remote schema at ${GRAPHQL_URL}`, async () => {
    const apolloLink = new HttpLink({
      uri: GRAPHQL_URL,
      fetch,
    });
    const schema = await introspectSchema(apolloLink);
    gqlFiles.forEach(({ dir, file }) => {
      describe(path.resolve(dir, file).replace(ABSOLUTE_ROOT_DIR, 'components'), () => {
        it(`is compliant with gql API at ${GRAPHQL_URL}`, () => {
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
    throw new Error(errors);
  }
  expect(errors).to.be.empty;
};
