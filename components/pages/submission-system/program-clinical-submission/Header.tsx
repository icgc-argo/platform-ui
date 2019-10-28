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

export default ({
  programShortName,
  showProgress,
  progressStates,
  isPendingApproval,
  onSubmissionApproved,
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
  onSubmissionApproved: () => void;
  submissionVersion: string;
}) => {
  const { token } = useAuthContext();
  const isDcc = isDccMember(token);
  const { isModalShown, getUserConfirmation, modalProps } = useUserConfirmationModalState();

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
    update: onSubmissionApproved,
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
      await reopenSubmission();
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
      await approveClinicalSubmission();
    }
  };

  return (
    <>
      {isModalShown && (
        <ModalPortal>
          <Modal {...modalProps} />
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
              variant="secondary"
              isAsync
              css={css`
                margin-right: 10px;
              `}
              onClick={handleSubmissionReopen}
            >
              reopen
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
