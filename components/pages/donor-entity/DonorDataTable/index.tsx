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

import { css } from '@icgc-argo/uikit';
import { Row, Col } from 'react-grid-system';
import sqonBuilder from 'sqon-builder';
import urlJoin from 'url-join';
import { useQuery } from '@apollo/client';
import Container from '@icgc-argo/uikit/Container';
import SimpleTable from '@icgc-argo/uikit/Table/SimpleTable';
import Typography from '@icgc-argo/uikit/Typography';
import A from '@icgc-argo/uikit/Link';
import Link from 'next/link';
import {
  removeAliasedKeys,
  splitIntoColumns,
  formatTableDisplayNames,
} from '../ClinicalTimeline/util';
import PROGRAMS_LIST_QUERY from '../../submission-system/programs/PROGRAMS_LIST_QUERY.gql';
import { FILE_REPOSITORY_PATH } from 'global/constants/pages';

const DonorDataTable = ({ data }) => {
  const { data: { programs = [] } = {}, loading } = useQuery(PROGRAMS_LIST_QUERY);
  const programFilter = sqonBuilder.has('study_id', data.program_id).build();
  const programFilterUrl = urlJoin(
    FILE_REPOSITORY_PATH,
    `?filters=${encodeURIComponent(JSON.stringify(programFilter))}`,
  );

  const femaleFields = [
    'menopause_status',
    'age_at_menarche',
    'number_of_pregnancies',
    'number_of_children',
    'hrt_type',
    'hrt_duration',
    'contraception_type',
    'contraception_duration',
  ];

  const displayData = data.gender === 'Male' ? removeAliasedKeys(data, femaleFields) : { ...data };

  const currentProgram =
    programs &&
    programs.length > 0 &&
    programs.filter((program) => program.shortName === data.program_id)[0];
  const programName = currentProgram?.name || data.program_id;
  const programLink = (
    <Link href={programFilterUrl} passHref>
      <A>{`${programName} (${data.program_id})`}</A>
    </Link>
  );

  displayData.program_id = programLink;

  const tableData = splitIntoColumns(displayData, 2);

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <Container
        css={css`
          padding: 20px;
          padding-top: 0px;
          padding-right: 10px;
          height: 100%;
          box-sizing: border-box;
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
              height: 100%;
            `}
          >
            <SimpleTable data={formatTableDisplayNames(tableData[0])} />
          </Col>
          <Col
            xs={6}
            css={css`
              height: 100%;
            `}
          >
            <SimpleTable data={formatTableDisplayNames(tableData[1])} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DonorDataTable;
