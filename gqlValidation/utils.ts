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

import gql from 'graphql-tag';
import fs from 'fs';
import path from 'path';
import findFiles from 'file-regex/dist';
import memoize from 'lodash/memoize';

export const GRAPHQL_FILE_REGEX = /\.gql$/;
export const ROOT_DIR = '../components';
export const ABSOLUTE_ROOT_DIR = path.resolve(__dirname, ROOT_DIR);

export const getGqlFiles = memoize(
  async () => await findFiles(ABSOLUTE_ROOT_DIR, GRAPHQL_FILE_REGEX, Infinity),
);

export const compileGqlAst = memoize((queryFilePath: string) => {
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
    throw new Error(err);
  }
});
