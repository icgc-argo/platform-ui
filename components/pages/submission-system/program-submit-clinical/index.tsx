/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { useQuery } from '@apollo/client';
import { Banner, css, Container, Icon, Link, styled, TitleBar, useTheme } from '@icgc-argo/uikit';
import { useRouter } from 'next/router';
import { Row, Col, setConfiguration } from 'react-grid-system';

import { getConfig } from 'global/config';

import PROGRAM_SUMMARY_QUERY from 'components/pages/program-entity/gql/PROGRAM_SUMMARY_QUERY';
import ProgramSummaryTable from 'components/pages/program-entity/ProgramCardsLayout/ProgramSummaryTable';
import { createProgramSummaryData } from 'components/pages/program-entity/ProgramCardsLayout/util';
import SubmissionLayout from '../layout';

setConfiguration({ gutterWidth: 9 });

const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

export default function ProgramSubmitClinical() {
  const programShortName = useRouter().query.shortName as string;
  const { data: { program = [] } = {}, loading } = useQuery(PROGRAM_SUMMARY_QUERY, {
    variables: { shortName: programShortName },
  });

  const programSummaryData = loading ? {} : createProgramSummaryData(program);
  const { RDPC_PORTAL_URL } = getConfig();
  const theme = useTheme();

  return (
    <SubmissionLayout
      subtitle={`${programShortName} Submit Clinical Data`}
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          `}
        >
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Submit Clinical Data
              </div>
            </Row>
          </TitleBar>
          <Link
            target="_blank"
            href={RDPC_PORTAL_URL}
            bold
            withChevron
            uppercase
            underline={false}
            css={css`
              font-size: 14px;
            `}
          >
            HELP
          </Link>
        </div>
      }
    >
      <div>
        <PaddedRow
          css={css`
            display: flex;
            align-content: center;
          `}
        >
          <PaddedColumn md={12} sm={12}>
            <Banner
              title={
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}
                >
                  <Link
                    target="_blank"
                    href={RDPC_PORTAL_URL}
                    bold
                    css={css`
                      font-size: 20px;
                    `}
                  >
                    Submit Data: Access RDPC Portal to submit clinical and molecular data.
                    <Icon
                      name={'chevron_right'}
                      fill={theme.colors.secondary}
                      width={'22px'}
                      height={'22px'}
                      css={css`
                        position: absolute;
                        right: 20px;
                      `}
                    />
                  </Link>
                </div>
              }
              css={css`
                padding: 20px;
                display: flex;
                align-items: center;
              `}
              icon={
                <div
                  css={css`
                    border-radius: 100%;
                    background-color: ${theme.colors.secondary};
                    width: 44px;
                    height: 44px;
                    position: relative;
                  `}
                >
                  <Icon
                    name={'programs'}
                    fill={theme.colors.white}
                    width={'22px'}
                    height={'22px'}
                    css={css`
                      position: absolute;
                      left: 25%;
                      top: 25%;
                    `}
                  />
                </div>
              }
            />
          </PaddedColumn>
          <PaddedColumn md={12} sm={12}>
            <Container
              css={css`
                display: flex;
                padding: 20px;
                padding-top: 0px;
                height: 100%;
              `}
            >
              <ProgramSummaryTable
                data={loading ? { ...programSummaryData, Website: 'loading' } : programSummaryData}
                title={'Program Summary'}
              />
            </Container>
          </PaddedColumn>
        </PaddedRow>
      </div>
    </SubmissionLayout>
  );
}
