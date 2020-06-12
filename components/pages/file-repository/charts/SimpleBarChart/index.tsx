/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import { css, styled } from 'uikit';
import { orderBy, maxBy } from 'lodash';
import Tooltip from 'uikit/Tooltip';
import { capitalize } from 'global/utils/stringUtils';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import { ContentBox } from 'uikit/PageLayout';
import { ThemeColorNames } from 'uikit/theme/types';
import pluralize from 'pluralize';
import DnaLoader from 'uikit/DnaLoader';

export type FileRepoDataType = 'data type' | 'program' | 'primary site';
type SimpleBarChartProps = {
  data: Array<{ category: string; count: number }>;
  type: FileRepoDataType;
  containerStyle?: React.CSSProperties;
  chartHeight?: number;
  loading?: boolean;
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
  loading = false,
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
            margin: 0;
            margin-bottom: -8px;
            font-size: 12px;
            color: ${theme.colors.primary};
          `}
        >
          Files by {capitalize(type)}
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
              position: relative;
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
                    <span>{`${count} ${pluralize('file', count)}`}</span>
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
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                height: 100%;
                width: 100%;
                pointer-events: none;
                background: ${loading
                  ? `${theme.colors.white}90` //this is alpha hex
                  : 'none'};
              `}
            >
              {loading && <DnaLoader />}
            </div>
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
