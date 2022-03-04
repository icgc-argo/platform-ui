/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
import DonorEntityPage from 'components/pages/donor-entity';
import ErrorPage, { ERROR_STATUS_KEY } from 'pages/_error';
import { getConfig } from 'global/config';
import { usePageQuery } from 'global/hooks/usePageContext';
import sqonBuilder from 'sqon-builder';
import { useQuery } from '@apollo/react-hooks';
import VALID_DONOR_ENTITY_CHECK from './VALID_DONOR_ENTITY_CHECK.gql';
import get from 'lodash/get';
import { useGlobalLoadingState } from 'components/ApplicationRoot';
import useEntityData from 'components/pages/donor-entity/useEntityData';
import { instructionBoxLoadingButtonStyle } from 'components/pages/submission-system/common';

export default createPage({
  isPublic: true,
  isAccessible: async ({ initialPermissions }) => true,
  getInitialProps: async () => {
    const { FEATURE_DONOR_ENTITY_ENABLED } = getConfig();
    if (!FEATURE_DONOR_ENTITY_ENABLED) {
      const err = new Error('Page Not Found') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 404;
      throw err;
    }
  },
})((props) => {
  const { donorId } = usePageQuery<{ donorId: string }>();
  const filters = sqonBuilder.has('donor_id', donorId).build();

  // small query to ensure the donorId is valid
  const { loading: profileLoading, data: profile } = useQuery<{
    donor: { hits: { total: number } };
  }>(VALID_DONOR_ENTITY_CHECK, {
    variables: {
      filters,
    },
  });

  // TODO: Remove Test Values
  const { data: donor, loading: donorLoading } = useEntityData(donorId);
  // const isValidEntity = !!get(profile, 'file.hits.total', false);
  const isValidEntity = true;

  const { setLoading: setLoaderShown, isLoading: isLoaderShown } = useGlobalLoadingState();
  const loading = donorLoading || profileLoading;

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

  return <DonorEntityPage {...props} donor={donor} />;
});
