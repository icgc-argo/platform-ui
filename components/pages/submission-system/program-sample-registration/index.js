// @flow
import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import { useRouter } from 'next/router';
import usePageContext from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row, Col } from 'react-grid-system';
import Link from 'uikit/Link';
import Instructions from './Instructions';
import Container from 'uikit/Container';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Typography from 'uikit/Typography';
import FileTable from './FileTable';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';

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

  const fileRecords = mockEntries;

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
                <Progress.Item state="success" text="Upload" />
                <Progress.Item state="pending" text="Register" />
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
      <Banner
        title={`1 unrecognized file has been uploaded: schrod-reg.tsv`}
        variant={BANNER_VARIANTS.ERROR}
        content={`Please retain the template file name and only append characters to the end. For example, registration<_optional_extension>.tsv`}
      />
      <Container
        css={css`
          ${containerStyle}
          padding-bottom: 0px;
        `}
      >
        <Instructions registrationEnabled={false} />
      </Container>
      <Container css={containerStyle}>
        <div css={cardHeaderContainerStyle}>
          <Typography color="primary" variant="subtitle2" component="span">
            File Preview
          </Typography>
          <Button variant={BUTTON_VARIANTS.TEXT} size={BUTTON_SIZES.SM}>
            Clear
          </Button>
        </div>
        <FileTable
          records={fileRecords}
          stats={{ existingCount: 2, newCount: 3 }}
          submissionInfo={{ createdAt: 'May 20, 2020', creator: 'Minh', fileName: 'Minh.tsv' }}
        />
      </Container>
    </SubmissionLayout>
  );
}
