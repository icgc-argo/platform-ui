// @flow
import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { useRouter } from 'next/router';
import usePageContext from 'global/hooks/usePageContext';
import Progress, { PROGRESS_STATUS } from 'uikit/Progress';
import { Row, Col } from 'react-grid-system';
import Link from 'uikit/Link';
import Instructions from './Instructions';
import Container from 'uikit/Container';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Typography from 'uikit/Typography';
import FileTable from './FileTable';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import { useQuery } from '@apollo/react-hooks';
import GET_REGISTRATION from './GET_REGISTRATION.gql';
import get from 'lodash/get';
import NoDataMessage from './FileTable/NoDataMessage';

const mockEntries = [
  {
    row: '1',
    isNew: true,
    program_id: 'program_id',
    submitter_donor_id: 'submitter_donor_id',
    gender: 'gender',
    submitter_specimen_id: 'submitter_specimen_id',
    specimen_type: 'specimen_type',
    tumour_normal_designation: 'tumour_normal_designation',
    submitter_sample_id: 'submitter_sample_id',
    sample_type: 'sample_type',
  },
  {
    row: '2',
    isNew: true,
    program_id: 'program_id',
    submitter_donor_id: 'submitter_donor_id',
    gender: 'gender',
    submitter_specimen_id: 'submitter_specimen_id',
    specimen_type: 'specimen_type',
    tumour_normal_designation: 'tumour_normal_designation',
    submitter_sample_id: 'submitter_sample_id',
    sample_type: 'sample_type',
  },
];

export default function ProgramIDRegistration() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const { data: { clinicalRegistration } = {}, loading } = useQuery(GET_REGISTRATION, {
    variables: { shortName: programShortName },
  });

  const fileRecords = get(clinicalRegistration, 'records', []);
  const submissionInfo = clinicalRegistration
    ? {
        createdAt: clinicalRegistration.createdAt,
        creator: clinicalRegistration.creator,
        fileName: clinicalRegistration.fileName,
      }
    : null;

  const stats = clinicalRegistration
    ? {
        existingCount: clinicalRegistration.alreadyRegistered.count,
        newCount:
          clinicalRegistration.newDonors.count +
          clinicalRegistration.newSpecimens.count +
          clinicalRegistration.newSamples.count,
      }
    : null;

  const containerStyle = css`
    padding: 8px;
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  `;

  const pageHeaderStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const cardHeaderContainerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  `;

  const noData = loading || !clinicalRegistration.id;

  return (
    <SubmissionLayout
      contentHeader={
        <div css={pageHeaderStyle}>
          <TitleBar>
            <>{programShortName}</>
            <Row nogutter align="center">
              <div
                css={css`
                  margin-right: 20px;
                `}
              >
                Register Samples
              </div>
              <Progress>
                <Progress.Item
                  state={noData ? PROGRESS_STATUS.DISABLED : PROGRESS_STATUS.SUCCESS}
                  text="Upload"
                />
                <Progress.Item
                  state={noData ? PROGRESS_STATUS.DISABLED : PROGRESS_STATUS.PENDING}
                  text="Register"
                />
              </Progress>
            </Row>
          </TitleBar>
          <Link
            css={css`
              font-size: 12px;
            `}
            withChevron
            underline={false}
            bold
          >
            HELP
          </Link>
        </div>
      }
    >
      <Container
        css={css`
          ${containerStyle}
          padding-bottom: 0px;
        `}
      >
        <Instructions registrationEnabled={false} />
      </Container>

      <Container css={containerStyle}>
        {fileRecords.length > 0 ? (
          <>
            <div css={cardHeaderContainerStyle}>
              <Typography color="primary" variant="subtitle2" component="span">
                File Preview
              </Typography>
              <Button variant={BUTTON_VARIANTS.TEXT} size={BUTTON_SIZES.SM}>
                Clear
              </Button>
            </div>
            <FileTable records={fileRecords} stats={stats} submissionInfo={submissionInfo} />
          </>
        ) : (
          <NoDataMessage />
        )}
      </Container>
    </SubmissionLayout>
  );
}
