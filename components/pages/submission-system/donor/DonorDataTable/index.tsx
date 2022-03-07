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

import { css } from 'uikit';
import Container from 'uikit/Container';
import { Row, Col } from 'react-grid-system';
import Table from 'uikit/Table';
import Typography from 'uikit/Typography';

const DonorDataTable = ({ data }) => {
  const {
    programId,
    submitterDonorId,
    gender,
    vitalStatus,
    cancerType,
    primarySite,
    causeOfDeath,
    survivalTime,
    geneticDisorders,
    height,
    weight,
    bmi,
    menopauseStatus,
    ageAtMenarche,
    numberOfPregnancies,
    numberOfChildren,
    hrtType,
    hrtDuration,
    contraceptionType,
    contraceptionDuration,
  } = data;
  const tableData = [
    { id: 'Submitter Donor ID', val: submitterDonorId },
    { id: 'Program Name', val: programId },
    { id: 'Primary Site', val: primarySite },
    { id: 'Cancer Type', val: cancerType },
    { id: 'Gender', val: gender },
    { id: 'Vital Status', val: vitalStatus },
    { id: 'Cause of Death', val: causeOfDeath },
    { id: 'Survival Time', val: survivalTime },
    { id: 'Genetic Disorders', val: geneticDisorders },
    { id: 'Height', val: `${height} cm` },
    { id: 'Weight', val: `${weight} kg` },
    { id: 'BMI', val: `${bmi} kg/m²` },
    ...(gender && gender === 'Female'
      ? [
          { id: 'Menopause Status', val: menopauseStatus },
          { id: 'Age at Menarche', val: ageAtMenarche },
          { id: 'Number of Pregnancies', val: numberOfPregnancies },
          { id: 'Number of Children', val: numberOfChildren },
          { id: 'HRT Type', val: hrtType },
          { id: 'HRT Duration', val: hrtDuration },
          { id: 'Contraception Type', val: contraceptionType },
          { id: 'Contraception Duration', val: contraceptionDuration },
        ]
      : []),
  ];

  const length = Math.ceil(tableData.length / 2);
  const firstTable = tableData.slice(0, length);
  const secondTable = tableData.slice(length + 1);

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
              TheadComponent={(props) => null}
              parentRef={{ current: null }}
              showPagination={false}
              withOutsideBorder
              data={firstTable}
              columns={[
                { sortable: false, accessor: 'id', style: { whiteSpace: 'unset' } },
                { accessor: 'val', style: { whiteSpace: 'unset' } },
              ]}
            />
          </Col>
          <Col xs={6}>
            <Table
              TheadComponent={(props) => null}
              parentRef={{ current: null }}
              showPagination={false}
              withOutsideBorder
              data={secondTable}
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

export default DonorDataTable;
