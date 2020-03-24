import Icon from 'uikit/Icon';

import { DonorDataReleaseState, ProgoramDonorReleasStats } from './types';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { StatArea as StatAreaDisplay } from '../../common';

const emptyProgramDonorSummaryStats: ProgoramDonorReleasStats = {
  fullyReleasedDonorsCount: 0,
  noReleaseDonorsCount: 0,
  partiallyReleasedDonorsCount: 0,
};

const DonorStatsArea = ({
  programDonorSummaryStats = emptyProgramDonorSummaryStats,
}: {
  programDonorSummaryStats: ProgoramDonorReleasStats;
}) => {
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
