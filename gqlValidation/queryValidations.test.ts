/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { introspectSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { validate, specifiedRules, NoUnusedFragmentsRule } from 'graphql/validation';
import path from 'path';
import { expect } from 'chai';
import urlJoin from 'url-join';
import { ABSOLUTE_ROOT_DIR, compileGqlAst, getGqlFiles } from './utils';

require('dotenv').config();
const GATEWAY_API_ROOT = process.env.GATEWAY_API_ROOT;

if (!GATEWAY_API_ROOT) {
  throw new Error(`${GATEWAY_API_ROOT} must be provided`);
}

const GRAPHQL_URL = urlJoin(process.env.GATEWAY_API_ROOT, 'graphql');
const validationRules = specifiedRules.filter(rule => rule !== NoUnusedFragmentsRule);

describe('gql validations', async () => {
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
