import Container from 'uikit/Container';
import { css, keyframes } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled-base';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import PercentBar from 'uikit/PercentBar';
import DASHBOARD_SUMMARY_QUERY from './DASHBOARD_SUMMARY_QUERY.gql';
import { useQuery } from '@apollo/react-hooks';
import { usePageQuery } from 'global/hooks/usePageContext';
import _ from 'lodash';
import { POLL_INTERVAL_MILLISECONDS } from '../common';

const StatDesc = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
  justify-content: space-between;
`;

const Statistic: React.ComponentType<{ quantity: String; description: String }> = ({
  children,
  quantity,
  description,
}) => (
  <StatDesc>
    {/* Div for Quantity */}
    <div>
      <div
        css={css`
          height: 30px;
          padding-bottom: 4px;
        `}
      >
        <Typography variant="title">{quantity}</Typography>
      </div>
      {/* Div for Description */}
      <div
        css={css`
          padding-bottom: 8px;
          min-width: 120px;
        `}
      >
        <Typography color="grey" variant="caption">
          {description}
        </Typography>
      </div>
    </div>

    <div
      css={css`
        padding-bottom: 10px;
      `}
    >
      {children}
    </div>
  </StatDesc>
);

type ProgramDonorSummaryStats = {
  registeredDonorsCount: number;
  percentageCoreClinical: number;
  percentageTumourAndNormal: number;
  donorsProcessingMolecularDataCount: number;
  filesToQcCount: number;
  donorsWithReleasedFilesCount: number;
  allFilesCount: number;
  fullyReleasedDonorsCount: number;
  partiallyReleasedDonorsCount: number;
  noReleaseDonorsCount: number;
};

type Program = {
  commitmentDonors: number;
};

type DasboardSummaryData = {
  programDonorSummaryStats: ProgramDonorSummaryStats;
  program: Program;
};

type DashboardSummaryDataVariables = {
  programShortName: string;
};

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { data, loading } = useQuery<DasboardSummaryData, DashboardSummaryDataVariables>(
    DASHBOARD_SUMMARY_QUERY,
    {
      variables: { programShortName: programShortName },
      pollInterval: POLL_INTERVAL_MILLISECONDS,
    },
  );
  return (
    <div>
      <Container>
        <Row justify="around">
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${data.programDonorSummaryStats.registeredDonorsCount}`}
                description="Registered Donors"
              >
                <PercentBar
                  num={data.programDonorSummaryStats.registeredDonorsCount}
                  den={data.program.commitmentDonors}
                  fillColor={
                    data.programDonorSummaryStats.registeredDonorsCount ===
                    data.program.commitmentDonors
                      ? 'success'
                      : 'warning'
                  }
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Registered Donors">
                <PercentBar num={0} den={100} fillColor="warning" />
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${(data.programDonorSummaryStats.percentageCoreClinical * 100).toFixed(
                  2,
                )}%`}
                description="Donors with all Core Clinical Data"
              >
                <PercentBar
                  num={data.programDonorSummaryStats.percentageCoreClinical * 100}
                  den={100}
                  fillColor={
                    data.programDonorSummaryStats.percentageCoreClinical === 1
                      ? 'success'
                      : 'warning'
                  }
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Donors with all Core Clinical Data">
                <PercentBar num={0} den={100} fillColor="warning" />
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${(
                  data.programDonorSummaryStats.percentageTumourAndNormal * 100
                ).toFixed(2)}%`}
                description="Donors with Tumour & Normal"
              >
                <PercentBar
                  num={data.programDonorSummaryStats.percentageTumourAndNormal * 100}
                  den={100}
                  fillColor={
                    data.programDonorSummaryStats.percentageTumourAndNormal === 1
                      ? 'success'
                      : 'warning'
                  }
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Donors with Tumour & Normal">
                <PercentBar num={0} den={100} fillColor="warning" />
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${data.programDonorSummaryStats.donorsProcessingMolecularDataCount}`}
                description="Donors in Molecular Data Processing"
              />
            ) : (
              <Statistic quantity="..." description="Donors in Molecular Data Processing" />
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${data.programDonorSummaryStats.filesToQcCount}`}
                description="Files to QC"
              >
                <Button variant="text">
                  <Icon
                    css={css`
                      padding-right: 4px;
                    `}
                    name="download"
                    height="12px"
                  />
                  Manifest
                </Button>
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Files to QC">
                <Button variant="text" disabled>
                  <Icon
                    css={css`
                      padding-right: 4px;
                    `}
                    name="download"
                    fill="grey_2"
                    height="12px"
                  />
                  Manifest
                </Button>
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${data.programDonorSummaryStats.donorsWithReleasedFilesCount}`}
                description="Donors with Released Files"
              >
                <PercentBar
                  num={data.programDonorSummaryStats.donorsWithReleasedFilesCount}
                  den={data.programDonorSummaryStats.registeredDonorsCount}
                  fillColor="secondary"
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Donors with Released Files">
                <PercentBar num={0} den={100} fillColor="secondary" />
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${data.programDonorSummaryStats.allFilesCount}`}
                description="All Files"
              >
                <Button variant="text">
                  <Icon
                    css={css`
                      padding-right: 4px;
                    `}
                    name="download"
                    height="12px"
                  />
                  Manifest
                </Button>
              </Statistic>
            ) : (
              <Statistic quantity="..." description="All Files">
                <Button variant="text" disabled>
                  <Icon
                    css={css`
                      padding-right: 4px;
                    `}
                    name="download"
                    fill="grey_2"
                    height="12px"
                  />
                  Manifest
                </Button>
              </Statistic>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
