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
import CLEAR_SUBMISSION_MUTATION from './gql/CLEAR_SUBMISSION_MUTATION.gql';
import { useMutation } from '@apollo/react-hooks';
import { ClinicalSubmissionQueryData, ClearSubmissionMutationVariables } from './types';
import useUserConfirmationModalState from './useUserConfirmationModalState';
import { ModalPortal, useGlobalLoadingState, GlobalLoaderView } from 'components/ApplicationRoot';
import Modal from 'uikit/Modal';
import { sleep } from 'global/utils/common';
import { useClinicalSubmissionQuery, placeholderClinicalSubmissionQueryData } from '.';
import useCommonToasters from 'components/useCommonToasters';
import { useRouter } from 'next/router';
import { DCC_DASHBOARD_PATH, DOCS_SUBMITTING_CLINICAL_DATA_PATH } from 'global/constants/pages';
import { useToaster } from 'global/hooks/toaster';
import ClinicalSubmissionProgressBar from '../ClinicalSubmissionProgressBar';
import { useSubmissionSystemDisabled } from '../SubmissionSystemLockedNotification';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
// import { DOCS_SUBMITTED_DATA_PATH } from 'global/constants/pages';

export default function({
  programShortName,
  showProgress,
  isPendingApproval,
  submissionVersion,
}: {
  programShortName: string;
  showProgress: boolean;
  isPendingApproval: boolean;
  submissionVersion: string;
}) {
  const { token } = useAuthContext();
  const isDcc = isDccMember(token);
  const { isModalShown, getUserConfirmation, modalProps } = useUserConfirmationModalState();
  // const { setLoading: setLoaderShown } = useGlobalLoadingState();
  const [loaderShown, setLoaderShown] = React.useState(false);
  const clinicalSubmissionQuery = useClinicalSubmissionQuery(programShortName);
  const commonToaster = useCommonToasters();
  const router = useRouter();
  const toaster = useToaster();
  const isSubmissionSystemDisabled = useSubmissionSystemDisabled();
  const { DOCS_URL_ROOT } = getConfig();

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
  });

  const [clearClinicalSubmission] = useMutation<
    ClinicalSubmissionQueryData,
    ClearSubmissionMutationVariables
  >(CLEAR_SUBMISSION_MUTATION, {
    variables: {
      programShortName,
      submissionVersion,
    },
  });

  const handleSubmissionReopen: React.ComponentProps<typeof Button>['onClick'] = async () => {
    const didUserConfirm = await getUserConfirmation({
      title: isDcc ? 'Reopen Submission?' : 'Are you sure you want to reopen your submission?',
      children: isDcc
        ? 'Are you sure you want to reopen this clinical submission?'
        : 'If you reopen your clinical submission it will be recalled from DCC approval and your workspace will be open for modifications.',
      actionButtonText: isDcc ? 'Yes, Reopen' : 'Yes, Reopen Submission',
      actionButtonId: 'modal-confirm-reopen',
      buttonSize: 'sm',
    });
    if (didUserConfirm) {
      setLoaderShown(true);
      await sleep();
      try {
        await reopenSubmission();
      } catch (err) {
        await clinicalSubmissionQuery.refetch();
        commonToaster.unknownErrorWithReloadMessage();
      } finally {
        setLoaderShown(false);
      }
    }
  };

  const handleSubmissionApproval: React.ComponentProps<
    typeof Button
  >['onClick'] = async function() {
    const didUserConfirm = await getUserConfirmation({
      title: 'Approve Submission?',
      children: 'Are you sure you want to approve this clinical submission?',
      actionButtonText: 'Yes, Approve',
      actionButtonId: 'modal-confirm-approve',
      buttonSize: 'sm',
    });

    if (didUserConfirm) {
      // modal is already closed because confirm = true
      setLoaderShown(true);
      // set GLOBAL loader
      await sleep();
      try {
        // approval mutation succeeds
        try {
          await approveClinicalSubmission();
          console.log('very very hopefully calling refetch');
          // await refetchClinicalSubmission();
        } catch (err) {
          console.warn('FIRST ERR: ', err);
        }
        // but update callback fails

        try {
          const data = placeholderClinicalSubmissionQueryData(programShortName).clinicalSubmissions;
          console.log('data: ', data);
          console.log('clinicalSubmissionQuery in callback: ', clinicalSubmissionQuery);
          clinicalSubmissionQuery.updateQuery(function(previous) {
            console.log('previous: ', previous);
            const newCache = {
              ...previous,
              clinicalSubmissions: data,
            };
            console.log('newCache: ', newCache);
            return newCache;
          });
        } catch (err) {
          console.log('err: ', err);
        }

        router.push(DCC_DASHBOARD_PATH);
        try {
          toaster.addToast({
            variant: 'SUCCESS',
            interactionType: 'CLOSE',
            title: 'Clinical Data is successfully approved',
            content: `${programShortName} updated clinical data has been approved.`,
          });
        } catch (err) {
          console.warn('caught!!!?? ', err);
        }
      } catch (err) {
        await clinicalSubmissionQuery.refetch();
        commonToaster.unknownErrorWithReloadMessage();
      } finally {
        setLoaderShown(false);
      }
    }
  };

  const handleSubmissionClear: React.ComponentProps<typeof Button>['onClick'] = async () => {
    setLoaderShown(true);
    await sleep();
    try {
      await clearClinicalSubmission();
      toaster.addToast({
        variant: 'SUCCESS',
        interactionType: 'CLOSE',
        title: 'Submission cleared',
        content: `All uploaded clinical files have been cleared.`,
      });
    } catch (err) {
      await clinicalSubmissionQuery.refetch();
      commonToaster.unknownErrorWithReloadMessage();
    } finally {
      setLoaderShown(false);
    }
  };
  console.log('IS PENDING: ', isPendingApproval);
  return (
    <>
      {isModalShown && (
        <ModalPortal>
          <Modal {...modalProps} />
        </ModalPortal>
      )}
      <GlobalLoaderView isLoading={loaderShown} />
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
            {showProgress && <ClinicalSubmissionProgressBar programShortName={programShortName} />}
          </Row>
        </TitleBar>
        <Row nogutter align="center">
          {isPendingApproval && (
            <Button
              id="button-reopen"
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
          {!isPendingApproval && (
            <React.Fragment>
              <Button
                id="button-clear-submission" // For Selenium
                variant="text"
                css={css`
                  margin-right: 10px;
                `}
                disabled={isSubmissionSystemDisabled || !submissionVersion}
                onClick={handleSubmissionClear}
              >
                Clear submission
              </Button>
              <Link
                target="_blank"
                href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTING_CLINICAL_DATA_PATH)}
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
            </React.Fragment>
          )}
          {isDcc && isPendingApproval && (
            <>
              <Button id="button-approve" size="sm" isAsync onClick={handleSubmissionApproval}>
                approve
              </Button>
            </>
          )}
        </Row>
      </div>
    </>
  );
}
