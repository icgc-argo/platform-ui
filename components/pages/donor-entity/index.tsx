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

import { useQuery } from '@apollo/client';
import {
  ContentBody,
  ContentHeader,
  DnaLoader,
  PageBody,
  PageContainer,
  PageContent,
} from '@icgc-argo/uikit';
import clsx from 'clsx';
import USER_PROFILE_QUERY from 'global/gql/USER_PROFILE_QUERY';
import useAuthContext from 'global/hooks/useAuthContext';
import { get } from 'lodash';
import Footer from '../../Footer';
import NavBar from '../../NavBar';
import Head from '../head';
import DonorCardsLayout from './DonorCardsLayout';
import { DonorTitleBar } from './DonorTitleBar';

const DonorEntity = ({ donor }) => {
  const { egoJwt } = useAuthContext();
  const { data: userProfile, loading: profileLoading } = useQuery(USER_PROFILE_QUERY);
  const {
    loading: donorLoading,
    summary: { program_id, donor_id },
  } = donor;

  const loading = profileLoading || donorLoading;

  const isDacoApproved = get(userProfile, 'self.isDacoApproved');
  const isUserLoggedIn = !!egoJwt;
  const isDownloadEnabled = isUserLoggedIn && isDacoApproved;

  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
              }}
            >
              <DnaLoader />
            </div>
          ) : (
            <>
              <ContentHeader>
                <DonorTitleBar
                  programId={program_id}
                  donorId={donor_id}
                  isDownloadEnabled={isDownloadEnabled}
                />
              </ContentHeader>

              <ContentBody>
                <DonorCardsLayout donorData={donor} />
              </ContentBody>
            </>
          )}
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default DonorEntity;
