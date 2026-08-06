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

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { Button, PageContainer, styled, Typography, useTheme } from '@icgc-argo/uikit';
import { ArrangerDataProvider } from '@overture-stack/arranger-components';
import { createUploadLink } from 'apollo-upload-client';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import urlJoin from 'url-join';

import DISCOVERY_NETWORK_STATS_QUERY from 'components/pages/discovery/components/DISCOVERY_NETWORK_STATS_QUERY';
import useFiltersContext, {
  FiltersProvider,
} from 'components/pages/file-repository/hooks/useFiltersContext';
import { getConfig } from 'global/config';
import useAuthContext from 'global/hooks/useAuthContext';
import useQueryParam from 'global/hooks/useQueryParam';
import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { createRedirectURL } from 'global/utils/common';
import { hasDacoAccess } from 'global/utils/egoJwt';
import { get } from 'lodash';
import LocalNodeDownload from '../LocalNodeDownload';
import { ArrangerV3 } from '../useArrangerV3';

const { GATEWAY_API_ROOT, EGO_URL, NETWORK_SEARCH_LOCAL_NODE_ID } = getConfig();
const DISCOVERY_API = urlJoin(GATEWAY_API_ROOT, 'discovery');

const ThreeRowPage = styled(PageContainer)`
  grid-template-rows: 58px 1fr 59px;
`;

const CardContainer = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const theme = useTheme();
  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.grey_4,
        padding: '32px 16px',
      })}
    >
      <div
        css={css({
          background: theme.colors.white,
          borderRadius: '8px',
          padding: '40px 48px',
          maxWidth: '720px',
          width: '100%',
          boxShadow: '0 1px 6px 0 rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.08)',
        })}
      >
        {children}
      </div>
    </div>
  );
};

const LoginPrompt = (): React.ReactElement => {
  const [loginPath, setLoginPath] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentQuery = window.location.search.slice(1);
    const redirectFragment = createRedirectURL({
      origin: window.location.origin,
      path: currentPath,
      query: currentQuery,
    });
    setLoginPath(urlJoin(EGO_URL, redirectFragment));
  }, []);

  return (
    <CardContainer>
      <Typography variant="title" css={css({ marginBottom: '12px' })}>
        Login to view this page.
      </Typography>
      <Typography css={css({ marginBottom: '32px' })}>
        To continue with your download please login.
      </Typography>
      <div css={css({ display: 'flex', justifyContent: 'flex-end' })}>
        <a href={loginPath} css={css({ textDecoration: 'none' })}>
          <Button variant="primary">LOGIN</Button>
        </a>
      </div>
    </CardContainer>
  );
};

const NotAuthorizedCard = (): React.ReactElement => {
  return (
    <CardContainer>
      <Typography variant="title" css={css({ marginBottom: '12px' })}>
        Not Authorized
      </Typography>
      <Typography css={css({ marginBottom: '32px' })}>
        You do not have permission to view this page. Please try again later or contact your admin.
      </Typography>
      <div css={css({ display: 'flex', justifyContent: 'flex-end' })}>
        <NextLink href="/" passHref legacyBehavior>
          <a css={css({ textDecoration: 'none' })}>
            <Button variant="primary">HOMEPAGE</Button>
          </a>
        </NextLink>
      </div>
    </CardContainer>
  );
};

type DownloadContentProps = {
  originNodeId: string | undefined;
};

const DownloadContent = ({ originNodeId }: DownloadContentProps): React.ReactElement => {
  const theme = useTheme();
  const { filters } = useFiltersContext();

  const { data: statsData, loading: statsLoading } = useQuery(DISCOVERY_NETWORK_STATS_QUERY, {
    variables: {
      filters: toArrangerV3Filter(filters),
      nodesFilter: NETWORK_SEARCH_LOCAL_NODE_ID ? [NETWORK_SEARCH_LOCAL_NODE_ID] : undefined,
    },
  });

  const nodes: { nodeId: string; name: string }[] = get(statsData, 'network.nodes', []);
  const localNodeName =
    nodes.find((node) => node.nodeId === NETWORK_SEARCH_LOCAL_NODE_ID)?.name ??
    NETWORK_SEARCH_LOCAL_NODE_ID;
  const originNodeName = originNodeId
    ? nodes.find((node) => node.nodeId === originNodeId)?.name
    : undefined;

  const filesCount: number = get(
    statsData,
    'network.aggregations.analyses__files__file_id.cardinality',
    0,
  );
  const donorsCount: number = get(statsData, 'network.aggregations.donor_id.cardinality', 0);

  return (
    <CardContainer>
      <Typography variant="title" css={css({ marginBottom: '8px' })}>
        Download Data from {localNodeName} Node
      </Typography>
      {originNodeName && (
        <Typography
          css={css({
            marginBottom: '24px',
            color: theme.colors.grey,
          })}
        >
          You're downloading files from the {localNodeName} data centre portal. To manage your query
          please go back to the {originNodeName} node.
        </Typography>
      )}
      <LocalNodeDownload
        filesCount={filesCount}
        donorsCount={donorsCount}
        statsLoading={statsLoading}
      />
    </CardContainer>
  );
};

type DownloadPageContentProps = {
  originNodeId: string | undefined;
};

const DownloadPageContent = ({ originNodeId }: DownloadPageContentProps): React.ReactElement => {
  const { egoJwt, permissions } = useAuthContext();

  if (!egoJwt) {
    return <LoginPrompt />;
  }

  if (!hasDacoAccess(permissions)) {
    return <NotAuthorizedCard />;
  }

  return <DownloadContent originNodeId={originNodeId} />;
};

const DownloadPage = (): React.ReactElement => {
  const { fetchWithEgoToken } = useAuthContext();
  const [originNodeId] = useQueryParam<string | undefined>('originNode', undefined, {
    serialize: (value) => value ?? '',
    deserialize: (raw) => (raw.length > 0 ? raw : undefined),
  });

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
        console.log('Arranger fetch error', error);
      }
    },
    [fetchWithEgoToken],
  );

  return (
    <ThreeRowPage>
      <NavBar />
      <ArrangerV3 enabled>
        <ArrangerDataProvider
          documentType="file"
          apiUrl={DISCOVERY_API}
          customFetcher={arrangerFetchWithEgoToken}
        >
          <ApolloProvider client={arrangerV3client}>
            <FiltersProvider>
              <DownloadPageContent originNodeId={originNodeId} />
            </FiltersProvider>
          </ApolloProvider>
        </ArrangerDataProvider>
      </ArrangerV3>
      <Footer />
    </ThreeRowPage>
  );
};

export default DownloadPage;
