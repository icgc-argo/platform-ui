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

import React from 'react';
import FileTable from './FileTable';
import { PageContainer } from '@icgc-argo/uikit/PageLayout';
import NavBar from 'components/NavBar';
import Footer from '../../Footer';
import Head from '../head';
import { PageContent, PageBody, ContentBody } from '@icgc-argo/uikit/PageLayout';
import { Row, Col, setConfiguration } from 'react-grid-system';
import { styled } from '@icgc-argo/uikit';
import FacetPanel from './FacetPanel';
import DataTypesChart from './charts/DataTypesChart';
import ProgramBarChart from './charts/ProgramBarChart';
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

const RepositoryPage = () => {
  return (
    <FiltersProvider>
      <PageContainer>
        <Head subtitle={'File Repository'} />
        <NavBar />
        <PageBody sidebarColSize="280px">
          <FacetPanel />
          <PageContent>
            <ContentBody>
              <QueryBarContainer />
              <StatsCard />
              <PaddedRow justify="between">
                <PaddedColumn xl={6} lg={6} md={12}>
                  <DataTypesChart />
                </PaddedColumn>
                <PaddedColumn xl={6} lg={6} md={12}>
                  <ProgramBarChart />
                </PaddedColumn>
              </PaddedRow>
              <PaddedRow>
                <Col xl={12}>
                  <FileTable />
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
