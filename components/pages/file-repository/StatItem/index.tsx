import { Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { UikitIconNames } from 'uikit/Icon/icons';
import { capitalize } from 'global/utils/stringUtils';

type TSTatType = 'file' | 'primary site' | 'donor' | 'program' | 'filesize';
type StatItemProps = {
  iconName: UikitIconNames;
  statType: TSTatType;
  count: number;
};

// for mock data display, not sure how this will be calculated esp for file size
const fileSizeUnits = 'PB';
const getStatCount = (type: TSTatType, count: number): string => {
  if (type === 'filesize') {
    return `${count / 1000000000} ${fileSizeUnits}`;
  }
  return `${count} ${capitalize(type)}s`;
};

const StatItem = ({ iconName, statType, count }: StatItemProps) => {
  const theme = useTheme();
  return (
    <Col
      css={css`
        justify-content: center;
      `}
    >
      <Typography
        css={css`
          font-size: 16px;
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
        {getStatCount(statType, count)}
      </Typography>
    </Col>
  );
};

export default StatItem;
