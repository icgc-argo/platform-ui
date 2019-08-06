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
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';
import { useRouter } from 'next/router';

const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

export default () => {
  const toaster = useToaster();
  const router = useRouter();
  const onProgramCreated = ({ programName, shortName: programShortName }) => {
    toaster.addToast({
      title: '',
      variant: TOAST_VARIANTS.SUCCESS,
      content: <>The program: {<strong>{programName}</strong>} has been created</>,
      onInteraction: event => {
        if (event.type === NOTIFICATION_INTERACTION_EVENTS.ACTION) {
          router.push(PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, programShortName));
        }
      },
    });
  };
  const onProgramCreationError = (err: Error) => {
    toaster.addToast({
      title: '',
      variant: TOAST_VARIANTS.ERROR,
      content: 'Something went wrong, please try again later or contact us for assistance',
    });
  };
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
        <CreateProgramForm
          onSubmitted={onProgramCreated}
          onSubmissionError={onProgramCreationError}
          leftFooterComponent={
            <Link href={PROGRAMS_LIST_PATH}>
              <Button variant="text">Cancel</Button>
            </Link>
          }
        />
      </Container>
    </SubmissionLayout>
  );
};
