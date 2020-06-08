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

  const CardTtile = () => (
    <Typography variant="default" component="span">
      Donor Data Summary
    </Typography>
  );

  return !isCardLoading && isDonorSummaryEntriesEmpty ? (
    <DashboardCard>
      <CardTtile />
      <EmptyDonorSummaryState />
    </DashboardCard>
  ) : (
    <DashboardCard>
      <Row>
        <Col md={3.5} sm={12}>
          <CardTtile />
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
