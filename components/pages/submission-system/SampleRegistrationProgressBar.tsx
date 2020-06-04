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
import usePageContext from 'global/hooks/usePageContext';
import get from 'lodash/get';
import * as React from 'react';
import Progress, { PROGRESS_STATUS } from 'uikit/Progress';
import GET_REGISTRATION from './program-sample-registration/gql/GET_REGISTRATION.gql';
import { ClinicalRegistration } from './program-sample-registration/types';
import { useSubmissionSystemDisabled } from './SubmissionSystemLockedNotification';

const SampleRegistrationProgressBar: React.ComponentType<{ programShortName: string }> = ({
  programShortName,
}) => {
  const [progress, setProgress] = React.useState([
    PROGRESS_STATUS.DISABLED,
    PROGRESS_STATUS.DISABLED,
  ]);

  const { data: { clinicalRegistration = undefined } = {} } = useQuery<{
    clinicalRegistration: ClinicalRegistration;
  }>(GET_REGISTRATION, {
    variables: { shortName: programShortName },
  });

  const schemaOrValidationErrors = get(
    clinicalRegistration,
    'errors',
    [] as typeof clinicalRegistration.errors,
  );

  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();

  const progressStates: {
    upload: React.ComponentProps<typeof Progress.Item>['state'];
    register: React.ComponentProps<typeof Progress.Item>['state'];
  } = {
    upload: isSubmissionSystemDisabled
      ? 'locked'
      : clinicalRegistration && clinicalRegistration.records.length > 0
      ? 'success'
      : schemaOrValidationErrors.length > 0
      ? 'error'
      : 'disabled',
    register: isSubmissionSystemDisabled
      ? 'locked'
      : clinicalRegistration && clinicalRegistration.records.length > 0
      ? 'pending'
      : schemaOrValidationErrors.length > 0
      ? 'disabled'
      : 'disabled',
  };

  return (
    <Progress>
      <Progress.Item state={progressStates.upload} text="Upload" />
      <Progress.Item state={progressStates.register} text="Register" />
    </Progress>
  );
};

export default SampleRegistrationProgressBar;
