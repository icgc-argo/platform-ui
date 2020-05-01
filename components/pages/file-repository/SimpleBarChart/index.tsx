import React from 'react';
import { css, styled } from 'uikit';
import { orderBy, maxBy } from 'lodash';
import Tooltip from 'uikit/Tooltip';
import { capitalize } from 'global/utils/stringUtils';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import { ContentBox } from 'uikit/PageLayout';
import { ThemeColorNames } from 'uikit/theme/types';

export type FileRepoDataType = 'data type' | 'program' | 'primary site';
type SimpleBarChartProps = {
  data: Array<{ category: string; count: number }>;
  type: FileRepoDataType;
  containerStyle?: React.CSSProperties;
  chartHeight?: number;
};

const defaultChartHeight = 100;

const getBarHeight = (value: number, maxValue: number): number => {
  return Math.ceil((value / maxValue) * defaultChartHeight);
};

export const chartTypeMeta: {
  [k in FileRepoDataType]: {
    title: string;
    getColor: (theme: any) => keyof ThemeColorNames;
    iconName: string;
  }
} = {
  program: {
    title: 'Programs',
    getColor: theme => theme.colors.accent3_dark,
    iconName: 'programs',
  },
  'data type': {
    title: 'Files',
    getColor: theme => theme.colors.warning,
    iconName: 'file',
  },
  'primary site': {
    title: 'Donors',
    getColor: theme => theme.colors.accent1,
    iconName: 'user',
  },
};

const Bar = styled('div')`
  height: ${({ style }) => style.height}px;
  background-color: ${({ style }) => style.backgroundColor};
  border-radius: 3px 3px 0 0;
`;

const FlexRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexColumn = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AxisText = styled(Typography)`
  text-align: right;
  font-size: 10px;
  margin: 0;
`;

const YAxis = ({ max, theme }) => {
  return (
    <FlexRow
      css={css`
        margin-bottom: 0.6em;
      `}
    >
      <Typography
        css={css`
          transform: rotate(-90deg);
          font-size: 10px;
          color: ${theme.colors.grey};
          margin: 0;
          margin-right: -0.5rem;
        `}
      >
        # Files
      </Typography>
      <FlexColumn
        css={css`
          font-size: 10px;
          height: ${defaultChartHeight}px;
        `}
      >
        <AxisText
          css={css`
            margin-top: -0.9em;
          `}
          color={theme.colors.primary}
        >
          {max}
        </AxisText>
        <br />
        <AxisText color={theme.colors.primary}>0</AxisText>
      </FlexColumn>
    </FlexRow>
  );
};

const SimpleBarChart: React.ComponentType<SimpleBarChartProps> = ({
  data = [],
  type,
  containerStyle = {},
  chartHeight = defaultChartHeight,
}) => {
  const theme = useTheme();
  const maxValue = data.length ? maxBy(data, 'count').count : 0;

  return (
    <ContentBox
      style={containerStyle}
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 3px 10px 8px 3px;
      `}
    >
      <FlexRow style={{ justifyContent: 'flex-end', position: 'relative' }}>
        <Typography
          css={css`
            position: absolute;
            top: 0.5rem;
            margin: 0;
            font-size: 12px;
            color: ${theme.colors.primary};
          `}
        >
          Files by {type}
        </Typography>
      </FlexRow>
      <div
        css={css`
          display: flex;
          padding-top: 12px;
          flex-grow: 1;
          justify-content: space-between;
        `}
      >
        <YAxis max={maxValue} theme={theme} />
        <div
          css={css`
            flex-grow: 1;
          `}
        >
          <FlexRow
            css={css`
              align-items: baseline;
              margin-left: 6px;
              height: ${chartHeight}px;
              border-bottom: 1px solid ${theme.colors.grey_2};
            `}
          >
            <Bar
              style={{
                width: 1,
                height: chartHeight,
                backgroundColor: theme.colors.grey_2,
              }}
            />
            {orderBy(data, 'count', 'desc').map(({ category, count }) => (
              <Tooltip
                style={{ flexGrow: 1 }}
                key={`bar-${category}`}
                unmountHTMLWhenHide
                position="bottom"
                interactive
                html={
                  <div>
                    <span>{capitalize(category)}</span>
                    <br />
                    <span>{count}</span>
                  </div>
                }
              >
                <Bar
                  style={{
                    flexGrow: 1,
                    margin: '0 4px',
                    height: getBarHeight(count, maxValue),
                    backgroundColor: chartTypeMeta[type].getColor(theme),
                  }}
                />
              </Tooltip>
            ))}
          </FlexRow>
          <Typography
            css={css`
              padding-top: 5px;
              font-size: 10px;
              color: ${theme.colors.grey};
              text-align: center;
            `}
            component="div"
          >
            {`${capitalize(type)}s`}
          </Typography>
        </div>
      </div>
    </ContentBox>
  );
};

export default SimpleBarChart;
