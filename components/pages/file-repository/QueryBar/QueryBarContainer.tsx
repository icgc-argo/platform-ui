/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { Container, css, Icon, Typography, useTheme } from '@icgc-argo/uikit';
import isEmpty from 'lodash/isEmpty';
import { Col } from 'react-grid-system';
import useFiltersContext from '../hooks/useFiltersContext';
import QueryBar from './';

import { PaddedRow } from '../index';

const QueryBarContainer = () => {
  const theme = useTheme();
  const { filters } = useFiltersContext();

  return (
    <PaddedRow justify="around">
      <Col xl={12}>
        <Container
          css={css`
            margin-bottom: 8px;
            justify-content: start;
            padding: 2px 10px;
            border-radius: 0px;
            background-color: ${theme.colors.grey_4};
            min-height: 50px;
          `}
        >
          {isEmpty(filters) || filters.content.length === 0 ? (
            <Typography
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <Icon
                css={css`
                  vertical-align: middle;
                  margin-right: 10px;
                `}
                name="arrow_left"
              />
              <span>Search the file repository by selecting filters</span>
            </Typography>
          ) : (
            <QueryBar filters={filters} />
          )}
        </Container>
      </Col>
    </PaddedRow>
  );
};

export default QueryBarContainer;
