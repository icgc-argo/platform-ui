import Icon from 'uikit/Icon';

import { DonorDataReleaseState, ProgoramDonorReleasStats } from './types';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { StatArea as StatAreaDisplay } from '../../common';

const emptyProgramDonorSummaryStats: ProgoramDonorReleasStats = {
  registeredDonorsCount: 0,
  fullyReleasedDonorsCount: 0,
  noReleaseDonorsCount: 0,
  partiallyReleasedDonorsCount: 0,
};

const DonorStatsArea = ({
  programDonorSummaryStats = emptyProgramDonorSummaryStats,
  className,
}: {
  programDonorSummaryStats: ProgoramDonorReleasStats;
  className?: string;
}) => {
  return (
    <StatAreaDisplay.Container className={className}>
      <StatAreaDisplay.Section>
        {programDonorSummaryStats.registeredDonorsCount} donors
      </StatAreaDisplay.Section>
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
