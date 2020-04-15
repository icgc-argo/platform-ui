import { css } from 'uikit';
import Container from 'uikit/Container';

export const DashboardCard: React.ComponentType<{ cardHeight?: string; loading?: boolean }> = ({
  children,
  cardHeight = '100%',
  loading = false,
}) => (
  <Container
    loading={loading}
    css={css`
      height: ${cardHeight};
    `}
  >
    <div
      css={css`
        padding: 16px;
      `}
    >
      {children}
    </div>
  </Container>
);

type ProgramDonorSummaryStats = {
  registeredDonorsCount: number;
  percentageCoreClinical: number;
  percentageTumourAndNormal: number;
  donorsProcessingMolecularDataCount: number;
  filesToQcCount: number;
  donorsWithReleasedFilesCount: number;
  allFilesCount: number;
  fullyReleasedDonorsCount: number;
  partiallyReleasedDonorsCount: number;
  noReleaseDonorsCount: number;
};

type Program = {
  commitmentDonors: number;
};

export type DashboardSummaryData = {
  programDonorSummaryStats: ProgramDonorSummaryStats;
  program: Program;
};

export type DashboardSummaryDataVariables = {
  programShortName: string;
};

export const POLL_INTERVAL_MILLISECONDS: number = 3000;
