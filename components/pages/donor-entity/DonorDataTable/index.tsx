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
import { Row, Col } from 'react-grid-system';
import sqonBuilder from 'sqon-builder';
import { useQuery } from '@apollo/react-hooks';
import Container from 'uikit/Container';
import SimpleTable from 'uikit/Table/SimpleTable';
import Typography from 'uikit/Typography';
import { splitIntoColumns, tableFormat } from '../ClinicalTimeline/util';
import PROGRAMS_LIST_QUERY from '../../submission-system/programs/PROGRAMS_LIST_QUERY.gql';

// TODO: Create useDonorCentricFieldDisplayName

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
  const { data: { programs = [] } = {}, loading } = useQuery(PROGRAMS_LIST_QUERY);

  const programName =
    programs.length > 0
      ? programs.filter((program) => program.shortName === programId)[0].name
      : programId;

  let displayData = {
    'Submitter Donor ID': submitterDonorId,
    'Program Name': `${programName} (${programId})`,
    'Primary Site': primarySite,
    'Cancer Type': cancerType,
    Gender: gender,
    'Vital Status': vitalStatus,
    'Cause of Death': causeOfDeath,
    'Survival Time': survivalTime,
    'Genetic Disorders': geneticDisorders,
    Height: `${height} cm`,
    Weight: `${weight} kg`,
    BMI: `${bmi} kg/m²`,
  };
  const femaleFields = {
    'Menopause Status': menopauseStatus,
    'Age at Menarche': ageAtMenarche,
    'Number of Pregnancies': numberOfPregnancies,
    'Number of Children': numberOfChildren,
    'HRT Type': hrtType,
    'HRT Duration': hrtDuration,
    'Contraception Type': contraceptionType,
    'Contraception Duration': contraceptionDuration,
  };
  if (gender === 'Female')
    displayData = {
      ...displayData,
      ...femaleFields,
    };

  const tableData = splitIntoColumns(displayData, 2);
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
            <SimpleTable data={tableFormat(tableData[0])} />
          </Col>
          <Col xs={6}>
            <SimpleTable data={tableFormat(tableData[1])} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DonorDataTable;
