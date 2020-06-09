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

import * as React from 'react';
import Progress from 'uikit/Progress';
import { usePageQuery } from 'global/hooks/usePageContext';
import { ClinicalSubmissionError } from './program-clinical-submission/types';
import { useClinicalSubmissionQuery } from './program-clinical-submission';
import { css } from '@emotion/core';
import { useSubmissionSystemDisabled } from './SubmissionSystemLockedNotification';

const ClinicalSubmissionProgressBar: React.ComponentType<{
  programShortName: string;
  approvalBarWidth?: number;
}> = ({ programShortName, approvalBarWidth }) => {
  const [] = React.useState<FileList | null>(null);

  const { data } = useClinicalSubmissionQuery(programShortName);

  const allDataErrors = React.useMemo(
    () =>
      data.clinicalSubmissions.clinicalEntities.reduce<
        Array<
          ClinicalSubmissionError & {
            fileName: string;
          }
        >
      >(
        (acc, entity) => [
          ...acc,
          ...entity.dataErrors.map(err => ({
            ...err,
            fileName: entity.batchName,
          })),
        ],
        [],
      ),
    [data],
  );

  const hasDataError = !!allDataErrors.length;
  const hasSchemaError =
    !!data.clinicalSubmissions.clinicalEntities.length &&
    data.clinicalSubmissions.clinicalEntities.some(({ schemaErrors }) => !!schemaErrors.length);
  const hasSomeEntity = data.clinicalSubmissions.clinicalEntities.some(
    ({ records }) => !!records.length,
  );
  const hasSchemaErrorsAfterMigration = data.clinicalSubmissions.state === 'INVALID_BY_MIGRATION';
  const isReadyForValidation = hasSomeEntity && !hasSchemaError && !hasSchemaErrorsAfterMigration;
  const isReadyForSignoff = isReadyForValidation && data.clinicalSubmissions.state === 'VALID';
  const isPendingApproval = data.clinicalSubmissions.state === 'PENDING_APPROVAL';
  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const progressStates: {
    upload: React.ComponentProps<typeof Progress.Item>['state'];
    validate: React.ComponentProps<typeof Progress.Item>['state'];
    signOff: React.ComponentProps<typeof Progress.Item>['state'];
  } = {
    upload: isSubmissionSystemDisabled
      ? 'locked'
      : isReadyForValidation
      ? 'success'
      : hasSchemaError || hasSchemaErrorsAfterMigration
      ? 'error'
      : 'disabled',
    validate: isSubmissionSystemDisabled
      ? 'locked'
      : isReadyForSignoff || isPendingApproval
      ? 'success'
      : isReadyForValidation
      ? hasDataError
        ? 'error'
        : 'pending'
      : 'disabled',
    signOff: isSubmissionSystemDisabled
      ? 'locked'
      : isReadyForSignoff
      ? 'pending'
      : isPendingApproval
      ? 'success'
      : 'disabled',
  };

  const pendingApprovalWidth = `${approvalBarWidth || 100}px`;
  return (
    <Progress>
      <Progress.Item text="Upload" state={progressStates.upload} />
      <Progress.Item text="Validate" state={progressStates.validate} />
      <Progress.Item text="Sign Off" state={progressStates.signOff} />
      {isPendingApproval && (
        <Progress.Item
          css={css`
            width: ${pendingApprovalWidth};
          `}
          text="Pending Approval"
          state="locked"
        />
      )}
    </Progress>
  );
};

export default ClinicalSubmissionProgressBar;
