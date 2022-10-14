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
import { SimpleTable, styled, Typography, useTheme } from '@icgc-argo/uikit';
import * as React from 'react';
import { Col, Row } from 'react-grid-system';
import { FileCard, TableDiv } from '../common';
import { DonorRecord } from '../types';

const AssociatedDonors = ({ donors }: { donors: Array<DonorRecord> }) => {
  const theme = useTheme();

  const [selectedDonor, setSelectedDonor] = React.useState(donors[0]);

  const formatDonorInfo = (donorInfo: DonorRecord) => {
    return {
      'Donor ID': donorInfo.donorId,
      'Submitter Donor ID': donorInfo.submitterDonorId,
      // Hiding Clinical fields for now as per: https://github.com/icgc-argo/platform-ui/issues/2090
      // 'Primary Site': donorInfo.primarySite,
      // 'Cancer Type': donorInfo.cancerType,
      // 'Age at Diagnosis': donorInfo.ageAtDiagnosis,
    };
  };

  const PaddedDiv = styled('div')`
    padding: 8px 0;
  `;
  const PaddedCol = styled(Col)`
    padding-bottom: 20px;
  `;

  return (
    <FileCard cardTitle="Associated Donors">
      <TableDiv>
        <div
          css={css`
            position: relative;
            width: 100%;
            display: flex;
            border: 1px solid ${theme.colors.grey_2};
          `}
        >
          {/* TODO: restore donor tabs once files are associated with multiple donors */}
          {/* <div
            css={css`
              width: 170px;
              max-width: 170px;
              min-width: 170px;
              overflow: visible;
            `}
          >
            <VerticalTabs
              css={css`
                height: 100%;
              `}
            >
              {donors.map((donor) => (
                <VerticalTabs.Item
                  key={donor.donorId}
                  active={selectedDonor === donor}
                  onClick={(e) => setSelectedDonor(donor)}
                >
                  <div>{donor.donorId}</div>
                </VerticalTabs.Item>
              ))}
            </VerticalTabs>
          </div> */}
          <Col style={{ position: 'relative', overflow: 'hidden' }}>
            <Row
              css={css`
                padding: 10px;
              `}
            >
              <PaddedCol lg={6} md={12}>
                <div
                  css={css`
                    padding-bottom: 10px;
                  `}
                >
                  <Typography variant="default" as="span" color="primary">
                    Donor
                  </Typography>
                </div>

                <SimpleTable data={formatDonorInfo(selectedDonor)} />
              </PaddedCol>
              <PaddedCol lg={6} md={12}>
                <Typography variant="default" as="span" color="primary">
                  Associated Specimen and Samples
                </Typography>

                <Typography variant="data">
                  <PaddedDiv
                    css={css`
                      padding-top: 20px;
                    `}
                  >
                    <div>
                      Submitter Specimen ID: <b>{selectedDonor.associations.specimenId}</b>
                    </div>

                    <div>
                      Tumour Normal Designation:{' '}
                      <b>{selectedDonor.associations.tumourNormalDesignation}</b>
                    </div>

                    <div>
                      Specimen Type: <b>{selectedDonor.associations.specimenType}</b>
                    </div>
                  </PaddedDiv>
                  <PaddedDiv>
                    <div>
                      Submitter Sample ID: <b>{selectedDonor.associations.sampleId}</b>
                    </div>
                    <div>
                      Sample Type: <b>{selectedDonor.associations.sampleType}</b>
                    </div>
                  </PaddedDiv>
                  {selectedDonor.associations.tumourNormalDesignation !== 'Normal' && (
                    <PaddedDiv
                      css={css`
                        border-top: 1px ${theme.colors.grey_2} solid;
                      `}
                    >
                      <div>
                        Matched Normal Submitter Sample ID:{' '}
                        <b>{selectedDonor.associations.matchedNormalSampleId}</b>
                      </div>
                    </PaddedDiv>
                  )}
                </Typography>
              </PaddedCol>
            </Row>
          </Col>
        </div>
      </TableDiv>
    </FileCard>
  );
};

export default AssociatedDonors;
