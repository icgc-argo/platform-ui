import React from 'react';
import Container from 'uikit/Container';
import { css, styled } from '..';
import { orderBy, maxBy } from 'lodash';
import Tooltip from 'uikit/Tooltip';
import { capitalize } from 'global/utils/stringUtils';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import Icon from 'uikit/Icon';
import { ContentBox } from 'uikit/PageLayout';
import { UikitIconNames } from 'uikit/Icon/icons';
import { mockData } from './stories';

type FileRepoDataType = 'data type' | 'program' | 'primary site';
type SimpleBarChartProps = {
  data: Array<{ category: string; count: number }>;
  type?: FileRepoDataType; // will not be optional when moved out of uikit
};

// <--for dev-->
const chartType = 'primary site';
const chartHeight = 100;
const chartWidth = 300;
// <--end for dev-->

const getBarHeight = (value: number): number => {
  return (value / chartHeight) * 100;
};

const getBarWidth = (data: Array<any>): number => {
  return Math.floor(chartWidth / data.length) - 2;
};

const chartTypeMeta = {
  program: {
    title: 'Programs',
    color: '#00b3d3',
    iconName: 'programs',
  },
  'data type': {
    title: 'Files',
    color: '#fea430',
    iconName: 'file',
  },
  'primary site': {
    title: 'Donors',
    color: '#24dbb4',
    iconName: 'user',
  },
};

const Bar = styled('div')`
  height: ${({ style }) => style.height}px;
  background-color: ${({ style }) => style.backgroundColor};
  max-width: 6px;
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

const YAxis = ({ max = 600, theme }) => {
  return (
    <FlexColumn
      css={css`
        font-size: 10px;
        height: ${chartHeight}px;
      `}
    >
      <AxisText color={theme.colors.grey}>{max}</AxisText>
      <br />
      <AxisText
        color={theme.colors.grey}
        css={css`
          margin-bottom: 6px;
        `}
      >
        0
      </AxisText>
    </FlexColumn>
  );
};

const SimpleBarChart: React.ComponentType<SimpleBarChartProps> = ({
  data = mockData, // default to mock data
  type = chartType, // default to mock type
}) => {
  const theme = useTheme();

  return (
    <ContentBox
      css={css`
        display: flex;
        justify-content: space-between;
        max-width: 500px;
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
              fill={`#4e546d`}
              color={`#bbc8dd`}
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
              {data.reduce((acc, { category, count }) => acc + count, 0)}
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
        <FlexRow>
          <Typography
            css={css`
              font-size: 12px;
              margin: 0;
            `}
          >
            1.66 TB
          </Typography>
        </FlexRow>
      </FlexColumn>
      <div
        css={css`
          display: flex;
          padding-top: 12px;
        `}
      >
        <YAxis max={data.length} theme={theme} />
        <div>
          <FlexRow
            css={css`
              align-items: baseline;
              padding-left: 6px;
              width: ${chartWidth}px;
              height: ${chartHeight}px;
            `}
          >
            <Bar
              style={{
                width: 1,
                height: maxBy(data, 'count').count,
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
                    height: getBarHeight(count),
                    backgroundColor: chartTypeMeta[type].color,
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
