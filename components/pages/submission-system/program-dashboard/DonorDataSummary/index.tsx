import Typography from 'uikit/Typography';
import { DashboardCard, POLL_INTERVAL_MILLISECONDS } from '../common';
import DonorSummaryTable from './DonorSummaryTable';
import { usePageQuery } from 'global/hooks/usePageContext';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import PROGRAM_DONOR_SUMMARY_QUERY from './gql/PROGRAM_DONOR_SUMMARY_QUERY.gql';
import PROGRAM_DONOR_SUMMARY_STATS_QUERY from './gql/PROGRAM_DONOR_SUMMARY_STATS_QUERY.gql';
import {
  ProgramDonorsSummaryQueryData,
  ProgramDonorsSummaryQueryVariables,
  DonorSummaryEntrySort,
  ProgramDonorsSummaryStatsQueryData,
} from './types';
import EmptyDonorSummaryState from './EmptyDonorSummaryTable';

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
      notifyOnNetworkStatusChange: true,
      // pollInterval: POLL_INTERVAL_MILLISECONDS, // milliseconds
    },
  );
  return {
    ...hook,
    data: hook.data,
  };
};

const useProgramDonorsSummaryStatsQuery = (programShortName: string) => {
  const hook = useQuery<ProgramDonorsSummaryStatsQueryData, { programShortName: string }>(
    PROGRAM_DONOR_SUMMARY_STATS_QUERY,
    {
      variables: {
        programShortName,
      },
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
  const DEFAULT_SORTS = [{ field: 'updatedAt', order: 'desc' }];
  const DEFAULT_OFFSET = 0;

  const {
    data: { programDonorSummaryEntries = [] } = {},
    loading: isEntriesLoading = true,
  } = useProgramDonorsSummaryQuery(
    programShortName,
    DEFAULT_PAGE_SIZE,
    DEFAULT_OFFSET,
    DEFAULT_SORTS,
  );

  const {
    data: { programDonorSummaryStats = undefined } = {},
    loading: isStatsLoading = true,
  } = useProgramDonorsSummaryStatsQuery(programShortName);

  const isDonorSummaryEntriesEmpty =
    !programDonorSummaryStats || programDonorSummaryStats.registeredDonorsCount === 0;

  return (
    <DashboardCard loading={isStatsLoading} cardHeight={isStatsLoading ? '170px' : '100%'}>
      <Typography variant="default" component="span">
        Donor Data Summary
      </Typography>

      {!isStatsLoading ? (
        isDonorSummaryEntriesEmpty ? (
          <EmptyDonorSummaryState />
        ) : (
          <DonorSummaryTable
            isEntriesLoading={isEntriesLoading}
            programShortName={programShortName}
            pageSize={DEFAULT_PAGE_SIZE}
            offset={DEFAULT_OFFSET}
            sorts={DEFAULT_SORTS}
            donorSummaryEntries={programDonorSummaryEntries}
            programDonorSummaryStats={programDonorSummaryStats}
          />
        )
      ) : (
        undefined
      )}
    </DashboardCard>
  );
};
