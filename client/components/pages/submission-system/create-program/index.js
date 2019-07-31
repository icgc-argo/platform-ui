//@flow
import React from 'react';
import { css, styled } from 'uikit';
import SubmissionLayout from '../layout';
import TitleBar from 'uikit/TitleBar';
import CreateProgramForm from './CreateProgramForm';
import Container from 'uikit/Container';
import Link from 'next/link';
import {
  PROGRAMS_LIST_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import Button from 'uikit/Button';
import { useToaster } from '../toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';
import { useRouter } from 'next/router';

const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

const CreateProgramPageContent = () => {
  const toaster = useToaster();
  const router = useRouter();
  const onProgramCreated = ({ programName, shortName: programShortName }) => {
    toaster.addToast({
      title: '',
      variant: TOAST_VARIANTS.SUCCESS,
      content: `The program: ${programName} has been created`,
      onInteraction: event => {
        if (event.type === NOTIFICATION_INTERACTION_EVENTS.ACTION) {
          router.push(PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, programShortName));
        }
      },
    });
  };
  return (
    /** @todo: refactor the CreateProgramForm so the whole submission logic is dependency injected, then onSubmitted whould be onSubmit **/
    <CreateProgramForm
      onSubmitted={onProgramCreated}
      leftFooterComponent={
        <Link href={PROGRAMS_LIST_PATH}>
          <Button variant="text">Cancel</Button>
        </Link>
      }
    />
  );
};

export default () => {
  return (
    <SubmissionLayout
      subtitle="Create a Program"
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <TitleBar>
            <>Create a Program</>
          </TitleBar>
        </div>
      }
    >
      <Container
        css={css`
          margin: 10px auto;
          padding: 10px 40px;
          max-width: 875px;
        `}
      >
        <CreateProgramPageContent />
      </Container>
    </SubmissionLayout>
  );
};
