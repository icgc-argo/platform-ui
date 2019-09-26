import { useMutation, useQuery } from '@apollo/react-hooks';
import usePageContext from 'global/hooks/usePageContext';
import get from 'lodash/get';
import * as React from 'react';
import { Row } from 'react-grid-system';
import { css } from 'uikit';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from 'uikit/Button';
import Container from 'uikit/Container';
import DnaLoader from 'uikit/DnaLoader';
import Link from 'uikit/Link';
import Progress, { PROGRESS_STATUS } from 'uikit/Progress';
import TitleBar from 'uikit/TitleBar';
import Typography from 'uikit/Typography';
import SubmissionLayout from '../layout';
import CLEAR_CLINICAL_REGISTRATION_MUTATION from './CLEAR_CLINICAL_REGISTRATION_MUTATION.gql';
import FileTable from './FileTable';
import NoDataMessage from './FileTable/NoDataMessage';
import GET_REGISTRATION from './GET_REGISTRATION.gql';
import Instructions from './Instructions';
import { FileEntry } from './FileTable';
import type { FileEntry } from './FileTable';
import { ERROR_CODES } from './common';
import { useModalViewAnalyticsEffect } from 'global/hooks/analytics';
import ErrorTable from './ErrorTable';

type ClinicalRecords = Array<{
  row: number;
  fields: Array<{
    name: string;
    value: string;
  }>;
}>;

type ClinicalRegistration = {
  id: string;
  createdAt: string;
  creator: string;
  fileName: string;
  newDonors: {
    count: number;
  };
  newSpecimens: {
    count: number;
  };
  newSamples: {
    count: number;
  };
  alreadyRegistered: {
    count: number;
  };
  records: ClinicalRecords;
};

export type RegisterState = 'INPROGRESS' | 'FINISHED' | '';

const registerStateStringMap: { [key in RegisterState]: string } = {
  INPROGRESS: 'Registering...',
  FINISHED: 'Registered!',
  '': '',
};

const recordsToFileTable = (records: ClinicalRecords): Array<FileEntry> =>
  records.map(record => {
    const fields = get(record, 'fields', []);
    const data = fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {} as any);
    return { ...data, row: record.row };
  });

export default function ProgramIDRegistration() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const { data: { clinicalRegistration = undefined } = {}, loading, updateQuery } = useQuery<{
    clinicalRegistration: ClinicalRegistration;
  }>(GET_REGISTRATION, {
    variables: { shortName: programShortName },
  });
  const fileErrors = get(clinicalRegistration, 'errors', []);
  const fileRecords = get(clinicalRegistration, 'records', []);

  const [errorBanner, setErrorBanner] = React.useState({ title: '', content: '', visible: false });
  const [progress, setProgress] = React.useState([
    PROGRESS_STATUS.DISABLED,
    PROGRESS_STATUS.DISABLED,
  ]);

  const [clearRegistration] = useMutation(CLEAR_CLINICAL_REGISTRATION_MUTATION);

  const [registerString, setRegisterString] = React.useState('');
  const setRegisterState = (state: RegisterState) => {
    setRegisterString(registerStateStringMap[state]);
  };

  const handleClearClick = () => {
    clearRegistration({
      variables: {
        shortName: programShortName,
        registrationId: get(clinicalRegistration, 'id'),
      },
    })
      .then(() => {
        updateQuery(prev => {
          return { ...prev, clinicalRegistration: null };
        });
      })
      .catch(console.log);
  };

  // Data formatting
  let submissionInfo = null;
  let stats = null;
  if (clinicalRegistration) {
    const {
      createdAt,
      creator,
      fileName,
      alreadyRegistered,
      newDonors,
      newSamples,
      newSpecimens,
    } = clinicalRegistration;
    submissionInfo = { createdAt, creator, fileName };
    stats = {
      newCount: alreadyRegistered.count,
      existingCount: newDonors.count + newSamples.count + newSpecimens.count,
    };
  }

  const noData = loading || !clinicalRegistration.id;
  const hasError = errorBanner.visible || fileErrors;
  const hasFileErrors = fileErrors.length > 0;

  const responseTypes = {
    CLINICAL_REG_INVALID: 'ClinicalRegistrationInvalid',
    CLINICAL_REG_DATA: 'ClinicalRegistrationData',
  };

  const onUpload = async ({ response, fileName }) => {
    const { __typename: respType, ...resp } = response;
    // resolve if upload error or data
    if (respType === responseTypes.CLINICAL_REG_INVALID) {
      showError({ errorCode: ERROR_CODES.INVALID_FILE_NAME.code, fileName });
    }
  };

  const showError = ({ errorCode, fileName }) => {
    const { title, content } = ERROR_CODES[errorCode];
    setProgress([PROGRESS_STATUS.ERROR, PROGRESS_STATUS.DISABLED]);
    setErrorBanner({
      visible: true,
      title: title(fileName),
      content: content,
    });
  };

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
                  state={
                    noData
                      ? PROGRESS_STATUS.DISABLED
                      : registerString == registerStateStringMap['FINISHED']
                      ? PROGRESS_STATUS.SUCCESS
                      : PROGRESS_STATUS.PENDING
                  }
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
      {registerString && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          `}
        >
          <DnaLoader
            css={css`
              margin-bottom: 10px;
            `}
          />
          <Typography color="secondary">{registerString}</Typography>
        </div>
      )}
      <div
        css={css`
          opacity: ${!!registerString ? 0.3 : 1};
          pointer-events: ${!!registerString ? 'none' : 'auto'};
        `}
      >
        <Container
          css={css`
            ${containerStyle}
            padding-bottom: 0px;
          `}
        >
          <Instructions
            registrationEnabled={!!get(clinicalRegistration, 'id')}
            shortName={programShortName as string}
            registrationId={get(clinicalRegistration, 'id')}
            setRegisterState={setRegisterState}
          />
        </Container>

        <Container css={containerStyle}>
          {fileRecords.length > 0 ? (
            <>
              <div css={cardHeaderContainerStyle}>
                <Typography color="primary" variant="subtitle2" component="span">
                  File Preview
                </Typography>
                <Button
                  variant={BUTTON_VARIANTS.TEXT}
                  size={BUTTON_SIZES.SM}
                  onClick={handleClearClick}
                >
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
      </div>
    </SubmissionLayout>
  );
}
