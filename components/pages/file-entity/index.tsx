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

import {
  PageContainer,
  PageBody,
  ContentHeader,
  PageContent,
  ContentBody,
} from '@icgc-argo/uikit/PageLayout';
import Head from '../head';
import NavBar from '../../NavBar';
import clsx from 'clsx';
import { FileTitleBar } from './FileTitleBar';
import FileCardsLayout from './FileCardsLayout';
import useEntityData from './useEntityData';
import Footer from '../../Footer';
import React from 'react';
import DnaLoader from '@icgc-argo/uikit/DnaLoader';
import useAuthContext from 'global/hooks/useAuthContext';
import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';
import USER_PROFILE from './USER_PROFILE.gql';
import { FileAccessState } from './types';
import { EmbargoStageDisplayNames } from './../file-repository/utils/constants';
import { getConfig } from 'global/config';

const FileEntity = ({ fileId }) => {
  const {
    programShortName,
    access,
    size,
    data,
    embargoStage,
    loading: fileLoading,
  } = useEntityData({
    fileId,
  });
  const { egoJwt } = useAuthContext();
  const { data: userProfile, loading: profileLoading } = useQuery(USER_PROFILE);
  const { MAX_FILE_DOWNLOAD_SIZE } = getConfig();

  const loading = profileLoading || fileLoading;

  const isDacoApproved = get(userProfile, 'self.isDacoApproved');

  const isUserLoggedIn = !!egoJwt;
  const isDownloadEnabled =
    size > MAX_FILE_DOWNLOAD_SIZE
      ? false
      : access === FileAccessState.CONTROLLED
      ? isUserLoggedIn && isDacoApproved
      : true;

  const accessTier = embargoStage !== 'PUBLIC' ? EmbargoStageDisplayNames[embargoStage] : null;
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
                <FileTitleBar
                  programShortName={programShortName}
                  fileId={fileId}
                  isDownloadEnabled={isDownloadEnabled}
                  accessTier={accessTier}
                  fileSize={size}
                  fileObjectId={data.summary.objectId}
                />
              </ContentHeader>

              <ContentBody>
                <FileCardsLayout fileData={data} />
              </ContentBody>
            </>
          )}
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default FileEntity;
