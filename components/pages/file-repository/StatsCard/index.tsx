import { css } from 'uikit';
import Container from 'uikit/Container';
import { PaddedRow } from '../index';
import StatItem from './StatItem';

const mockStatsData = {
  files: 11350,
  donors: 487,
  primarySites: 20,
  programs: 25,
  filesize: 1900000000000,
};

const StatsCard = () => {
  const { files, donors, primarySites, programs, filesize } = mockStatsData;
  return (
    <Container
      css={css`
        margin-bottom: 16px;
      `}
    >
      <PaddedRow
        css={css`
          justify-content: space-around;
        `}
      >
        <StatItem iconName="file" statType="file" count={files} iconDiameter={16} />
        <StatItem iconName="user" statType="donor" count={donors} iconDiameter={16} />
        <StatItem iconName="crosshairs" statType="primary site" count={primarySites} />
        <StatItem iconName="programs" statType="program" count={programs} iconDiameter={16} />
        <StatItem iconName="filesize" statType="filesize" count={filesize} iconDiameter={19} />
      </PaddedRow>
    </Container>
  );
};
export default StatsCard;
