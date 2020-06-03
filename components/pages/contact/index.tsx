import React from 'react';
import { Col, Row } from 'react-grid-system';
import { css, styled } from 'uikit';
import Button from 'uikit/Button';
import { Input } from 'uikit/form';
import FormControl from 'uikit/form/FormControl';
import InputLabel from 'uikit/form/InputLabel';
import Select from 'uikit/form/Select';
import Textarea from 'uikit/form/Textarea';
import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from 'components/pages/DefaultLayout';
import Link from 'uikit/Link';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
import ReCAPTCHA from 'react-google-recaptcha';
import yup from 'global/utils/validations';
import CREATE_JIRA_TICKET from './CREATE_JIRA_TICKET.gql';
import { firstName, lastName, email } from 'global/utils/form/validations';
import useFormHook from 'global/hooks/useFormHook';
import FormHelperText from 'uikit/form/FormHelperText';
import {
  DOCS_SUBMITTING_CLINICAL_DATA_PATH,
  DOCS_SUBMISSION_OVERVIEW_PATH,
  DOCS_REGISTERING_SAMPLES_PATH,
  DOCS_SUBMITTING_MOLECULAR_DATA_PATH,
  DOCS_DATA_ACCESS_PATH,
  DOCS_DATA_DOWNLOAD_PATH,
  DOCS_API_TOKEN_PATH,
} from 'global/constants/docSitePaths';
import { useMutation } from '@apollo/react-hooks';
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { messageCategory, messageDescription, reCaptcha, CONTACT_CATEGORY_OPTIONS } from './common';

const Ul = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  padding-left: 18px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const Ul2 = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  padding-left: 0px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

export default function ContactPage() {
  const theme = useTheme();
  const { RECAPTCHA_SITE_KEY, DACO_URL, DOCS_URL_ROOT } = getConfig();
  const contactFormSchema = {
    firstName: '',
    lastName: '',
    email: '',
    messageCategory: '',
    messageDescription: '',
    reCaptcha: '',
  };
  const schema = yup.object().shape({
    firstName,
    lastName,
    email,
    messageCategory,
    messageDescription,
    reCaptcha,
  });

  const {
    errors,
    data,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
    reset,
  } = useFormHook({
    initialFields: contactFormSchema,
    schema,
  });

  const {
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    messageCategory: messageCategoryError,
    messageDescription: messageDescriptionError,
    reCaptcha: reCaptchaError,
  } = errors as typeof contactFormSchema;

  const [createTicket] = useMutation(CREATE_JIRA_TICKET);
  const toaster = useToaster();
  const reCaptchaRef = React.useRef(null);
  const [requestLoader, setRequestLoader] = React.useState(false);

  const submitForm: React.ComponentProps<typeof Button>['onClick'] = async () => {
    try {
      const validData = await validateForm();

      setRequestLoader(true);
      try {
        await createTicket({
          variables: {
            reCaptchaResponse: validData.reCaptcha,
            messageCategory: validData.messageCategory,
            emailAddress: validData.email,
            requestText: validData.messageDescription,
            displayName: `${validData.firstName} ${validData.lastName}`,
          },
        });
      } catch (err) {
        console.error('The request to create a jira ticket failed: ', err);
        toaster.addToast({
          variant: TOAST_VARIANTS.ERROR,
          interactionType: 'CLOSE',
          title: 'An error has occurred.',
          content: 'Your message could not be sent at this time. Please try again shortly.',
        });
        setRequestLoader(false);
        throw err;
      }
      reCaptchaRef.current.reset();
      reset();
      setRequestLoader(false);
      toaster.addToast({
        variant: TOAST_VARIANTS.SUCCESS,
        interactionType: 'CLOSE',
        title: 'Your message has been sent!',
        content:
          'You should expect an email shortly from ICGC ARGO Helpdesk with further instructions.',
      });
    } catch (err) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <DefaultLayout>
      <Row
        nogutter
        css={css`
          height: 100%;
          background: ${theme.colors.white};
        `}
      >
        <Col
          md={12}
          lg={6}
          style={{
            padding: '0px 47px 0px 47px',
            backgroundColor: theme.colors.white,
          }}
        >
          <div>
            <Typography variant="hero">Contact</Typography>
            <Typography variant="subtitle2">
              You may find the answer to your question in the following common topics:
            </Typography>
          </div>
          <div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              `}
            >
              <Typography
                css={css`
                  margin: 0;
                `}
                variant="sectionHeader"
                color="secondary"
                bold
              >
                Accessing Controlled Data{' '}
              </Typography>
            </div>
            <Ul2>
              You will need to{' '}
              <Link target="_blank" href={urljoin(DACO_URL)}>
                apply to ICGC DACO
              </Link>{' '}
              in order to access controlled data. Visit our documentation for assistance with{' '}
              <Link target="_blank" href={DOCS_DATA_ACCESS_PATH}>
                applying for access to controlled data.
              </Link>
            </Ul2>
          </div>
          <div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              `}
            >
              <Typography
                css={css`
                  margin: 0;
                `}
                variant="sectionHeader"
                color="secondary"
                bold
              >
                Downloading Data
              </Typography>
            </div>
            <Ul>
              <li>
                <Link target="_blank" href={DOCS_DATA_DOWNLOAD_PATH}>
                  How to download data
                </Link>{' '}
                using the API Token and score-client
              </li>
              <li>
                <Link target="_self" href={DOCS_API_TOKEN_PATH}>
                  User profile and API token{' '}
                </Link>
              </li>
            </Ul>
          </div>
          <div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              `}
            >
              <Typography
                css={css`
                  margin: 0;
                `}
                variant="subtitle2"
                color="secondary"
                bold
              >
                Submitting Data
              </Typography>
            </div>
            <Ul>
              <li>
                <Link target="_blank" href={DOCS_SUBMISSION_OVERVIEW_PATH}>
                  Get started:
                </Link>{' '}
                a quick guide to data submission
              </li>
              <li>
                How to{' '}
                <Link target="_blank" href={DOCS_REGISTERING_SAMPLES_PATH}>
                  register samples
                </Link>
              </li>
              <li>
                How to{' '}
                <Link target="_blank" href={DOCS_SUBMITTING_CLINICAL_DATA_PATH}>
                  submit clinical data
                </Link>
              </li>
              <li>
                How to{' '}
                <Link target="_blank" href={DOCS_SUBMITTING_MOLECULAR_DATA_PATH}>
                  submit molecular data
                </Link>
              </li>
            </Ul>
          </div>
          <div>
            <Button variant="secondary">
              <Link
                css={css`
                  text-decoration: none;
                `}
                target="_blank"
                href={DOCS_URL_ROOT}
              >
                More Documentation
              </Link>
            </Button>
          </div>
        </Col>
        <Col md={12} lg={6}>
          <ContentBox
            loading={requestLoader}
            css={css`
              margin: 30px;
              padding: 25px 29px;
            `}
          >
            <Typography
              variant="title"
              css={css`
                margin-top: 0;
                margin-bottom: 25px;
              `}
            >
              Send a Message
            </Typography>
            <Typography
              css={css`
                margin-bottom: 10px;
              `}
            >
              If you still can’t find what you’re looking for, let us know how we can help:
            </Typography>
            <form name="sendMessage">
              <Row align="center">
                <Col md={6} sm={12}>
                  <FormControl required={true} error={!!firstNameError}>
                    <Row>
                      <Col
                        sm={5}
                        css={css`
                          align-self: center;
                        `}
                      >
                        <InputLabel
                          htmlFor="first-name"
                          css={css`
                            margin: 0;
                            width: 120px;
                          `}
                        >
                          First Name
                        </InputLabel>
                      </Col>
                      <Col>
                        <Input
                          css={css`
                            flex-grow: 1;
                          `}
                          aria-label="First Name"
                          id="first-name"
                          value={data.firstName}
                          onChange={e => setData({ key: 'firstName', val: e.target.value })}
                          onBlur={() => validateField({ key: 'firstName' })}
                          size="lg"
                        />
                        {!!firstNameError && <FormHelperText>{firstNameError}</FormHelperText>}
                      </Col>
                    </Row>
                  </FormControl>
                </Col>
                <Col md={6} sm={12}>
                  <FormControl required={true} error={!!lastNameError}>
                    <Row>
                      <Col
                        sm={5}
                        css={css`
                          align-self: center;
                        `}
                      >
                        <InputLabel
                          htmlFor="last-name"
                          css={css`
                            margin: 0;
                            width: 120px;
                          `}
                        >
                          Last Name
                        </InputLabel>
                      </Col>
                      <Col>
                        <Input
                          css={css`
                            flex-grow: 1;
                          `}
                          aria-label="Last Name"
                          id="last-name"
                          size="lg"
                          value={data.lastName}
                          onChange={e => setData({ key: 'lastName', val: e.target.value })}
                          onBlur={() => validateField({ key: 'lastName' })}
                        />
                        {!!lastNameError && <FormHelperText>{lastNameError}</FormHelperText>}
                      </Col>
                    </Row>
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormControl required={true} error={!!emailError}>
                    <Row>
                      <Col sm={2.5}>
                        <InputLabel
                          htmlFor="email-address"
                          css={css`
                            width: 120px;
                            margin: 0;
                          `}
                        >
                          Email Address
                        </InputLabel>
                      </Col>
                      <Col>
                        <Input
                          css={css`
                            flex-grow: 1;
                          `}
                          aria-label="Email Address"
                          id="email-address"
                          size="lg"
                          value={data.email}
                          onChange={e => {
                            setData({ key: 'email', val: e.target.value });
                          }}
                          onBlur={() => validateField({ key: 'email' })}
                        />
                        {!!emailError && <FormHelperText>{emailError}</FormHelperText>}
                      </Col>
                    </Row>
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormControl required={true} error={!!messageCategoryError}>
                    <InputLabel htmlFor="messageCategory">
                      What do you need assistance with?
                    </InputLabel>
                    <Select
                      value={data.messageCategory}
                      size="lg"
                      aria-label="What do you need assistance with"
                      id="assistance-type"
                      css={css`
                        margin-top: 6px;
                        margin-bottom: 16px;
                      `}
                      options={CONTACT_CATEGORY_OPTIONS}
                      onChange={val => setData({ key: 'messageCategory', val })}
                      onBlur={() => validateField({ key: 'messageCategory' })}
                    />
                    {!!messageCategoryError && (
                      <FormHelperText>{messageCategoryError}</FormHelperText>
                    )}
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormControl required={true} error={!!messageDescriptionError}>
                    <InputLabel htmlFor="messageDescription">Your message</InputLabel>
                    <Textarea
                      aria-label="Your message"
                      id="message"
                      css={css`
                        margin-top: 6px;
                        margin-bottom: 0px;
                        height: 115px;
                      `}
                      value={data.messageDescription}
                      onChange={e => setData({ key: 'messageDescription', val: e.target.value })}
                      onBlur={() => validateField({ key: 'messageDescription' })}
                    />
                    {!!messageDescriptionError && (
                      <FormHelperText>{messageDescriptionError}</FormHelperText>
                    )}
                  </FormControl>
                </Col>
              </Row>
              <Row align="end">
                <Col>
                  <FormControl required={true} error={!!reCaptchaError}>
                    <ReCAPTCHA
                      ref={reCaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(value: string) => {
                        setData({ key: 'reCaptcha', val: value });
                      }}
                      onBlur={() => validateField({ key: 'reCaptcha' })}
                    />
                    {!!reCaptchaError && <FormHelperText>{reCaptchaError}</FormHelperText>}
                  </FormControl>
                </Col>
              </Row>
            </form>
            <Row>
              <Col>
                <Button
                  css={css`
                    margin-left: auto;
                    margin-right: 0px;
                  `}
                  onClick={submitForm}
                >
                  SEND MESSAGE
                </Button>
              </Col>
            </Row>
          </ContentBox>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
