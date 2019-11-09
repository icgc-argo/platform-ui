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
import memoize from 'lodash/memoize';

require('dotenv').config();

const GRAPHQL_URL = urlJoin(process.env.GATEWAY_API_ROOT, 'graphql');
const GRAPHQL_FILE_REGEX = /\.gql$/;

describe('all gql queries', () => {
  it(`must be compliant with gql API at ${GRAPHQL_URL}`, async () => {
    await runTest();
  });
});

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
  const gqlFiles = await findFiles(
    path.resolve(__dirname, 'components'),
    GRAPHQL_FILE_REGEX,
    Infinity,
  );
  gqlFiles.forEach(validateGqlFileAgainstSchema(schema));
};

const validateGqlFileAgainstSchema = schema => ({ dir, file }) => {
  const queryFilePath = path.resolve(dir, file);
  const queryAst = compileGqlAst(queryFilePath);
  const errors = validate(schema, queryAst);
  if (errors.length) {
    throw new Error(`validation failed for ${queryFilePath}: ${errors}`);
  }
  expect(errors).to.be.empty;
};

const compileGqlAst = memoize((queryFilePath: string) => {
  const gqlStr = String(fs.readFileSync(queryFilePath));
  const gqlImportResults = gqlStr
    .split('\n')
    .filter(str => {
      // example: #import "./CLINICAL_SUBMISSION_FRAGMENT.gql"
      return str.includes('#') && str.includes('import');
    })
    .map(importComment => {
      const relativePath = importComment.includes('"')
        ? importComment.split('"')[1]
        : importComment.split("'")[1];
      const currentPathSegments = queryFilePath.split('/');
      const currentPath = currentPathSegments.slice(0, currentPathSegments.length - 1).join('/');
      const absolutePath = path.resolve(currentPath, relativePath);
      return compileGqlAst(absolutePath).loc.source.body;
    })
    .join('\n');
  try {
    return gql`
      ${gqlImportResults}
      ${gqlStr}
    `;
  } catch (err) {
    throw new Error(`Failed to parse AST for ${queryFilePath}: ${err}\n`);
  }
});
