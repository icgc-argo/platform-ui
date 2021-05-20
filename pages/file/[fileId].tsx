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
import sqonBuilder from 'sqon-builder';
import { useQuery } from '@apollo/react-hooks';
import VALID_ENTITY_CHECK from './VALID_ENTITY_CHECK.gql';
import get from 'lodash/get';
import { css } from 'uikit';
import clsx from 'clsx';
import React from 'react';
import Head from '../../components/pages/head';
import Footer from 'uikit/Footer';
import { PageContainer, PageBody, PageContent } from 'uikit/PageLayout';
import NavBar from '../../components/NavBar';
import DnaLoader from 'uikit/DnaLoader';

export default createPage({
  isPublic: true,
  isAccessible: async ({ initialPermissions }) => true,
  getInitialProps: async (ctx) => {
    const { FEATURE_FILE_ENTITY_ENABLED } = getConfig();
    if (!FEATURE_FILE_ENTITY_ENABLED) {
      const err = new Error('Page Not Found') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 404;
      throw err;
    }
    return { fileId: ctx.query.fileId };
  },
})(({ fileId, ...props }) => {
  const filters = sqonBuilder.has('object_id', fileId).build();

  // small query to ensure the fileId is valid and user has access
  const { loading, data } = useQuery<{
    file: { hits: { total: number } };
  }>(VALID_ENTITY_CHECK, {
    variables: {
      filters,
    },
  });
  const isValidEntity = !!get(data, 'file.hits.total', false);

  if (!loading && !isValidEntity) {
    const err = new Error('Page Not Found') as Error & { statusCode?: number };
    err[ERROR_STATUS_KEY] = 404;
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          {loading ? (
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <DnaLoader />
            </div>
          ) : (
            <FileEntityPage {...props} fileId={fileId} />
          )}
        </PageContent>
      </PageBody>

      <Footer />
    </PageContainer>
  );
});
