import Typography from 'uikit/Typography';
import { DashboardCard } from '../common';
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
  const initalPages = !isCardLoading
    ? Math.ceil(programDonorSummaryStats.registeredDonorsCount / DEFAULT_PAGE_SIZE)
    : 1;

  const isDonorSummaryEntriesEmpty =
    !programDonorSummaryStats || programDonorSummaryStats.registeredDonorsCount === 0;

  return (
    <DashboardCard loading={isCardLoading}>
      <Typography variant="default" component="span">
        Donor Data Summary
      </Typography>

      {!isCardLoading && isDonorSummaryEntriesEmpty ? (
        <EmptyDonorSummaryState />
      ) : (
        <DonorSummaryTable
          programShortName={programShortName}
          initalPages={initalPages}
          initialPageSize={DEFAULT_PAGE_SIZE}
          initialSorts={DEFAULT_SORTS}
          isCardLoading={isCardLoading}
        />
      )}
    </DashboardCard>
  );
};
