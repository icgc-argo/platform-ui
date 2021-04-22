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

import { createPage } from 'global/utils/pages';
import FileEntityPage from 'components/pages/file-entity';
import ErrorPage, { ERROR_STATUS_KEY } from 'pages/_error';
import { getConfig } from 'global/config';
import { usePageQuery } from 'global/hooks/usePageContext';
import sqonBuilder from 'sqon-builder';
import { useQuery } from '@apollo/react-hooks';
import VALID_ENTITY_CHECK from './VALID_ENTITY_CHECK.gql';
import get from 'lodash/get';
import { useGlobalLoadingState } from 'components/ApplicationRoot';

export default createPage({
  isPublic: true,
  isAccessible: async ({ initialPermissions }) => true,
  getInitialProps: async () => {
    const { FEATURE_FILE_ENTITY_ENABLED } = getConfig();
    if (!FEATURE_FILE_ENTITY_ENABLED) {
      const err = new Error('Page Not Found') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 404;
      throw err;
    }
  },
})((props) => {
  const { fileId } = usePageQuery<{ fileId: string }>();
  const filters = sqonBuilder.has('object_id', fileId).build();

  // small query to ensure the fileId is valid and user has access
  const { loading, data } = useQuery<{
    file: { hits: { total: number } };
  }>(VALID_ENTITY_CHECK, {
    variables: {
      filters,
    },
  });
  console.log('data', data);
  const isValidEntity = !!get(data, 'file.hits.total', false);

  const { setLoading: setLoaderShown, isLoading: isLoaderShown } = useGlobalLoadingState();

  if (!loading && !isValidEntity) {
    setLoaderShown(false);
    const err = new Error('Page Not Found') as Error & { statusCode?: number };
    err[ERROR_STATUS_KEY] = 404;
    return <ErrorPage statusCode={404} />;
  } else if (loading) {
    setLoaderShown(true);
    return <div></div>;
  }
  setLoaderShown(false);

  return <FileEntityPage {...props} fileId={fileId} />;
});
