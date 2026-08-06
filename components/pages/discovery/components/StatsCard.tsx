/*
 *
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

import { css } from '@emotion/react';
import { Icon, Typography, useTheme } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { get } from 'lodash';
import { Col } from 'react-grid-system';
import { commonStyles, PaddedRow } from './common';
import { ES_CARDINALITY_MAX_PRECISION_THRESHOLD } from './Facets/facetsQueryProps';

const ROUND_TO = 1000;

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

const formatCardinality = (value: number): { value: number; formattedValue: string } => {
  if (value > ES_CARDINALITY_MAX_PRECISION_THRESHOLD) {
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

type StatsCardData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
};

const StatsCard = ({ data: statsCardResponse, loading: isLoading }: StatsCardData): React.ReactElement => {
  const { FEATURE_DISCOVERY_NETWORK_SEARCH: useNetworkSearch } = getConfig();

  const responseRoot = useNetworkSearch ? 'network' : 'file';

  const filesData = get(
    statsCardResponse,
    `${responseRoot}.aggregations.analyses__files__file_id.cardinality`,
    0,
  );
  const donorsData = get(statsCardResponse, `${responseRoot}.aggregations.donor_id.cardinality`, 0);
  const programsData = useNetworkSearch
    ? get(statsCardResponse, 'network.aggregations.study_id.bucket_count', 0)
    : get(statsCardResponse, 'file.aggregations.study_id.cardinality', 0);
  const repositoriesData = useNetworkSearch ? get(statsCardResponse, 'network.nodes.length', 1) : 1;

  const { value: filesCount, formattedValue: filesCountDisplay } = formatCardinality(filesData);
  const files = `${filesCountDisplay} File${filesCount === 1 ? '' : 's'}`;

  const { value: donorsCount, formattedValue: donorsCountDisplay } = formatCardinality(donorsData);
  const donors = `${donorsCountDisplay} Donor${donorsCount === 1 ? '' : 's'}`;

  const { value: programsCount, formattedValue: programsCountDisplay } =
    formatCardinality(programsData);
  const programs = `${programsCountDisplay} Program${programsCount === 1 ? '' : 's'}`;

  const repositories = `${repositoriesData} ${
    repositoriesData === 1 ? 'Repository' : 'Repositories'
  }`;

  return <StatsCardComp {...{ files, donors, programs, repositories, isLoading }} />;
};

export default StatsCard;
