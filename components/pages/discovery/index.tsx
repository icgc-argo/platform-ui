/*
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  useApolloClient,
  useQuery,
} from '@apollo/client';
import { css, useTheme } from '@emotion/react';
import { styled, Typography } from '@icgc-argo/uikit';
import { ChartsProvider } from '@overture-stack/arranger-charts';
import { createUploadLink } from 'apollo-upload-client';

import {
  ArrangerDataProvider,
  SQONType,
  useArrangerData,
} from '@overture-stack/arranger-components';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import QueryBar from 'components/QueryBar';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import useQueryParam from 'global/hooks/useQueryParam';
import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { get } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { setConfiguration } from 'react-grid-system';
import urljoin from 'url-join';
import { Op, Value } from '../../SQONView';
import useFiltersContext, { FiltersProvider } from '../file-repository/hooks/useFiltersContext';
import Head from '../head';
import ChartsLayout from './Charts';
import { commonStyles } from './components/common';
import DISCOVERY_DATA_CENTERS_QUERY from './components/DISCOVERY_DATA_CENTERS_QUERY';
import DISCOVERY_LOCAL_STATS_QUERY from './components/DISCOVERY_LOCAL_STATS_QUERY';
import DISCOVERY_NETWORK_STATS_QUERY from './components/DISCOVERY_NETWORK_STATS_QUERY';
import { FacetsPanel } from './components/Facets';
import { FacetStateProvider } from './components/Facets/FacetStateProvider';
import Sidebar from './components/SideBar';
import StatsCard from './components/StatsCard';
import { discoveryFacets } from './data/facet';
import { Download } from './Download';
import FederatedDownloadMenu, { DiscoveryNode } from './FederatedDownloadMenu';
import { ArrangerV3 } from './useArrangerV3';

export { PaddedRow } from './components/common';
setConfiguration({ gutterWidth: 9 });

const REPOSITORIES_PARAM = 'repositories';

const useRepositoriesUrlParam = () => {
  return useQueryParam(REPOSITORIES_PARAM, [], {
    serialize: (repositories) => repositories.join(','),
    deserialize: (raw): string[] => raw.split(',').filter(Boolean),
  });
};

export const PageContainer = styled('div')`
  display: grid;
  grid-template-rows: 58px 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey_4};
`;

const { FEATURE_DISCOVERY_NETWORK_SEARCH, NETWORK_SEARCH_LOCAL_NODE_ID } = getConfig();

type DiscoveryQueryBarProps = {
  localNode: DiscoveryNode | undefined;
  externalNodes: DiscoveryNode[];
  nodesLoading: boolean;
  filesCount: number;
  donorsCount: number;
};

/**
 * Provides layout that includes the search filters view and download interactions.
 *
 * Filter data is read from the arranger context.
 *
 * Download menu state relies on props passed from the parent, since the node data
 * reuses fetched data shared with the discovery Stats Bar.
 */
const DiscoveryQueryBar = ({
  localNode,
  externalNodes,
  nodesLoading,
  filesCount,
  donorsCount,
}: DiscoveryQueryBarProps): React.ReactElement => {
  const { setSQON, networkNodesFilter, setNetworkNodesFilter } = useArrangerData();
  const [repositoriesFromUrl, setUrlRepositories] = useRepositoriesUrlParam();
  const initializedFromUrl = useRef(false);

  // On first run: seed filter state from URL. On subsequent runs: write filter state back to URL.
  useEffect(() => {
    if (!initializedFromUrl.current) {
      initializedFromUrl.current = true;
      setNetworkNodesFilter(repositoriesFromUrl);
      return;
    }
    setUrlRepositories(networkNodesFilter.length > 0 ? networkNodesFilter : undefined);
  }, [networkNodesFilter]);

  const repositoryFilterContent =
    networkNodesFilter.length > 0 ? (
      <div
        key="repositories"
        className="sqon-group"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Typography
          bold
          css={css`
            margin: 0px;
            margin-right: 0.3rem;
            text-transform: uppercase;
            font-size: 12px;
          `}
        >
          Repositories
        </Typography>
        <Op>{networkNodesFilter.length === 1 ? 'is' : 'in'}</Op>
        {networkNodesFilter.length > 1 && (
          <span className="sqon-value-group sqon-value-group-start">(</span>
        )}
        {networkNodesFilter.map((nodeId) => (
          <Value
            key={nodeId}
            className={networkNodesFilter.length === 1 ? 'sqon-value-single' : ''}
            onClick={() =>
              setNetworkNodesFilter((current) => current.filter((id) => id !== nodeId))
            }
          >
            {nodeId}
          </Value>
        ))}
        {networkNodesFilter.length > 1 && (
          <span className="sqon-value-group sqon-value-group-end">)</span>
        )}
      </div>
    ) : undefined;

  return (
    <div
      css={css([
        commonStyles.block,
        { display: 'flex', alignItems: 'center', marginBottom: '16px' },
      ])}
    >
      <QueryBar
        updateSQON={(newSQON) => {
          setSQON(toArrangerV3Filter(newSQON) as SQONType);
        }}
        text="Explore data by selecting filters."
        prefixContent={repositoryFilterContent}
        onClear={() => setNetworkNodesFilter([])}
      />
      {FEATURE_DISCOVERY_NETWORK_SEARCH ? (
        <FederatedDownloadMenu
          localNode={localNode}
          externalNodes={externalNodes}
          nodesLoading={nodesLoading}
          filesCount={filesCount}
          donorsCount={donorsCount}
        />
      ) : (
        <Download>Download</Download>
      )}
    </div>
  );
};

type DataCenter = {
  shortName: string;
  name: string;
  uiUrl: string;
};

type DiscoveryContentProps = {
  gatewayClient: ApolloClient<object>;
};

const DiscoveryContent = ({ gatewayClient }: DiscoveryContentProps): React.ReactElement => {
  const { filters } = useFiltersContext();
  const { networkNodesFilter } = useArrangerData();
  const statsQuery = FEATURE_DISCOVERY_NETWORK_SEARCH
    ? DISCOVERY_NETWORK_STATS_QUERY
    : DISCOVERY_LOCAL_STATS_QUERY;

  const { data: statsData, loading: statsLoading } = useQuery(statsQuery, {
    variables: {
      filters: toArrangerV3Filter(filters),
      nodesFilter: FEATURE_DISCOVERY_NETWORK_SEARCH ? networkNodesFilter : undefined,
    },
  });

  const { data: dataCentersData } = useQuery(DISCOVERY_DATA_CENTERS_QUERY, {
    client: gatewayClient,
    skip: !FEATURE_DISCOVERY_NETWORK_SEARCH,
  });
  const dataCenters: DataCenter[] = get(dataCentersData, 'programOptions.dataCenters', []);

  const rawNodes: DiscoveryNode[] = get(statsData, 'network.nodes', []);
  const localNode = rawNodes.find((node) => node.nodeId === NETWORK_SEARCH_LOCAL_NODE_ID);
  const externalNodes = rawNodes
    .filter((node) => node.nodeId !== NETWORK_SEARCH_LOCAL_NODE_ID)
    .map((node) => {
      const dataCenter = dataCenters.find((dc) => dc.shortName === node.nodeId);
      return { ...node, uiUrl: dataCenter?.uiUrl };
    });

  const filesCount: number = get(
    statsData,
    'network.aggregations.analyses__files__file_id.cardinality',
    0,
  );
  const donorsCount: number = get(statsData, 'network.aggregations.donor_id.cardinality', 0);

  return (
    <>
      <DiscoveryQueryBar
        localNode={localNode}
        externalNodes={externalNodes}
        nodesLoading={statsLoading}
        filesCount={filesCount}
        donorsCount={donorsCount}
      />
      <StatsCard data={statsData} loading={statsLoading} />
      <ChartsLayout />
    </>
  );
};

const { GATEWAY_API_ROOT } = getConfig();
const DISCOVERY_API = urljoin(GATEWAY_API_ROOT, 'discovery');
const DiscoveryPage = () => {
  const theme = useTheme();
  const [isSidebarOpen, setSetbarView] = useState(true);
  const gatewayApolloClient = useApolloClient();

  /**
   * Query donor-centric Arranger instance gateway endpoint for this page
   */
  const { fetchWithEgoToken } = useAuthContext();
  const arrangerV3client = useMemo(() => {
    const uploadLink = createUploadLink({
      uri: DISCOVERY_API,
      fetch: fetchWithEgoToken,
    });
    return new ApolloClient({
      link: ApolloLink.from([uploadLink]),
      connectToDevTools: true,
      cache: new InMemoryCache(),
    });
  }, [fetchWithEgoToken]);

  const arrangerFetchWithEgoToken = useCallback(
    async (args) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...args.body }),
      };
      try {
        const response = await fetchWithEgoToken(DISCOVERY_API, options);
        return response.json();
      } catch (error) {
        console.log('Arranger Charts error', error);
      }
    },
    [fetchWithEgoToken, DISCOVERY_API],
  );

  return (
    <ArrangerV3 enabled>
      <ArrangerDataProvider
        documentType="file"
        apiUrl={DISCOVERY_API}
        customFetcher={arrangerFetchWithEgoToken}
      >
        <ChartsProvider>
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
                          ? '280px minmax(0, 1fr)'
                          : '24px minmax(0, 1fr)',
                        gridTemplateRows: 'calc(100vh - 116px)',
                        minHeight: 0,
                        overflow: 'hidden',
                      })}
                    >
                      <Sidebar toggle={() => setSetbarView((view) => !view)} open={isSidebarOpen}>
                        <FacetsPanel />
                      </Sidebar>

                      <div css={css({ overflowY: 'auto', padding: '18px 25px 10px 25px' })}>
                        <DiscoveryContent gatewayClient={gatewayApolloClient} />
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
    </ArrangerV3>
  );
};

export default DiscoveryPage;
