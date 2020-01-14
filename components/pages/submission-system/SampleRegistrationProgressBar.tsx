import { useQuery } from '@apollo/react-hooks';
import usePageContext from 'global/hooks/usePageContext';
import get from 'lodash/get';
import * as React from 'react';
import Progress, { PROGRESS_STATUS } from 'uikit/Progress';
import GET_REGISTRATION from './program-sample-registration/gql/GET_REGISTRATION.gql';
import { ClinicalRegistration } from './program-sample-registration/types';

const SampleRegistrationProgressBar: React.ComponentType = () => {
  const [progress, setProgress] = React.useState([
    PROGRESS_STATUS.DISABLED,
    PROGRESS_STATUS.DISABLED,
  ]);

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

  // update progress steps
  React.useEffect(() => {
    if (clinicalRegistration && clinicalRegistration.records.length > 0) {
      setProgress([PROGRESS_STATUS.SUCCESS, PROGRESS_STATUS.PENDING]);
    } else if (schemaOrValidationErrors.length > 0) {
      setProgress([PROGRESS_STATUS.ERROR, PROGRESS_STATUS.DISABLED]);
    }
    return () => setProgress([PROGRESS_STATUS.DISABLED, PROGRESS_STATUS.DISABLED]);
  }, [clinicalRegistration, schemaOrValidationErrors]);

  return (
    <Progress>
      <Progress.Item state={progress[0]} text="Upload" />
      <Progress.Item state={progress[1]} text="Register" />
    </Progress>
  );
};

export default SampleRegistrationProgressBar;
