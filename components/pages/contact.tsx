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
import DefaultLayout from './DefaultLayout';
import Link from 'uikit/Link';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  DOCS_SUBMITTING_CLINICAL_DATA_PATH,
  DOCS_SUBMISSION_OVERVIEW_PATH,
  DOCS_REGISTERING_SAMPLES_PATH,
  DOCS_SUBMITTING_MOLECULAR_DATA_PATH,
  DOCS_DATA_ACCESS_PATH,
  DOCS_DATA_DOWNLOAD,
} from 'global/constants/docSitePaths';

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

const FlexRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export default function ContactPage() {
  const theme = useTheme();
  const { DOCS_URL_ROOT, RECAPTCHA_SITE_KEY, DACO_URL } = getConfig();
  return (
    <DefaultLayout>
      <script src="https://www.google.com/recaptcha/api.js" />
      <div
        css={css`
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: ${theme.colors.white};
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            padding: 0px 47px 0px 47px;
            background-color: white;
          `}
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
                Data Submission
              </Typography>
            </div>
            <Ul2>
              You will need to{' '}
              <Link target="_blank" href={urljoin(DACO_URL)}>
                apply to ICGC DACO
              </Link>{' '}
              in order to access controlled data. Visit our documentation for assistance with{' '}
              <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_DATA_ACCESS_PATH)}>
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
                <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_DATA_DOWNLOAD)}>
                  How to download data
                </Link>{' '}
                using the API Token and Score Client
              </li>
              <li>
                <Link target="_self" href={'#'}>
                  Troubleshooting data download
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
                <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_SUBMISSION_OVERVIEW_PATH)}>
                  Get started:
                </Link>{' '}
                a quick guide to data submission
              </li>
              <li>
                How to{' '}
                <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_REGISTERING_SAMPLES_PATH)}>
                  register samples
                </Link>
              </li>
              <li>
                How to{' '}
                <Link
                  target="_blank"
                  href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTING_CLINICAL_DATA_PATH)}
                >
                  submit clinical data
                </Link>
              </li>
              <li>
                How to{' '}
                <Link
                  target="_blank"
                  href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTING_MOLECULAR_DATA_PATH)}
                >
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
        </div>
        <ContentBox
          css={css`
            margin: 30px 30px auto 0px;
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
              <Col sm={6}>
                <FormControl required={true}>
                  <FlexRow>
                    <InputLabel
                      htmlFor="first-name"
                      css={css`
                        margin: 0;
                        width: 120px;
                      `}
                    >
                      First Name
                    </InputLabel>
                    <Input
                      css={css`
                        flex-grow: 1;
                      `}
                      aria-label="First Name"
                      id="first-name"
                      size="lg"
                    />
                  </FlexRow>
                </FormControl>
              </Col>
              <Col sm={6}>
                <FormControl required={true}>
                  <FlexRow>
                    <InputLabel
                      htmlFor="last-name"
                      css={css`
                        margin: 0;
                        width: 120px;
                      `}
                    >
                      Last Name
                    </InputLabel>
                    <Input
                      css={css`
                        flex-grow: 1;
                      `}
                      aria-label="Last Name"
                      id="last-name"
                      size="lg"
                    />
                  </FlexRow>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl required={true}>
                  <FlexRow>
                    <InputLabel
                      htmlFor="email-address"
                      css={css`
                        width: 120px;
                        margin: 0;
                      `}
                    >
                      Email Address
                    </InputLabel>
                    <Input
                      css={css`
                        flex-grow: 1;
                      `}
                      aria-label="Email Address"
                      id="email-address"
                      size="lg"
                    />
                  </FlexRow>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl required={true}>
                  <InputLabel htmlFor="assistance-type">
                    What do you need assistance with?
                  </InputLabel>
                  <Select
                    size="lg"
                    aria-label="What do you need assistance with"
                    id="assistance-type"
                    css={css`
                      margin-top: 6px;
                      margin-bottom: 16px;
                    `}
                    options={[
                      {
                        content: 'Applying for Access to Controlled Data through DACO',
                        value: 'v1',
                      },
                      { content: 'Data Download', value: 'v2' },
                      { content: 'Data Submission', value: 'v3' },
                      { content: 'Data or Analysis Inquiry', value: 'v4' },
                      { content: 'Media or Collaboration Inquiry', value: 'v5' },
                      { content: 'Publication Inquiry', value: 'v6' },
                      { content: 'Other', value: 'v7' },
                    ]}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl required={true}>
                  <InputLabel htmlFor="message">Your message</InputLabel>
                  <Textarea
                    aria-label="Your message"
                    id="message"
                    css={css`
                      margin-top: 6px;
                      margin-bottom: 0px;
                      height: 115px;
                    `}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row align="end">
              <Col>
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(value: string) => {
                    console.log('Captcha value:', value); // Needs to be hooked up, just looks the part rn
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  css={css`
                    margin-left: auto;
                    margin-right: 0px;
                  `}
                >
                  SEND MESSAGE
                </Button>
              </Col>
            </Row>
          </form>
        </ContentBox>
      </div>
    </DefaultLayout>
  );
}
