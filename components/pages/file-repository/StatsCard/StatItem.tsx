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
import { useTheme } from 'uikit/ThemeProvider';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';

type StatType = 'file' | 'primary site' | 'donor' | 'program' | 'fileSize';

type StatItemProps = {
  iconName: UikitIconNames;
  statType: StatType;
  count: number;
  loading?: boolean;
};

const StatItem = ({ iconName, statType, count, loading = false }: StatItemProps) => {
  const theme = useTheme();
  const displayStat =
    statType === 'fileSize'
      ? `${filesize(count)}`
      : `${count.toLocaleString()} ${capitalize(pluralize(statType, count))}`;

  return (
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
      {loading ? <Icon name={'spinner'} fill={theme.colors.grey} /> : displayStat}
    </Typography>
  );
};

export default StatItem;
