/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { Icon, Typography, useTheme } from '@icgc-argo/uikit';
import useFiltersContext from 'components/pages/file-repository/hooks/useFiltersContext';
import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { get } from 'lodash';
import { Col } from 'react-grid-system';
import { PaddedRow } from '..';
import { commonStyles } from './common';

const StatItem = ({ iconName, value }) => {
  const theme = useTheme();

  return (
    <Typography
      css={css`
        font-size: 14px;
        margin: 0.8rem 0 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.colors.primary};
      `}
    >
      <Icon
        css={css`
          padding-right: 0.3em;
        `}
        fill={theme.colors.primary_1}
        name={iconName}
      />
      {value}
    </Typography>
  );
};

const StatsCardComp = ({ files, donors, programs, repositories, isLoading }) => {
  const theme = useTheme();

  return (
    <div
      css={css([
        commonStyles.block,
        {
          padding: '8px 0',
          marginBottom: '16px',
        },
      ])}
    >
      <PaddedRow
        css={css`
          justify-content: space-around;
        `}
      >
        {isLoading ? (
          <div css={css({ display: 'flex', flex: 1, justifyContent: 'center' })}>
            <Icon name={'spinner'} fill={theme.colors.grey} />
          </div>
        ) : (
          <>
            <Col md={3} sm={6}>
              <StatItem iconName="file" value={files} />
            </Col>
            <Col md={3} sm={6}>
              <StatItem iconName="user" value={donors} />
            </Col>

            <Col md={3} sm={6}>
              <StatItem iconName="programs" value={programs} />
            </Col>
            <Col md={3} sm={6}>
              <StatItem iconName="filesize" value={repositories} />
            </Col>
          </>
        )}
      </PaddedRow>
    </div>
  );
};

const MAX_ES_PRECISION_THRESHOLD = 40000;

const STATS_QUERY = gql`
  query DiscoveryStats($filters: JSON) {
    file {
      aggregations(filters: $filters, include_missing: true, aggregations_filter_themselves: true) {
        analyses__files__file_id {
          cardinality(precision_threshold: ${MAX_ES_PRECISION_THRESHOLD})
        }
        donor_id {
          cardinality(precision_threshold: ${MAX_ES_PRECISION_THRESHOLD})
        }
        study_id {
          cardinality(precision_threshold: ${MAX_ES_PRECISION_THRESHOLD})
        }
      }
    }
  }
`;

const formatCardinality = (
  value: number,
  threshold: number,
): { value: number; formattedValue: string } => {
  if (value > threshold) {
    const ROUND_TO = 1000;
    const roundedValue = Math.round(value / ROUND_TO) * ROUND_TO;
    return {
      value: roundedValue,
      formattedValue: roundedValue > 0 ? `~ ${roundedValue}` : `${roundedValue}`,
    };
  } else {
    return {
      value,
      formattedValue: `${value}`,
    };
  }
};

const StatsCard = () => {
  const { filters } = useFiltersContext();
  const { data: statsCardResponse, loading: isLoading } = useQuery(STATS_QUERY, {
    variables: { filters: toArrangerV3Filter(filters) },
  });

  // data from GQL response
  const filesData = get(
    statsCardResponse,
    'file.aggregations.analyses__files__file_id.cardinality',
    0,
  );
  const donorsData = get(statsCardResponse, 'file.aggregations.donor_id.cardinality', 0);
  const programsData = get(statsCardResponse, 'file.aggregations.study_id.cardinality', 0);
  const repositoriesData = 1;

  // files
  const { value: filesCount, formattedValue: filesCountDisplay } = formatCardinality(
    filesData,
    MAX_ES_PRECISION_THRESHOLD,
  );
  const files = `${filesCountDisplay} File${filesCount === 1 ? '' : 's'}`;

  // donors
  const { value: donorsCount, formattedValue: donorsCountDisplay } = formatCardinality(
    donorsData,
    MAX_ES_PRECISION_THRESHOLD,
  );
  const donors = `${donorsCountDisplay} Donor${donorsCount === 1 ? '' : 's'}`;

  // programs
  const { value: programsCount, formattedValue: programsCountDisplay } = formatCardinality(
    programsData,
    MAX_ES_PRECISION_THRESHOLD,
  );
  const programs = `${programsCountDisplay} Program${programsCount === 1 ? '' : 's'}`;

  // repositories
  const repositories = `${repositoriesData} ${
    repositoriesData === 1 ? 'Repository' : 'Repositories'
  }`;

  return <StatsCardComp {...{ files, donors, programs, repositories, isLoading }} />;
};

export default StatsCard;
