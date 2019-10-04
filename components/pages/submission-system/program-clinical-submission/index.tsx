import * as React from 'react';
import SubmissionLayout from '../layout';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import usePageContext, { usePageQuery } from 'global/hooks/usePageContext';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import VerticalTabs from 'uikit/VerticalTabs';
import Button from 'uikit/Button';
import Instruction from './Instruction';
import Container from 'uikit/Container';
import { containerStyle } from '../common';
import FilesNavigator from './FilesNavigator';
import {
  ClinicalError,
  GqlClinicalSubmissionData,
  ClinicalSubmissionEntityFile,
  GqlClinicalEntity,
} from './types';
import Notification from 'uikit/notifications/Notification';
import { MOCK_FILE_STATE } from './mock';
import CLINICAL_SUBMISSION_QUERY from './CLINICAL_SUBMISSION_QUERY.gql';
import UPLOAD_CLINICAL_SUBMISSION from './UPLOAD_CLINICAL_SUBMISSION.gql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DnaLoader from 'uikit/DnaLoader';
import get from 'lodash/get';
import { capitalize } from 'global/utils/stringUtils';

const gqlClinicalEntityToClinicalSubmissionEntityFile = (
  data: GqlClinicalEntity,
): ClinicalSubmissionEntityFile => {
  return {
    dataErrors: data.dataErrors,
    dataUpdates: data.dataUpdates,
    displayName: capitalize((data.clinicalType || '').split('_').join(' ')),
    id: data.batchName,
    records: data.records,
    recordsCount: data.records.length,
    status: !!data.dataErrors.length ? 'ERROR' : !!data.dataUpdates.length ? 'SUCCESS' : 'WARNING',
  };
};

type UploadFilesMutationVariables = {
  programShortName: string;
  files: FileList;
};

type ClinicalSubmissionQueryData = {
  clinicalSubmissions: GqlClinicalSubmissionData;
};

const useClinicalErrorState = (data: ClinicalSubmissionQueryData) => {
  const [clinicalErrors, setClinicalErrors] = React.useState<ClinicalError[]>([]);
  React.useEffect(() => {
    setClinicalErrors(data.clinicalSubmissions.fileErrors);
  }, [data.clinicalSubmissions.fileErrors]);
  return {
    clinicalErrors,
    removeClinicalErrorWithCode: (_code: string) =>
      setClinicalErrors(clinicalErrors.filter(({ code }) => code !== _code)),
  };
};

export default function ProgramClinicalSubmission() {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [currentFileList, setCurrentFileList] = React.useState<FileList | null>(null);

  const placeHolderResponse: ClinicalSubmissionQueryData = {
    clinicalSubmissions: {
      clinicalEntities: [],
      fileErrors: [],
      id: '',
      state: null,
    },
  };

  const { data = placeHolderResponse, loading: loadingClinicalSubmission } = useQuery<
    ClinicalSubmissionQueryData
  >(CLINICAL_SUBMISSION_QUERY, {
    variables: {
      programShortName,
    },
  });

  const [uploadClinicalSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    UploadFilesMutationVariables
  >(UPLOAD_CLINICAL_SUBMISSION);

  const { clinicalErrors, removeClinicalErrorWithCode } = useClinicalErrorState(data);

  const onErrorClose: (
    code: string,
  ) => React.ComponentProps<typeof Notification>['onInteraction'] = code => ({ type }) => {
    if (type === 'CLOSE') {
      removeClinicalErrorWithCode(code);
    }
  };

  const handleSubmissionFilesUpload = (files: FileList) => {
    setCurrentFileList(files);
    return uploadClinicalSubmission({
      variables: {
        files,
        programShortName,
      },
    });
  };

  const hasDataError = data.clinicalSubmissions.clinicalEntities.reduce((acc, entity) => {
    return acc + (entity.dataErrors.length ? 1 : 0);
  }, 0);
  const hasSomeEntity = !!(data.clinicalSubmissions.clinicalEntities || []).length;
  const hasFileError = !!(data.clinicalSubmissions.fileErrors || []).length;
  const isReadyForValidation = hasSomeEntity && !hasDataError;

  return (
    <SubmissionLayout
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
              {!loadingClinicalSubmission && (
                <Progress>
                  <Progress.Item
                    text="Upload"
                    state={isReadyForValidation ? 'success' : 'disabled'}
                  />
                  <Progress.Item
                    text="Validate"
                    state={isReadyForValidation ? 'pending' : 'disabled'}
                  />
                  <Progress.Item text="Sign Off" state="disabled" />
                </Progress>
              )}
            </Row>
          </TitleBar>
          <Row nogutter align="center">
            <Button
              variant="text"
              disabled
              css={css`
                margin-right: 10px;
              `}
            >
              Clear submission
            </Button>
            <Link
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
          </Row>
        </div>
      }
    >
      <Container css={containerStyle}>
        <Instruction
          onUploadFileSelect={handleSubmissionFilesUpload}
          validationEnabled={isReadyForValidation}
        />
      </Container>
      {clinicalErrors.map(({ code, fileNames, msg }) => (
        <Notification
          key={code}
          css={css`
            margin-top: 20px;
          `}
          variant="ERROR"
          interactionType="CLOSE"
          title={`${fileNames.length} of ${
            (currentFileList || []).length
          } files failed to upload: ${fileNames.join(', ')}`}
          content={msg}
          onInteraction={onErrorClose(code)}
        />
      ))}
      <Container
        css={css`
          ${containerStyle}
          min-height: 100px;
          position: relative;
          padding: 0px;
          min-height: calc(100vh - 240px);
        `}
      >
        {loadingClinicalSubmission ? (
          <div
            css={css`
              position: absolute;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <DnaLoader />
          </div>
        ) : (
          <FilesNavigator
            fileStates={data.clinicalSubmissions.clinicalEntities.map(
              gqlClinicalEntityToClinicalSubmissionEntityFile,
            )}
          />
        )}
      </Container>
    </SubmissionLayout>
  );
}
