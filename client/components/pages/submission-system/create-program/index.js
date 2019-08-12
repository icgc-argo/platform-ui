//@flow
import React from 'react';
import { css, styled } from 'uikit';
import SubmissionLayout from '../layout';
import TitleBar from 'uikit/TitleBar';
import ProgramForm from '../ProgramForm';
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
import CREATE_PROGRAM_MUTATION from './CREATE_PROGRAM_MUTATION.gql';
import createProgramSchema from './validation';
import { useMutation } from 'react-apollo-hooks';
import useCommonToasters from 'components/useCommonToasters';
import DnaLoader from 'uikit/DnaLoader';
import useTheme from 'uikit/utils/useTheme';
import color from 'color';

const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

/* *************************************** *
 * Reshape form data for gql input
 * *************************************** */
const createProgramInput = formData => ({
  name: formData.programName,
  shortName: formData.shortName,
  description: formData.description,
  commitmentDonors: parseInt(formData.commitmentLevel),
  website: formData.website,
  institutions: formData.institutions,
  countries: formData.countries,
  regions: Array.from(formData.processingRegions),
  membershipType: formData.membershipType,
  admins: [
    {
      email: formData.adminEmail,
      firstName: formData.adminFirstName,
      lastName: formData.adminLastName,
      role: 'ADMIN',
    },
  ],
  cancerTypes: formData.cancerTypes,
  primarySites: formData.primarySites,
});

const LoadingOverlay = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background: ${color(theme.colors.white)
          .alpha(0.7)
          .hsl()
          .string()};
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <DnaLoader />
    </div>
  );
};

export default () => {
  const toaster = useToaster();
  const router = useRouter();
  const commonToasters = useCommonToasters();
  const [sendCreateProgram] = useMutation(CREATE_PROGRAM_MUTATION);
  const [formDisabled, setFormDisabled] = React.useState(false);

  const onSubmit = async data => {
    try {
      setFormDisabled(true);
      await sendCreateProgram({
        variables: { program: createProgramInput(data) },
      });
      router.push(PROGRAMS_LIST_PATH);
      toaster.addToast({
        title: '',
        variant: TOAST_VARIANTS.SUCCESS,
        content: <>The program: {<strong>{data.programName}</strong>} has been created</>,
        onInteraction: event => {
          if (event.type === NOTIFICATION_INTERACTION_EVENTS.ACTION) {
            router.push(PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, data.shortName));
          }
        },
      });
    } catch (err) {
      commonToasters.unknownError();
      setFormDisabled(false);
    }
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
          position: relative;
          overflow: hidden;
        `}
      >
        <ProgramForm
          onSubmit={onSubmit}
          leftFooterComponent={
            <Link href={PROGRAMS_LIST_PATH}>
              <Button variant="text">Cancel</Button>
            </Link>
          }
        />
        {formDisabled && <LoadingOverlay />}
      </Container>
    </SubmissionLayout>
  );
};
