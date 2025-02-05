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

import { css, PageContainer, styled } from '@icgc-argo/uikit';
import NavBar from 'components/NavBar';
import { Row, setConfiguration } from 'react-grid-system';
import Head from '../head';

import Card from './components/Card';
import { donorData } from './data';
import BarChart, { createBarConfig } from './components/api/BarChart';

const programIDBarChart = createBarConfig({ data: donorData, indexBy: 'site', keys: ['donors'] });

export const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

const ChartContainer = ({ children }) => (
  <div
    css={css({
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridAutoRows: '175px',
      gap: '10px',

      padding: '5px',

      '> div': {
        minWidth: '255px',
      },
    })}
  >
    {children}
  </div>
);

const DiscoveryPage = () => {
  return (
    <PageContainer>
      <Head subtitle={'Data Discovery'} />
      <NavBar />
      <ChartContainer>
        <Card title="Program ID" css={css({ gridColumnStart: 1, gridRowEnd: 'span 2' })}>
          <BarChart config={programIDBarChart} />
        </Card>

        <Card title="RDPC Node" css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}>
          <BarChart config={programIDBarChart} />
        </Card>

        <Card title="Track Embargo State" css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}>
          <BarChart config={programIDBarChart} />
        </Card>

        <Card
          title="Cancer Type and Code"
          css={css({
            gridColumnStart: 3,
            gridColumnEnd: 5,
            gridRowStart: 1,
            gridRowEnd: 3,
          })}
        >
          <BarChart config={programIDBarChart} />
        </Card>

        <Card
          title="Primary Site"
          css={css({
            gridColumnStart: 1,
            gridColumnEnd: 3,
            gridRowStart: 3,
            gridRowEnd: 5,
          })}
        >
          <BarChart config={programIDBarChart} />
        </Card>

        <Card title="Age at Diagnosis">
          <BarChart config={programIDBarChart} />
        </Card>
        <Card title="Gender">
          <BarChart config={programIDBarChart} />
        </Card>
        <Card title="Vital Status">
          <BarChart config={programIDBarChart} />
        </Card>
        <Card title="Experimental Strategy">
          <BarChart config={programIDBarChart} />
        </Card>
      </ChartContainer>
    </PageContainer>
  );
};

export default DiscoveryPage;
