import { FileCard, TableDiv } from '../common';
import { css } from '@emotion/core';
import VerticalTabs from 'uikit/VerticalTabs';
import { Col, Row } from 'react-grid-system';
import { DonorRecord } from '../types';
import React from 'react';

import Link from 'uikit/Link';
import Typography from 'uikit/Typography';
import styled from '@emotion/styled';
import { useTheme } from 'uikit/ThemeProvider';
import SimpleTable from 'uikit/Table/SimpleTable';

export default ({ donors }: { donors: Array<DonorRecord> }) => {
  const theme = useTheme();

  const [selectedDonor, setSelectedDonor] = React.useState(donors[0]);

  const formatDonorInfo = (donorInfo: DonorRecord) => {
    return {
      'Donor ID': <Link href="">{donorInfo.donorId}</Link>,
      'Submitted Donor ID': donorInfo.submitterDonorId,
      'Primary Site': donorInfo.primarySite,
      'Cancer Type': donorInfo.cancerType,
      'Age at Diagnosis': donorInfo.ageAtDiagnosis,
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
          <div
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
          </div>
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
                      Submitter Specimen ID:{' '}
                      <Link href="" bold>
                        {selectedDonor.associations.specimenId}
                      </Link>
                    </div>

                    <div>
                      Tumour Normal Designation:{' '}
                      <b>{selectedDonor.associations.tumourNormalDesignation}</b>
                    </div>
                  </PaddedDiv>
                  <PaddedDiv
                    css={css`
                      border-bottom: 1px ${theme.colors.grey_2} solid;
                    `}
                  >
                    <div>
                      Submitter Sample ID:{' '}
                      <Link href="" bold>
                        {selectedDonor.associations.sampleId}
                      </Link>
                    </div>
                    <div>
                      Sample Type: <b>{selectedDonor.associations.sampleType}</b>
                    </div>
                  </PaddedDiv>
                  <PaddedDiv>
                    <div>
                      Matched Normal Submitter Sample ID:{' '}
                      <Link bold href="">
                        {selectedDonor.associations.matchedNormalSampleId}
                      </Link>
                    </div>
                  </PaddedDiv>
                </Typography>
              </PaddedCol>
            </Row>
          </Col>
        </div>
      </TableDiv>
    </FileCard>
  );
};
