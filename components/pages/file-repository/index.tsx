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

import React from 'react';
import FileTable from './FileTable';
import { PageContainer } from 'uikit/PageLayout';
import NavBar from 'components/NavBar';
import Footer from '../../Footer';
import Head from '../head';
import { PageContent, PageBody, ContentBody } from 'uikit/PageLayout';
import { Row, Col, setConfiguration } from 'react-grid-system';
import { styled } from 'uikit';
import { dummyData } from 'components/pages/file-repository/FileTable/dummyData';
import useAuthContext from 'global/hooks/useAuthContext';
import FacetPanel from './FacetPanel';
import FileBarChart from './FileBarChart';
import PrimarySiteBarChart from './PrimarySiteBarChart';
import ProgramBarChart from './ProgramBarChart';
import StatsCard from './StatsCard';

import { FiltersProvider } from './hooks/useFiltersContext';
import QueryBarContainer from './QueryBar/QueryBarContainer';

export const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

const RepositoryPage = ({ subtitle }: { subtitle?: string }) => {
  const { token } = useAuthContext();

  return (
    <FiltersProvider>
      <PageContainer>
        <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
        <NavBar />
        <PageBody sidebarColSize="250px">
          <FacetPanel />
          <PageContent>
            <ContentBody>
              <QueryBarContainer />
              <StatsCard />
              <PaddedRow justify="between">
                <PaddedColumn xl={4} lg={6} md={12}>
                  <FileBarChart />
                </PaddedColumn>
                <PaddedColumn xl={4} lg={6} md={12}>
                  <PrimarySiteBarChart />
                </PaddedColumn>
                <PaddedColumn xl={4} lg={6} md={12}>
                  <ProgramBarChart />
                </PaddedColumn>
              </PaddedRow>
              <PaddedRow>
                <Col xl={12}>
                  <FileTable fileRepoEntries={dummyData} userLoggedIn={!!token} />
                </Col>
              </PaddedRow>
            </ContentBody>
            <Footer />
          </PageContent>
        </PageBody>
      </PageContainer>
    </FiltersProvider>
  );
};

export default RepositoryPage;
