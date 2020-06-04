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

import { displayDateAndTime } from 'global/utils/common';
import urlJoin from 'url-join';
import { css, styled } from 'uikit';
import Icon, { Outline } from 'uikit/Icon';
import { ThemeColorNames } from 'uikit/theme/types';
import Typography from 'uikit/Typography';
import Pipe from 'uikit/Pipe';
import { formatFileName } from './program-sample-registration/util';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import { HtmlHTMLAttributes } from 'react';
import { getConfig } from 'global/config';

export const containerStyle = css`
  padding: 8px;
  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;
export const instructionBoxButtonIconStyle = css`
  margin-right: 5px;
`;
export const instructionBoxButtonContentStyle = css`
  display: flex;
  align-items: center;
`;
export const instructionBoxButtonStyle = css`
  margin-top: 10px;
`;

export const CellContentCenter = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DataTableStarIcon = (props: { fill: keyof ThemeColorNames; outline?: Outline }) => (
  <Icon name="star" width="16px" height="16px" {...props} />
);
export const StatArea: {
  Container: React.ComponentType<{ className?: string }>;
  Section: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement> & { faded?: boolean }>;
  StatEntryContainer: React.ComponentType<HtmlHTMLAttributes<HTMLDivElement>>;
  StarIcon: typeof DataTableStarIcon;
} = (() => {
  const Container: React.ComponentType<{ className?: string }> = ({ children, className }) => (
    <Typography
      variant="data"
      component="div"
      color="grey"
      className={className}
      css={css`
        display: flex;
        align-items: center;
        margin-right: 50px;
      `}
    >
      {children}
    </Typography>
  );
  const Section = styled('div')<{ faded?: boolean }>`
    display: flex;
    align-items: center;
    margin-right: 16px;
    text-align: center;
    opacity: ${({ faded }) => (faded ? 0.3 : 1)};
  `;
  const StatEntryContainer = styled('div')`
    margin-right: 5px;
    display: flex;
    align-items: center;
  `;
  const StarIcon: typeof DataTableStarIcon = props => (
    <div
      css={css`
        margin-right: 5px;
        display: flex;
      `}
    >
      <DataTableStarIcon {...props} />
    </div>
  );
  return {
    Container,
    Section,
    StatEntryContainer,
    StarIcon,
  };
})();

export const SubmissionInfoArea = ({
  fileName,
  createdAt,
  creator,
}: {
  fileName: string;
  creator: string;
  createdAt: string;
}) => (
  <Typography
    variant="data"
    component="div"
    css={css`
      text-align: right;
    `}
  >
    <Typography
      variant="data"
      css={css`
        font-weight: 600;
      `}
    >
      {formatFileName(fileName)}{' '}
    </Typography>
    uploaded on{' '}
    <Typography
      variant="data"
      css={css`
        font-weight: 600;
      `}
    >
      {displayDateAndTime(createdAt)}{' '}
    </Typography>
    by{' '}
    <Typography
      variant="data"
      css={css`
        font-weight: 600;
      `}
    >
      {creator}
    </Typography>
  </Typography>
);

export const TableInfoHeaderContainer = ({
  left,
  right,
  noMargin,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  noMargin?: boolean;
}) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        margin-bottom: ${noMargin ? '0px' : '3px'};
        border-radius: 2px;
        background-color: ${theme.colors.grey_3};
        padding: 8px;
      `}
    >
      <Row nogutter>
        {left}
        <Col align="end">{right}</Col>
      </Row>
    </div>
  );
};

export const downloadTsvFileTemplate = (fileName: string) => {
  const { GATEWAY_API_ROOT } = getConfig();
  window.location.assign(urlJoin(GATEWAY_API_ROOT, `clinical/template/${fileName}`));
};

enum PIPELINE_STATUS {
  COMPLETE = 'complete',
  IN_PROGRESS = 'inProgress',
  ERROR = 'error',
}
type PipelineStats = Record<PIPELINE_STATUS, number>;

export const Pipeline = (stats: PipelineStats) => {
  const theme = useTheme();

  const getBackgroundColour = (state: keyof PipelineStats) => {
    interface ColourMapper {
      [key: string]: keyof typeof theme.colors;
    }
    const mapper: ColourMapper = {
      [PIPELINE_STATUS.COMPLETE]: 'accent1_dimmed',
      [PIPELINE_STATUS.IN_PROGRESS]: 'warning_dark',
      [PIPELINE_STATUS.ERROR]: 'error',
    };
    return mapper[state];
  };

  const shouldRender = (num: number) => num > 0;

  const renderableStats = Object.keys(stats).filter(key => shouldRender(stats[key]));

  const pipeStats = renderableStats.map(stat => (
    <Pipe.Item key={stat} fill={getBackgroundColour(stat as keyof PipelineStats)}>
      {stats[stat]}
    </Pipe.Item>
  ));
  return <Pipe>{pipeStats}</Pipe>;
};
