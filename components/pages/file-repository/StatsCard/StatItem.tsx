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
  iconDiameter?: number;
  statType: StatType;
  count: number;
};

// for mock data display. this could change when data is integrated
const getDisplayStat = (type: StatType, count: number): string => {
  return type === 'filesize'
    ? `${filesize(count)}`
    : `${count} ${capitalize(pluralize(type, count))}`;
};

const StatItem = ({ iconName, statType, count, iconDiameter = 20 }: StatItemProps) => {
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
