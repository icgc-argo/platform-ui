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

import styled from '@emotion/styled';
import DonorAggregationIndexTable from './DonorAggregationIndexTable';

import Typography from '@icgc-argo/uikit/Typography';
import Container from '@icgc-argo/uikit/Container';

// GQL Data Fetching
import { useQuery } from '@apollo/react-hooks';
import SIDE_MENU_PROGRAM_LIST from 'components/pages/submission-system/SIDE_MENU_PROGRAM_LIST.gql';

const Card = styled(Container)`
  padding: 16px;
`;

const DonorAggregationSummary = () => {
  const { loading, data } = useQuery(SIDE_MENU_PROGRAM_LIST);

  const programs = data ? data.programs : [];
  return (
    <Card>
      <Typography variant="default" component="span">
        Donor Aggregation Indices
      </Typography>

      <DonorAggregationIndexTable programs={programs} loading={loading} />
    </Card>
  );
};
export default DonorAggregationSummary;
