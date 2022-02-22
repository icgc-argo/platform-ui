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

import { PageContainer, PageBody, ContentHeader, PageContent, ContentBody } from 'uikit/PageLayout';
import Head from '../head';
import NavBar from '../../NavBar';
import clsx from 'clsx';
import useEntityData from './useEntityData';
import Footer from '../../Footer';
import React from 'react';
import DnaLoader from 'uikit/DnaLoader';
import useAuthContext from 'global/hooks/useAuthContext';
import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';
import { DonorTitleBar } from './DonorTitleBar';
import DonorCardsLayout from './DonorCardsLayout';
import USER_PROFILE from '../file-entity/USER_PROFILE.gql';

import { dummyDonorEntity } from './dummyData';

const DonorEntity = ({ donorId }) => {
  // const { data: donorData, loading: donorLoading } = useEntityData({
  //   donorId,
  // });

  // TESTING
  const donorData = dummyDonorEntity;
  const donorLoading = false;

  const { egoJwt } = useAuthContext();
  const { data: userProfile, loading: profileLoading } = useQuery(USER_PROFILE);

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
                <DonorTitleBar data={donorData} isDownloadEnabled={isDownloadEnabled} />
              </ContentHeader>

              <ContentBody>
                <DonorCardsLayout data={donorData} />
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
