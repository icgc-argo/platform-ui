import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import Icon from 'uikit/Icon';
import { usePageQuery } from 'global/hooks/usePageContext';

import {
  DonorDataReleaseState,
  ProgramDonorReleaseStatQueryData,
  SummaryQueryVariables,
  ProgoramDonorReleasStats,
} from './types';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import PROGRAM_DONOR_RELEASE_STAT_QUERY from './gql/PROGRAM_DONOR_RELEASE_STAT_QUERY.gql';
import { StatArea as StatAreaDisplay } from '../../common';

const useProgramDonorReleaseStatQuery = (
  programShortName: string,
  options: Omit<
    QueryHookOptions<ProgramDonorReleaseStatQueryData, SummaryQueryVariables>,
    'variables'
  > = {},
) => {
  const hook = useQuery<ProgramDonorReleaseStatQueryData, SummaryQueryVariables>(
    PROGRAM_DONOR_RELEASE_STAT_QUERY,
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

const emptyProgramDonorSummaryStats: ProgoramDonorReleasStats = {
  fullyReleasedDonorsCount: 0,
  noReleaseDonorsCount: 0,
  partiallyReleasedDonorsCount: 0,
};

const DonorStatsArea = () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const {
    data: { programDonorSummaryStats = emptyProgramDonorSummaryStats } = {},
  } = useProgramDonorReleaseStatQuery(programShortName);

  const total = Object.values(programDonorSummaryStats)
    .filter(Number)
    .reduce((a, b) => a + b, 0);

  return (
    <StatAreaDisplay.Container>
      <StatAreaDisplay.Section>{total} donors</StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.FULLY]}
          />
          {programDonorSummaryStats.fullyReleasedDonorsCount} with fully released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.PARTIALLY]}
          />
          {programDonorSummaryStats.partiallyReleasedDonorsCount} with partially released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.NO]}
            outline={RELEASED_STATE_STROKE_COLOURS[DonorDataReleaseState.NO]}
          />
          {programDonorSummaryStats.noReleaseDonorsCount} with no released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

export default DonorStatsArea;
