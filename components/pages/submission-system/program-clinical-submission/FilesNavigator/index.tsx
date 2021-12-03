/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { ClinicalSubmissionEntityFile, ClinicalSubmissionQueryData } from '../types';
import FileRecordTable from './FileRecordTable';
import { Col } from 'react-grid-system';
import { useToaster } from 'global/hooks/toaster';
import ContentPlaceholder from 'uikit/ContentPlaceholder';
import ErrorNotification, { getDefaultColumns } from '../../ErrorNotification';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import CLEAR_SUBMISSION_MUTATION from '../gql/CLEAR_SUBMISSION_MUTATION.gql';
import { useMutation } from '@apollo/react-hooks';
import { ClearSubmissionMutationVariables } from '../types';
import useCommonToasters from 'components/useCommonToasters';
import { useClinicalSubmissionQuery } from '..';
import { toDisplayError } from 'global/utils/clinicalUtils';
import { useSubmissionSystemDisabled } from '../../SubmissionSystemLockedNotification';
import { NOTIFICATION_VARIANTS } from 'uikit/notifications/Notification';

const FilesNavigator = ({
  fileStates,
  clearDataError,
  submissionState,
  selectedClinicalEntityType,
  onFileSelect,
  programShortName,
  submissionVersion,
}: {
  submissionState: ClinicalSubmissionQueryData['clinicalSubmissions']['state'];
  fileStates: Array<ClinicalSubmissionEntityFile>;
  clearDataError: (file: ClinicalSubmissionEntityFile) => Promise<any>;
  selectedClinicalEntityType: string;
  onFileSelect: (clinicalEntityType: string) => void;
  submissionVersion: ClinicalSubmissionQueryData['clinicalSubmissions']['version'];
  programShortName: ClinicalSubmissionQueryData['clinicalSubmissions']['programShortName'];
}) => {
  const commonToaster = useCommonToasters();
  const [clearClinicalEntitySubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ClearSubmissionMutationVariables
  >(CLEAR_SUBMISSION_MUTATION);

  const { refetch: refetchClinicalSubmission } = useClinicalSubmissionQuery(programShortName);
  const isPendingApproval = submissionState === 'PENDING_APPROVAL';
  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const toaster = useToaster();
  const onFileClick = (clinicalType: string) => (e) => {
    onFileSelect(fileStates.find((file) => clinicalType === file.clinicalType).clinicalType);
  };
  const selectedFile = fileStates.find((file) => file.clinicalType === selectedClinicalEntityType);
  const onClearClick = (clinicalType: string) => async (e) => {
    const fileType: string = fileStates.find((file) => clinicalType === file.clinicalType)
      .clinicalType;

    try {
      await clearClinicalEntitySubmission({
        variables: {
          programShortName,
          submissionVersion,
          fileType,
        },
      });
      toaster.addToast({
        variant: 'SUCCESS',
        interactionType: 'CLOSE',
        title: 'Cleared',
        content: `Uploaded ${fileType.toUpperCase()} file has been cleared.`,
      });
    } catch (err) {
      await refetchClinicalSubmission();
      commonToaster.unknownErrorWithReloadMessage();
    }
  };
  const onErrorClearClick = () => {
    clearDataError(selectedFile);
  };
  const shouldShowError = !!selectedFile && !!selectedFile.schemaErrors.length;

  const isSubmissionValidated = ([
    'INVALID',
    'VALID',
    'PENDING_APPROVAL',
  ] as typeof submissionState[]).includes(submissionState);
  return !selectedFile ? (
    <ContentPlaceholder
      css={css`
        width: 100%;
      `}
    />
  ) : (
    <div
      css={css`
        position: relative;
        width: 100%;
        display: flex;
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
          {fileStates.map((fileState) => (
            <VerticalTabs.Item
              key={fileState.clinicalType}
              active={selectedFile.clinicalType === fileState.clinicalType}
              onClick={onFileClick(fileState.clinicalType)}
            >
              <div
                css={css`
                  text-align: left;
                `}
              >
                {fileState.displayName}
              </div>
              {!!fileState.recordsCount &&
                fileState.status !== 'NONE' &&
                fileState.status !== 'ERROR' && (
                  <VerticalTabs.Tag variant={fileState.status}>
                    {fileState.recordsCount}
                  </VerticalTabs.Tag>
                )}
              {fileState.status === 'ERROR' && (
                <VerticalTabs.Tag variant="ERROR">
                  <Icon name="exclamation" fill="#fff" height="10px" width="10px" />
                </VerticalTabs.Tag>
              )}
            </VerticalTabs.Item>
          ))}
        </VerticalTabs>
      </div>
      <Col style={{ position: 'relative', overflow: 'hidden' }}>
        {shouldShowError ? (
          <div
            id="error-submit-clinical-data"
            css={css`
              padding: 16px;
            `}
          >
            <ErrorNotification
              level={NOTIFICATION_VARIANTS.ERROR}
              onClearClick={onErrorClearClick}
              title={`${
                selectedFile.schemaErrors.length
              } error(s) found in uploaded ${selectedFile.displayName.toLowerCase()} file`}
              errors={selectedFile.schemaErrors.map(toDisplayError)}
              subtitle={
                'Your file cannot be processed. Please correct the following errors and reupload your file.'
              }
              columnConfig={getDefaultColumns(NOTIFICATION_VARIANTS.ERROR)}
            />
          </div>
        ) : !!selectedFile.records.length ? (
          <>
            <div
              css={css`
                padding: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Typography
                variant="subtitle2"
                color="primary"
                as="h2"
                css={css`
                  margin: 0px;
                  margin-left: 10px;
                `}
              >
                {selectedFile.displayName} File Preview
              </Typography>
              {!isPendingApproval && (
                <Button
                  id="button-clear-selected-file" // For Selenium
                  variant="text"
                  size="sm"
                  onClick={onClearClick(selectedFile.clinicalType)}
                  disabled={isSubmissionSystemDisabled}
                >
                  clear
                </Button>
              )}
            </div>
            <FileRecordTable
              isSubmissionValidated={isSubmissionValidated}
              isPendingApproval={isPendingApproval}
              file={selectedFile}
              submissionData={{
                fileName: selectedFile.fileName,
                creator: selectedFile.creator,
                createdAt: selectedFile.createdAt,
              }}
            />
          </>
        ) : (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            `}
          >
            <ContentPlaceholder
              title="You do not have any data uploaded."
              subtitle="Follow the instructions above to get started."
            />
          </div>
        )}
      </Col>
    </div>
  );
};

export default FilesNavigator;
