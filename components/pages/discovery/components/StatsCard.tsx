/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { css } from '@emotion/react';
import { Typography, Icon, Container, useTheme } from '@icgc-argo/uikit';
import { Col } from 'react-grid-system';
import { PaddedRow } from '..';

const StatItem = ({ iconName, value }) => {
  const theme = useTheme();

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
      {value}
    </Typography>
  );
};

const StatsCard = ({ data: { files, donors, programs, repositories }, isLoading }) => {
  const theme = useTheme();
  const filesValue = `${files} File${files > 0 ? 's' : ''}`;
  const donorsValue = `${donors} Donor${donors > 0 ? 's' : ''}`;
  const programsValue = `${programs} Program${programs > 0 ? 's' : ''}`;
  const repositoriesValue = `${repositories} ${repositories > 0 ? 'Repositories' : 'Repository'}`;
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
        {isLoading ? (
          <Icon name={'spinner'} fill={theme.colors.grey} />
        ) : (
          <>
            <Col md={3} sm={6}>
              <StatItem iconName="file" value={filesValue} />
            </Col>
            <Col md={3} sm={6}>
              <StatItem iconName="user" value={donorsValue} />
            </Col>

            <Col md={3} sm={6}>
              <StatItem iconName="programs" value={programsValue} />
            </Col>
            <Col md={3} sm={6}>
              <StatItem iconName="filesize" value={repositoriesValue} />
            </Col>
          </>
        )}
      </PaddedRow>
    </Container>
  );
};

export default StatsCard;
