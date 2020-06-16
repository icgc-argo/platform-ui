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
import { Col } from 'react-grid-system';

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

// TODO - type filters
export const useFileRepoStatsBarQuery = (filters?: FileRepoFiltersType) => {
  const hook = useQuery<StatsBarQueryResponseData, StatsBarQueryInput>(STATS_BAR, {
    variables: {
      filters,
    },
  });

  const stats = {
    filesCount: hook?.data ? hook.data.file.hits.total : 0,
    donorsCount: hook?.data ? hook.data.file.aggregations.donors__donor_id.buckets.length : 0,
    primarySites: 0,
    programsCount: hook?.data ? hook.data.file.aggregations.study_id.buckets.length : 0,
    totalFileSize: hook?.data ? hook.data.file.aggregations.file__size.stats.sum : 0,
  };

  return { ...hook, data: stats };
};

const StatsCard = () => {
  const { filters } = useFiltersContext();

  const { data, loading } = useFileRepoStatsBarQuery(filters);

  return (
    <Container
      css={css`
        margin-bottom: 16px;
      `}
    >
      <PaddedRow
        css={css`
          justify-content: space-around;
        `}
      >
        <Col md={3} sm={6}>
          <StatItem iconName="file" statType="file" count={data.filesCount} loading={loading} />
        </Col>
        <Col md={3} sm={6}>
          <StatItem iconName="user" statType="donor" count={data.donorsCount} loading={loading} />
        </Col>
        {/* <Col md={3} sm={6}></Col><StatItem
          iconName="crosshairs"
          statType="primary site"
          count={primarySites}
          loading={loading}
        /></Col> */}
        <Col md={3} sm={6}>
          <StatItem
            iconName="programs"
            statType="program"
            count={data.programsCount}
            loading={loading}
          />
        </Col>
        <Col md={3} sm={6}>
          <StatItem
            iconName="filesize"
            statType="fileSize"
            count={data.totalFileSize}
            loading={loading}
          />
        </Col>
      </PaddedRow>
    </Container>
  );
};
export default StatsCard;
