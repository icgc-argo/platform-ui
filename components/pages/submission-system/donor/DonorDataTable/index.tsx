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

import { css } from 'uikit';
import Container from 'uikit/Container';
import { Row, Col } from 'react-grid-system';
import Table from 'uikit/Table';
import Typography from 'uikit/Typography';

export default () => {
  return (
    <div>
      <Container
        css={css`
          padding: 20px;
          padding-top: 0px;
          padding-right: 10px;
        `}
      >
        <Row>
          <Col xs={12}>
            <Typography
              css={css`
                margin-top: 15px;
                margin-bottom: 10px;
              `}
              variant="subtitle2"
              as="h2"
            >
              Summary
            </Typography>
          </Col>
          <Col
            xs={6}
            css={css`
              margin-right: -10px;
            `}
          >
            <Table
              TheadComponent={props => null}
              parentRef={{ current: null }}
              showPagination={false}
              withOutsideBorder
              data={[
                { id: 'Submitter Donor ID', val: '...' },
                { id: 'Gender', val: '...' },
                { id: 'Vital Status', val: '...' },
                { id: 'Cause of Death', val: '...' },
                { id: 'Survival Time', val: '...' },
                { id: 'Program Name', val: '...' },
                { id: 'Cancer Type', val: '...' },
                { id: 'Primary Site', val: '...' },
                { id: 'Height', val: '...' },
                { id: 'Weight', val: '...' },
              ]}
              columns={[
                { sortable: false, accessor: 'id', style: { whiteSpace: 'unset' } },
                { accessor: 'val', style: { whiteSpace: 'unset' } },
              ]}
            />
          </Col>
          <Col xs={6}>
            <Table
              TheadComponent={props => null}
              parentRef={{ current: null }}
              showPagination={false}
              withOutsideBorder
              data={[
                { id: 'BMI', val: '...' },
                { id: 'Menopause Status', val: '...' },
                { id: 'Age at Menarche', val: '...' },
                { id: 'Number of Pregnancies', val: '...' },
                { id: 'Number of Birthed Children', val: '...' },
                { id: 'Prior Malignancy', val: '...' },
                { id: 'Cancer Type Prior Malignancy', val: '...' },
                { id: 'Age at Prior Malignancy', val: '...' },
                { id: 'Laterality of Prior Malignancy', val: '...' },
              ]}
              columns={[
                { sortable: false, accessor: 'id', style: { whiteSpace: 'unset' } },
                { accessor: 'val', style: { whiteSpace: 'unset' } },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
