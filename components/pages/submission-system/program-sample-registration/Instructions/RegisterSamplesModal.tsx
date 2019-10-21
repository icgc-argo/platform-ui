import React from 'react';
import Modal from 'uikit/Modal';
import { ModalPortal } from 'components/ApplicationRoot';
import { useMutation } from '@apollo/react-hooks';
import COMMIT_CLINICAL_REGISTRATION_MUTATION from './COMMIT_CLINICAL_REGISTRATION_MUTATION.gql';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import Router from 'next/router';
import { RegisterState } from '..';

import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { sleep } from 'global/utils/common';

export default function RegisterSamplesModal({
  onCancelClick: handleCancelClick,
  shortName,
  registrationId,
  setRegisterState,
}: {
  onCancelClick: () => void;
  shortName: string;
  registrationId: string;
  setRegisterState: (state: RegisterState) => void;
}) {
  const [commitRegistration] = useMutation(COMMIT_CLINICAL_REGISTRATION_MUTATION, {
    variables: {
      shortName,
      registrationId,
    },
  });

  const toaster = useToaster();

  const handleActionClick = async () => {
    handleCancelClick();

    setRegisterState('INPROGRESS');
    await sleep();

    commitRegistration()
      .then(async ({ data, errors }) => {
        setRegisterState('FINISHED');
        await sleep();

        const num = get(data, 'commitClinicalRegistration.length', 0);
        Router.push(
          PROGRAM_DASHBOARD_PATH,
          PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, shortName),
        );

        toaster.addToast({
          interactionType: 'CLOSE',
          title: `${num} new sample${num > 1 ? 's' : ''} have been registered`,
          variant: TOAST_VARIANTS.SUCCESS,
          content: (
            <>If you have any changes to this registered sample data, please contact the DCC.</>
          ),
        });
      })
      .catch(error => {
        toaster.addToast({
          interactionType: 'CLOSE',
          title: '',
          variant: TOAST_VARIANTS.ERROR,
          content: error.toString(),
        });
        setRegisterState('');
      });
  };

  return (
    <ModalPortal>
      <Modal
        title="Are you sure you want to register samples?"
        actionButtonText="YES, REGISTER SAMPLES"
        buttonSize="sm"
        onActionClick={handleActionClick}
        onCancelClick={handleCancelClick}
        onCloseClick={handleCancelClick}
      >
        <div>
          Once these samples are registered, you can submit clinical and molecular data for the
          donors associated with those samples.
        </div>
      </Modal>
    </ModalPortal>
  );
}
