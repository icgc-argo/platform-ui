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

import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { css } from '@emotion/core';
import Notification from 'uikit/notifications/Notification';
import CLINICAL_SUBMISSION_SYSTEM_DISABLED from './CLINICAL_SUBMISSION_SYSTEM_DISABLED.gql';

// Note: submission system disabled means disabled for both sample_registraiton and clinical_submission in clinical
export const useSubmissionSystemDisabled = (): boolean => {
  const { data: { clinicalSubmissionSystemDisabled = undefined } = {} } = useQuery(
    CLINICAL_SUBMISSION_SYSTEM_DISABLED,
  );

  return clinicalSubmissionSystemDisabled as boolean;
};

export const SubmissionSystemLockedNotification = ({
  marginTop,
  marginBottom,
  canClose = false,
}: {
  marginTop?: number;
  marginBottom?: number;
  canClose?: boolean;
}) => {
  const [showNotification, setshowNotification] = React.useState(true);
  const isWorkspaceDisabled = useSubmissionSystemDisabled();

  const getContent = () => (
    <div
      css={css`
        padding: 8px 8px 8px 0px;
      `}
    >
      {`The ARGO DCC has currently locked all submissions. Your workspace will be unlocked shortly.`}
    </div>
  );

  const handleOnInteraction: React.ComponentProps<typeof Notification>['onInteraction'] = () => {
    setshowNotification(false);
  };

  return (
    (isWorkspaceDisabled && showNotification && (
      <Notification
        css={css`
          margin-top: ${marginTop}px;
          margin-bottom: ${marginBottom}px;
        `}
        size="SM"
        variant="WARNING"
        title={`Your program workspace is locked`}
        content={getContent()}
        interactionType={canClose ? 'CLOSE' : 'NONE'}
        onInteraction={handleOnInteraction}
      />
    )) ||
    null
  );
};
