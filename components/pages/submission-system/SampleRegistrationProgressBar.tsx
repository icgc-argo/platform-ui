import { useQuery } from '@apollo/react-hooks';
import usePageContext from 'global/hooks/usePageContext';
import get from 'lodash/get';
import * as React from 'react';
import Progress, { PROGRESS_STATUS } from 'uikit/Progress';
import GET_REGISTRATION from './program-sample-registration/gql/GET_REGISTRATION.gql';
import { ClinicalRegistration } from './program-sample-registration/types';
import { useSubmissionSystemDisabled } from './SubmissionSystemLockedNotification';

const SampleRegistrationProgressBar: React.ComponentType = () => {
  const {
    query: { shortName: programShortName },
  } = usePageContext();

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
