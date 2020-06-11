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

import { css } from 'uikit';
import Container from 'uikit/Container';
import { PaddedRow } from '../index';
import StatItem from './StatItem';
import STATS_BAR from './STATS_BAR.gql';
import useFiltersContext from '../hooks/useFiltersContext';
import { FileRepoFiltersType } from '../utils/types';
import { useQuery } from '@apollo/react-hooks';

type StatsBarQueryInput = {
  filters: FileRepoFiltersType;
};

type BucketAggregationData = {
  buckets: {
    key: string;
  }[];
};
type SumAggregationData = {
  stats: {
    sum: number;
  };
};

type StatsBarQueryResponseData = {
  file: {
    hits: {
      total: number;
    };
    aggregations: {
      donors__donor_id: BucketAggregationData;
      study_id: BucketAggregationData;
      file__size: SumAggregationData;
    };
  };
};

const StatsCard = () => {
  const { filters } = useFiltersContext();

  const { data, loading } = useQuery<StatsBarQueryResponseData, StatsBarQueryInput>(STATS_BAR, {
    variables: {
      filters,
    },
  });

  const filesCount = data ? data.file.hits.total : 0;
  const donorsCount = data ? data.file.aggregations.donors__donor_id.buckets.length : 0;
  const primarySites = 0;
  const programsCount = data ? data.file.aggregations.study_id.buckets.length : 0;
  const totalFileSize = data ? data.file.aggregations.file__size.stats.sum : 0;

  return (
    <Container
      css={css`
        margin-bottom: 16px;
      `}
    >
      <PaddedRow
        css={css`
          justify-content: space-around;
          position: relative;
        `}
      >
        <StatItem iconName="file" statType="file" count={filesCount} loading={loading} />
        <StatItem iconName="user" statType="donor" count={donorsCount} loading={loading} />
        <StatItem
          iconName="crosshairs"
          statType="primary site"
          count={primarySites}
          loading={loading}
        />
        <StatItem iconName="programs" statType="program" count={programsCount} loading={loading} />
        <StatItem iconName="filesize" statType="fileSize" count={totalFileSize} loading={loading} />
      </PaddedRow>
    </Container>
  );
};
export default StatsCard;
