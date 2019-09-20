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
import type { FileEntry } from './FileTable';

type ClinicalRecords = Array<{
  row: number,
  fields: Array<{
    name: string,
    value: string,
  }>,
}>;

type ClinicalRegistration = {
  id: string,
  createdAt: string,
  creator: string,
  fileName: string,
  newDonors: {
    count: number,
  },
  newSpecimens: {
    count: number,
  },
  newSamples: {
    count: number,
  },
  alreadyRegistered: {
    count: number,
  },
  records: ClinicalRecords,
};

const recordsToFileTable = (records: ClinicalRecords): Array<FileEntry> =>
  records.map(record => {
    const fields = get(record, 'fields', []);
    const data = fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
    return { ...data, row: record.row };
  });
import { ERROR_CODES } from './common';

export default function ProgramIDRegistration() {
  const [errorBanner, setErrorBanner] = React.useState({ title: '', content: '', visible: false });

  // data
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

  const noData = loading || !clinicalRegistration.id;

  const showError = ({ errorCode, fileName }) => {
    const { title, content } = ERROR_CODES[errorCode];

    setErrorBanner({
      visible: true,
      title: title(fileName),
      content: content,
    });
  };

  // styles
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
        <Instructions registrationEnabled={false} showError={showError} />
      </Container>
      {errorBanner.visible ? (
        <Banner
          css={css`
            margin-top: 20px;
          `}
          title={errorBanner.title}
          variant={BANNER_VARIANTS.ERROR}
          content={errorBanner.content}
        />
      ) : null}

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
            <FileTable
              records={recordsToFileTable(fileRecords)}
              stats={stats}
              submissionInfo={submissionInfo}
            />
          </>
        ) : (
          <NoDataMessage />
        )}
      </Container>
    </SubmissionLayout>
  );
}
