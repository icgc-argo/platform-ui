import { useMutation, useQuery } from '@apollo/react-hooks';
import usePageContext from 'global/hooks/usePageContext';
import get from 'lodash/get';
import union from 'lodash/union';
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
import CLEAR_CLINICAL_REGISTRATION_MUTATION from './gql/CLEAR_CLINICAL_REGISTRATION_MUTATION.gql';
import FileTable from './FileTable';
import NoDataMessage from './FileTable/NoDataMessage';
import GET_REGISTRATION from './gql/GET_REGISTRATION.gql';
import Instructions from './Instructions';
import { FileEntry } from './FileTable';
import { ERROR_CODES } from './common';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { formatFileName } from './util';
import { containerStyle } from '../common';
import { useToaster } from 'global/hooks/toaster';
import ErrorNotification, { defaultColumns } from '../ErrorNotification';
import { RegisterState, ClinicalRegistrationData, ClinicalRegistration } from './types';

const registerStateStringMap: { [key in RegisterState]: string } = {
  INPROGRESS: 'Registering...',
  FINISHED: 'Registered!',
  '': '',
};

const recordsToFileTable = (
  records: ClinicalRegistrationData[],
  newRows: Array<number>,
): Array<FileEntry> =>
  records.map(record => {
    const fields = get(record, 'fields', []);
    const data = fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {} as any);
    return { ...data, row: record.row, isNew: newRows.includes(record.row) };
  });

export default function ProgramIDRegistration() {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

  const { data: { clinicalRegistration = undefined } = {}, loading, refetch } = useQuery<{
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

  const toaster = useToaster();

  const handleClearClick = async () => {
    if (clinicalRegistration.id == null) {
      refetch();
      return;
    }

    try {
      await clearRegistration({
        variables: {
          shortName: programShortName,
          registrationId: get(clinicalRegistration, 'id'),
        },
      });
      await refetch();
    } catch (err) {
      await refetch();
      toaster.addToast({
        variant: 'ERROR',
        title: 'Something went wrong',
        content: 'Uh oh! It looks like something went wrong. This page has been reloaded.',
      });
    }
  };

  // update progress steps
  React.useEffect(() => {
    if (clinicalRegistration && clinicalRegistration.records.length > 0) {
      setProgress([PROGRESS_STATUS.SUCCESS, PROGRESS_STATUS.PENDING]);
    } else if (fileErrors.length > 0) {
      setProgress([PROGRESS_STATUS.ERROR, PROGRESS_STATUS.DISABLED]);
    } else if (registerString === registerStateStringMap['FINISHED']) {
      setProgress([PROGRESS_STATUS.SUCCESS, PROGRESS_STATUS.SUCCESS]);
    }

    return () => setProgress([PROGRESS_STATUS.DISABLED, PROGRESS_STATUS.DISABLED]);
  }, [clinicalRegistration, fileErrors]);

  // Data formatting
  let submissionInfo = null;
  let stats = null;
  let newRows = [];

  if (clinicalRegistration) {
    const {
      createdAt = '',
      creator = '',
      fileName = '',
      alreadyRegistered,
      newDonors,
      newSamples,
      newSpecimens,
    } = clinicalRegistration;
    submissionInfo = { createdAt, creator, fileName };

    newRows = union(newDonors.rows, newSamples.rows, newSpecimens.rows);

    stats = {
      newCount: newRows.length,
      existingCount: alreadyRegistered.count,
    };
  }

  const responseTypes = {
    CLINICAL_REG_INVALID: 'ClinicalRegistrationInvalid',
    CLINICAL_REG_DATA: 'ClinicalRegistrationData',
  };

  const onUpload = async ({ response, fileName }) => {
    // reset error banner
    setErrorBanner({ visible: false, content: '', title: '' });
    const { __typename: respType, ...resp } = response;
    // display an error banner or clinical data will update with errors array
    if (respType === responseTypes.CLINICAL_REG_INVALID) {
      formatFileName;
      showError({
        errorCode: ERROR_CODES.INVALID_FILE_NAME.code,
        fileName: formatFileName(fileName),
      });
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
                <Progress.Item state={progress[0]} text="Upload" />
                <Progress.Item state={progress[1]} text="Register" />
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
            onUpload={onUpload}
          />
        </Container>

        {errorBanner.visible ? (
          <div
            css={css`
              margin-top: 20px;
            `}
          >
            <Banner
              title={errorBanner.title}
              variant={BANNER_VARIANTS.ERROR}
              content={errorBanner.content}
            />
          </div>
        ) : null}

        <Container
          css={css`
            ${containerStyle}
            min-height: calc(100vh - 390px);
          `}
        >
          {fileRecords.length > 0 ? (
            <>
              <div css={cardHeaderContainerStyle}>
                <Typography
                  css={css`
                    margin: 0;
                  `}
                  color="primary"
                  variant="subtitle2"
                  component="h2"
                >
                  File Preview
                </Typography>
                <Button
                  variant={BUTTON_VARIANTS.TEXT}
                  size={BUTTON_SIZES.SM}
                  onClick={handleClearClick}
                >
                  <Typography variant="data">Clear</Typography>
                </Button>
              </div>
              <FileTable
                records={recordsToFileTable(fileRecords, newRows)}
                stats={stats}
                submissionInfo={submissionInfo}
              />
            </>
          ) : fileErrors.length > 0 ? (
            <ErrorNotification
              onClearClick={handleClearClick}
              title={`${fileErrors.length} errors found in uploaded file`}
              errors={fileErrors}
              subtitle={
                'Your file cannot be processed. Please correct the following errors and reupload your file.'
              }
              columnConfig={defaultColumns}
              tsvExcludeCols={['type', 'specimenId', 'donorId', 'sampleId']}
            />
          ) : (
            <NoDataMessage loading={loading} />
          )}
        </Container>
      </div>
    </SubmissionLayout>
  );
}
