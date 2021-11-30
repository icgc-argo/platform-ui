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

import { storiesOf } from '@storybook/react';
import React from 'react';

import {
  dummyAssociatedDonorsInfo,
  dummyDataAnalysisInfo,
  dummyFileRecords,
  dummyFileSummaryInfo,
} from './dummyData';
import clsx from 'clsx';
import Head from '../head';
import DnaLoader from '@icgc-argo/uikit/DnaLoader';
import Footer from '@icgc-argo/uikit/Footer';
import {
  PageContainer,
  PageBody,
  PageContent,
  ContentHeader,
  ContentBody,
} from '@icgc-argo/uikit/PageLayout';
import FileCardsLayout from './FileCardsLayout';
import { FileTitleBar } from './FileTitleBar';
import NavBar from '../../NavBar';

const FileRepositoryTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const loading = false;
  const data = {
    summary: dummyFileSummaryInfo,
    dataAnalysis: dummyDataAnalysisInfo,
    donorRecords: dummyAssociatedDonorsInfo,
    fileRecords: dummyFileRecords,
  };

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
                <FileTitleBar programShortName={'TEST-CA'} fileId="123" isDownloadEnabled={true} />
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
});

export default FileRepositoryTableStories;
