import React from 'react';
import { css, styled } from 'uikit';
import { orderBy, maxBy, min } from 'lodash';
import Tooltip from 'uikit/Tooltip';
import { capitalize } from 'global/utils/stringUtils';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import Icon from 'uikit/Icon';
import { ContentBox } from 'uikit/PageLayout';
import { UikitIconNames } from 'uikit/Icon/icons';
import { ThemeColorNames } from 'uikit/dist/uikit/theme/types';

type FileRepoDataType = 'data type' | 'program' | 'primary site';
type SimpleBarChartProps = {
  data: Array<{ category: string; count: number }>;
  type: FileRepoDataType;
  totalDataSize?: string | null; // not sure yet how this prop will be determined
  totalCount: number; // calculation will vary based on chart type
  containerStyle?: React.CSSProperties;
};

// <--for dev-->
const chartHeight = 100;
const maxChartWidth = 300;
const minBarWidth = 6;
// <--end for dev-->

const getBarHeight = (value: number, maxValue: number): number => {
  return Math.ceil((value / maxValue) * chartHeight);
};

const getBarWidth = (data: Array<any>): number => {
  return min([Math.floor(getChartWidth(data) / data.length) - 2, minBarWidth]);
};

const getChartWidth = (data: Array<any>): number => {
  return min([35 * data.length, maxChartWidth]);
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
  border-radius: 3px;
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
    <FlexColumn
      css={css`
        font-size: 10px;
        height: ${chartHeight}px;
      `}
    >
      <AxisText color={theme.colors.grey}>{max}</AxisText>
      <br />
      <AxisText color={theme.colors.grey}>0</AxisText>
    </FlexColumn>
  );
};

const SimpleBarChart: React.ComponentType<SimpleBarChartProps> = ({
  data = [],
  type,
  totalDataSize = null, // unit will be passed in with string prop
  totalCount,
  containerStyle = {},
}) => {
  const theme = useTheme();
  const maxValue = data.length ? maxBy(data, 'count').count : 0;

  return (
    <ContentBox
      style={containerStyle}
      css={css`
        display: flex;
        justify-content: space-between;
        padding: 3px 10px 8px;
      `}
    >
      <FlexColumn>
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <FlexRow>
            <Icon
              name={chartTypeMeta[type].iconName as UikitIconNames}
              fill={theme.colors.primary_1}
              width="20px"
              height="20px"
              style={{ margin: 0 }}
            />
            <Typography
              css={css`
                font-size: 26px;
                color: ${theme.colors.primary};
                margin: 0px 0px 0px 10px;
              `}
            >
              {totalCount}
            </Typography>
          </FlexRow>

          <FlexRow>
            <Typography
              css={css`
                font-size: 14px;
                margin: 0px;
              `}
            >
              {chartTypeMeta[type].title}
            </Typography>
          </FlexRow>
        </div>
        {totalDataSize && (
          <FlexRow>
            <Typography
              css={css`
                font-size: 12px;
                margin: 0;
              `}
            >
              {totalDataSize}
            </Typography>
          </FlexRow>
        )}
      </FlexColumn>
      <div
        css={css`
          display: flex;
          padding-top: 12px;
        `}
      >
        <YAxis max={maxValue} theme={theme} />
        <div>
          <FlexRow
            css={css`
              align-items: baseline;
              padding-left: 6px;
              padding-bottom: 5px;
              width: ${getChartWidth(data)}px;
              height: ${chartHeight}px;
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
                    width: getBarWidth(data),
                    height: getBarHeight(count, maxValue),
                    backgroundColor: chartTypeMeta[type].getColor(theme),
                  }}
                />
              </Tooltip>
            ))}
          </FlexRow>
          <Typography
            css={css`
              padding-left: 10px;
              font-size: 11px;
              color: ${theme.colors.grey};
            `}
            component="div"
          >
            Files by {type}
          </Typography>
        </div>
      </div>
    </ContentBox>
  );
};

export default SimpleBarChart;
