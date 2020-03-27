import Typography from 'uikit/Typography';
import { DashboardCard } from '../common';
import DonorSummaryTable from './DonorSummaryTable';
import { usePageQuery } from 'global/hooks/usePageContext';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import PROGRAM_DONOR_SUMMARY_QUERY from './gql/PROGRAM_DONOR_SUMMARY_QUERY.gql';
import { ProgramDonorsSummaryQueryData, ProgramDonorsSummaryQueryVariables } from './types';
import EmptyDonorSummaryState from './EmptyDonorSummaryTable';

const useProgramDonorsSummaryQuery = (
  programShortName: string,
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
  const {
    data: { programDonorSummaryEntries = [], programDonorSummaryStats = undefined } = {},
    loading: isLoading = true,
  } = useProgramDonorsSummaryQuery(programShortName);

  const isDonorSummaryEntriesEmpty = programDonorSummaryEntries.length === 0;

  return (
    <DashboardCard loading={isLoading} cardHeight={isLoading ? '170px' : '100%'}>
      <Typography variant="default" component="span">
        Donor Data Summary
      </Typography>

      {!isLoading ? (
        isDonorSummaryEntriesEmpty ? (
          <EmptyDonorSummaryState />
        ) : (
          <DonorSummaryTable
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
