/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';
import { css, useTheme } from '@emotion/react';
import { styled } from '@icgc-argo/uikit';
import { ChartsProvider } from '@overture-stack/arranger-charts';
import { createUploadLink } from 'apollo-upload-client';

import {
  ArrangerDataProvider,
  SQONType,
  useArrangerData,
} from '@overture-stack/arranger-components';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { useCallback, useMemo, useState } from 'react';
import { Row, setConfiguration } from 'react-grid-system';
import urljoin from 'url-join';
import { FiltersProvider } from '../file-repository/hooks/useFiltersContext';
import QueryBarContainer from '../file-repository/QueryBar/QueryBarContainer';
import Head from '../head';
import ChartsLayout from './Charts';
import { commonStyles } from './components/common';
import { FacetsPanel } from './components/Facets';
import { FacetStateProvider } from './components/Facets/FacetStateProvider';
import Sidebar from './components/SideBar';
import StatsCard from './components/StatsCard';
import { discoveryFacets } from './data/facet';

export const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

export const PageContainer = styled('div')`
  display: grid;
  grid-template-rows: 58px 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey_4};
`;

const DiscoveryQueryBar = () => {
  const { setSQON } = useArrangerData();
  return (
    <QueryBarContainer
      updateSQON={(newSQON) => {
        setSQON(toArrangerV3Filter(newSQON) as SQONType);
      }}
      text="Explore data by selecting filters."
      css={css([commonStyles.block, { boxShadow: 'none' }])}
    />
  );
};

const DiscoveryPage = () => {
  const theme = useTheme();
  const [isSidebarOpen, setSetbarView] = useState(true);

  /**
   * Query donor-centric Arranger instance gateway endpoint for this page
   */
  const { GATEWAY_API_ROOT } = getConfig();
  const { fetchWithEgoToken } = useAuthContext();
  const arrangerV3client = useMemo(() => {
    const uploadLink = createUploadLink({
      uri: urljoin(GATEWAY_API_ROOT, 'discovery'),
      fetch: fetchWithEgoToken,
    });
    return new ApolloClient({
      link: ApolloLink.from([uploadLink]),
      connectToDevTools: true,
      cache: new InMemoryCache(),
    });
  }, [fetchWithEgoToken]);

  // proxies to Arranger with /graphql
  const discoveryApiUrl = urljoin(GATEWAY_API_ROOT, 'discovery');

  const arrangerFetchWithEgoToken = useCallback(
    async (args) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...args.body }),
      };
      try {
        const response = await fetchWithEgoToken(discoveryApiUrl, options);
        return response.json();
      } catch (error) {
        console.log('Arranger Charts error', error);
      }
    },
    [fetchWithEgoToken, discoveryApiUrl],
  );

  return (
    <ArrangerDataProvider
      documentType="file"
      apiUrl={discoveryApiUrl}
      customFetcher={arrangerFetchWithEgoToken}
    >
      <ChartsProvider
        theme={{
          dataFetcher: arrangerFetchWithEgoToken,
        }}
      >
        <FacetStateProvider staticFacetOptions={discoveryFacets}>
          <ApolloProvider client={arrangerV3client}>
            <FiltersProvider>
              <div
                css={css({
                  display: 'grid',
                  gridTemplateRows: '58px 1fr 58px',
                  minHeight: '100vh',
                  background: `${theme.colors.grey_4}`,
                  overflow: 'hidden',
                })}
              >
                <>
                  <Head subtitle={'Data Discovery'} />
                  <NavBar />

                  <div
                    css={css({
                      display: 'grid',
                      gridTemplateColumns: isSidebarOpen
                        ? '248px minmax(0, 1fr)'
                        : '20px minmax(0, 1fr)',
                      gridTemplateRows: 'calc(100vh - 116px)',
                      minHeight: 0,
                      overflow: 'hidden',
                    })}
                  >
                    <Sidebar toggle={() => setSetbarView((view) => !view)} open={isSidebarOpen}>
                      <FacetsPanel />
                    </Sidebar>

                    <div css={css({ overflowY: 'auto', padding: '18px 25px 10px 25px' })}>
                      <DiscoveryQueryBar />
                      <StatsCard />
                      <ChartsLayout />
                    </div>
                  </div>

                  <Footer />
                </>
              </div>
            </FiltersProvider>
          </ApolloProvider>
        </FacetStateProvider>
      </ChartsProvider>
    </ArrangerDataProvider>
  );
};

export default DiscoveryPage;
