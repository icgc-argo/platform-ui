import * as React from 'react';
import { css } from 'uikit';
import TitleBar from 'uikit/TitleBar';
import Progress from 'uikit/Progress';
import { Row } from 'react-grid-system';
import Link from 'uikit/Link';
import Button from 'uikit/Button';
import useAuthContext from 'global/hooks/useAuthContext';
import { isDccMember } from 'global/utils/egoJwt';
import REOPEN_SUBMISSION_MUTATION from './gql/REOPEN_SUBMISSION_MUTATION.gql';
import APPROVE_SUBMISSION_MUTATION from './gql/APPROVE_SUBMISSION_MUTATION.gql';
import { useMutation } from '@apollo/react-hooks';
import { ClinicalSubmissionQueryData } from './types';
import useUserConfirmationModalState from './useUserConfirmationModalState';
import { ModalPortal } from 'components/ApplicationRoot';
import Modal from 'uikit/Modal';
import DnaLoader from 'uikit/DnaLoader';
import { sleep } from 'global/utils/common';
import { useClinicalSubmissionQuery } from '.';
import useCommonToasters from 'components/useCommonToasters';
import { useRouter } from 'next/router';
import { DCC_PATH } from 'global/constants/pages';
import { useToaster } from 'global/hooks/toaster';

export default ({
  programShortName,
  showProgress,
  progressStates,
  isPendingApproval,
  submissionVersion,
}: {
  programShortName: string;
  showProgress: boolean;
  progressStates: {
    upload: React.ComponentProps<typeof Progress.Item>['state'];
    validate: React.ComponentProps<typeof Progress.Item>['state'];
    signOff: React.ComponentProps<typeof Progress.Item>['state'];
  };
  isPendingApproval: boolean;
  submissionVersion: string;
}) => {
  const { token } = useAuthContext();
  const isDcc = isDccMember(token);
  const { isModalShown, getUserConfirmation, modalProps } = useUserConfirmationModalState();
  const [isLoaderShown, setLoaderShown] = React.useState(false);
  const { refetch: refetchClinicalSubmission } = useClinicalSubmissionQuery(programShortName);
  const commonToaster = useCommonToasters();
  const router = useRouter();
  const toaster = useToaster();
  const { data } = useClinicalSubmissionQuery(programShortName);

  const [reopenSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    { programShortName: string; submissionVersion: string }
  >(REOPEN_SUBMISSION_MUTATION, {
    variables: {
      programShortName,
      submissionVersion,
    },
  });

  const [approveClinicalSubmission] = useMutation<
    boolean,
    { programShortName: string; submissionVersion: string }
  >(APPROVE_SUBMISSION_MUTATION, {
    variables: {
      programShortName,
      submissionVersion,
    },
    update: refetchClinicalSubmission,
  });

  const handleSubmissionReopen: React.ComponentProps<typeof Button>['onClick'] = async () => {
    const didUserConfirm = await getUserConfirmation({
      title: isDcc ? 'Reopen Submission?' : 'Are you sure you want to reopen your submission?',
      children: isDcc
        ? 'Are you sure you want to approve this clinical submission?'
        : 'If you reopen your clinical submission it will be recalled from DCC approval and your workspace will be open for modifications.',
      actionButtonText: isDcc ? 'Yes, Reopen' : 'Yes, Reopen Submission',
      buttonSize: 'sm',
    });
    if (didUserConfirm) {
      setLoaderShown(true);
      await sleep();
      try {
        await reopenSubmission();
      } catch (err) {
        await refetchClinicalSubmission();
        commonToaster.unknownErrorWithReloadMessage();
      }
      setLoaderShown(false);
    }
  };

  const handleSubmissionApproval: React.ComponentProps<typeof Button>['onClick'] = async () => {
    const didUserConfirm = await getUserConfirmation({
      title: 'Approve Submission?',
      children: 'Are you sure you want to approve this clinical submission?',
      actionButtonText: 'Yes, Approve',
      buttonSize: 'sm',
    });
    if (didUserConfirm) {
      setLoaderShown(true);
      await sleep();
      try {
        await approveClinicalSubmission();
        router.push(DCC_PATH);
        toaster.addToast({
          variant: 'SUCCESS',
          interactionType: 'CLOSE',
          title: 'Clinical Data is successfully approved',
          content: `${
            data.program.name
          } clinical data will be placed in a queue for the next release.`,
        });
      } catch (err) {
        await refetchClinicalSubmission();
        commonToaster.unknownErrorWithReloadMessage();
        setLoaderShown(false);
      }
    }
  };

  return (
    <>
      {isModalShown && (
        <ModalPortal>
          <Modal {...modalProps} />
        </ModalPortal>
      )}
      {isLoaderShown && (
        <ModalPortal>
          <DnaLoader />
        </ModalPortal>
      )}
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
            {!showProgress && (
              <Progress>
                <Progress.Item text="Upload" state={progressStates.upload} />
                <Progress.Item text="Validate" state={progressStates.validate} />
                <Progress.Item text="Sign Off" state={progressStates.signOff} />
                {isPendingApproval && (
                  <Progress.Item
                    css={css`
                      width: 100px;
                    `}
                    text="Pending Approval"
                    state="locked"
                  />
                )}
              </Progress>
            )}
          </Row>
        </TitleBar>
        <Row nogutter align="center">
          {isPendingApproval && (
            <Button
              variant={isDcc ? 'secondary' : 'text'}
              isAsync
              css={css`
                margin-right: 10px;
              `}
              onClick={handleSubmissionReopen}
            >
              {isDcc ? 'reopen' : 'reopen submission'}
            </Button>
          )}
          {!isDcc && (
            <>
              {!isPendingApproval && (
                <Button
                  variant="text"
                  disabled
                  css={css`
                    margin-right: 10px;
                  `}
                >
                  Clear submission
                </Button>
              )}
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
            </>
          )}
          {isDcc && isPendingApproval && (
            <>
              <Button size="sm" isAsync onClick={handleSubmissionApproval}>
                approve
              </Button>
            </>
          )}
        </Row>
      </div>
    </>
  );
};
