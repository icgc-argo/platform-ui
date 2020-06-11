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

import Typography from 'uikit/Typography';
import { DashboardCard, POLL_INTERVAL_MILLISECONDS } from '../common';
import DonorSummaryTable from './DonorSummaryTable';
import { usePageQuery } from 'global/hooks/usePageContext';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import PROGRAM_DONOR_SUMMARY_QUERY from './gql/PROGRAM_DONOR_SUMMARY_QUERY.gql';
import {
  ProgramDonorsSummaryQueryData,
  ProgramDonorsSummaryQueryVariables,
  DonorSummaryEntrySort,
  DonorSummaryEntrySortField,
  DonorSummaryEntrySortOrder,
} from './types';
import EmptyDonorSummaryState from './EmptyDonorSummaryTable';
import { useTimeout } from './common';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import DownloadButtons from './DownloadButtons';

export const useProgramDonorsSummaryQuery = (
  programShortName: string,
  first: number,
  offset: number,
  sorts: DonorSummaryEntrySort[],
  options: Omit<
    QueryHookOptions<ProgramDonorsSummaryQueryData, ProgramDonorsSummaryQueryVariables>,
    'variables'
  > = {},
) => {
  const pollingTimeout = useTimeout(30000);
  const hook = useQuery<ProgramDonorsSummaryQueryData, ProgramDonorsSummaryQueryVariables>(
    PROGRAM_DONOR_SUMMARY_QUERY,
    {
      ...options,
      variables: {
        programShortName,
        first,
        offset,
        sorts,
      },
      pollInterval: !pollingTimeout ? POLL_INTERVAL_MILLISECONDS : 0,
    },
  );
  return {
    ...hook,
    data: hook.data,
  };
};

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const DEFAULT_PAGE_SIZE = 20;
  const DEFAULT_SORTS = [
    {
      field: 'updatedAt' as DonorSummaryEntrySortField,
      order: 'desc' as DonorSummaryEntrySortOrder,
    },
  ];
  const DEFAULT_OFFSET = 0;

  // using the default query variables will get us all registered donors
  const {
    data: { programDonorSummaryStats = undefined } = {},
    loading: isCardLoading = true,
  } = useProgramDonorsSummaryQuery(
    programShortName,
    DEFAULT_PAGE_SIZE,
    DEFAULT_OFFSET,
    DEFAULT_SORTS,
  );
  const initialPages = !isCardLoading
    ? Math.ceil(programDonorSummaryStats.registeredDonorsCount / DEFAULT_PAGE_SIZE)
    : 1;

  const isDonorSummaryEntriesEmpty =
    !programDonorSummaryStats || programDonorSummaryStats.registeredDonorsCount === 0;

  const CardTitle = () => (
    <Typography variant="default" component="span">
      Donor Data Summary
    </Typography>
  );

  return !isCardLoading && isDonorSummaryEntriesEmpty ? (
    <DashboardCard>
      <CardTitle />
      <EmptyDonorSummaryState />
    </DashboardCard>
  ) : (
    <DashboardCard>
      <Row>
        <Col md={3.5} sm={12}>
          <CardTitle />
        </Col>
        <Col
          md={8.5}
          sm={12}
          css={css`
            display: flex;
            align-self: center;
            justify-content: flex-end;
          `}
        >
          <DownloadButtons />
        </Col>
      </Row>
      <DonorSummaryTable
        programShortName={programShortName}
        initialPages={initialPages}
        initialPageSize={DEFAULT_PAGE_SIZE}
        initialSorts={DEFAULT_SORTS}
        isCardLoading={isCardLoading}
      />
    </DashboardCard>
  );
};
