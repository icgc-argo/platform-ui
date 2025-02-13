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

import { css, styled, useTheme } from '@icgc-argo/uikit';
import NavBar from 'components/NavBar';
import { Row, setConfiguration } from 'react-grid-system';
import Head from '../head';

import Footer from 'components/Footer';
import { useState } from 'react';
import QueryBarContainer from '../file-repository/QueryBar/QueryBarContainer';
import Charts from './Charts';
import { commonStyles } from './components/common';
import Sidebar from './components/SideBar';
import StatsCard from './components/StatsCard';

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

const DiscoveryPage = () => {
  const theme = useTheme();

  const [isSidebarOpen, setSetbarView] = useState(true);
  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateRows: '58px 1fr 58px',
        height: '100vh',
        background: `${theme.colors.grey_4}`,
      })}
    >
      <div>
        <Head subtitle={'Data Discovery'} />
        <NavBar />
      </div>
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: isSidebarOpen ? '248px 1fr' : '20px 1fr',
          gridTemplateRows: 'calc(100vh - 116px)',
          minHeight: 0,
          overflow: 'hidden',
        })}
      >
        <Sidebar toggle={() => setSetbarView((view) => !view)} open={isSidebarOpen} />
        <div css={css({ overflow: 'scroll', margin: '18px 25px 10px 25px' })}>
          <QueryBarContainer
            text="Explore data by selecting filters."
            css={css([commonStyles.block, { boxShadow: 'none' }])}
          />
          <StatsCard
            data={{ donors: 3, files: 1, programs: 88, repositories: 2 }}
            isLoading={false}
          />
          <Charts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscoveryPage;
