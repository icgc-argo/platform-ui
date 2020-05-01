import filesize from 'filesize';
import pluralize from 'pluralize';
import { css } from 'uikit';
import { UikitIconNames } from 'uikit/Icon/icons';
import { capitalize } from 'global/utils/stringUtils';
import { Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';

type StatType = 'file' | 'primary site' | 'donor' | 'program' | 'filesize';

type StatItemProps = {
  iconName: UikitIconNames;
  statType: StatType;
  count: number;
};

// for mock data display. this could change when data is integrated
const getDisplayStat = (type: StatType, count: number): string => {
  return type === 'filesize'
    ? `${filesize(count)}`
    : `${count} ${capitalize(pluralize(type, count))}`;
};

const StatItem = ({ iconName, statType, count }: StatItemProps) => {
  const theme = useTheme();
  return (
    <Col xl={2.4} lg={2.4} md={4} sm={6}>
      <Typography
        css={css`
          font-size: 14px;
          margin: 0.8rem 0 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${theme.colors.primary};
        `}
      >
        <Icon
          css={css`
            padding-right: 0.3em;
          `}
          fill={theme.colors.primary_1}
          name={iconName}
        />
        {getDisplayStat(statType, count)}
      </Typography>
    </Col>
  );
};

export default StatItem;
