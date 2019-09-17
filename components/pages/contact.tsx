import React from 'react';
import { Col, Row } from 'react-grid-system';
import { css, styled } from 'uikit';
import Button from 'uikit/Button';
import { Input } from 'uikit/form';
import FormControl from 'uikit/form/FormControl';
import InputLabel from 'uikit/form/InputLabel';
import Select from 'uikit/form/Select';
import Textarea from 'uikit/form/Textarea';
import A from 'uikit/Link';
import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from './DefaultLayout';
import TitleBorder from 'uikit/TitleBorder';

const Ul = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  padding-left: 18px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const FlexRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default function ContactPage() {
  const theme = useTheme();
  return (
    <DefaultLayout>
      <div
        css={css`
          background-color: ${theme.colors.grey_4};
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 48px;
            padding: 0 96px 57px 96px;
            box-shadow: inset 0 -1px 0 0 ${theme.colors.grey_2};
            background-color: white;
          `}
        >
          <div
            css={css`
              grid-column-start: 1;
              grid-column-end: 4;
              display: flex;
              align-items: center;
              flex-direction: column;
            `}
          >
            <Typography
              variant="hero"
              css={css`
                margin-top: 42px;
                margin-bottom: 28px;
              `}
            >
              Contact
            </Typography>
            <Typography
              variant="subtitle2"
              css={css`
                margin: 0;
                margin-bottom: 42px;
              `}
            >
              Check out these common topics before submitting a question below.
            </Typography>
          </div>
          <div>
            <TitleBorder color="accent1" />
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
                variant="subtitle"
              >
                Data Submissions
              </Typography>
              <img alt="test tube" src="/static/testtube.svg" height="50" />
            </div>
            <Ul>
              <li>
                How to <A>submit clinical data</A>
              </li>
              <li>
                How to <A>submit genomic data</A>
              </li>
              <li>
                <A>Program management</A> and <A>member roles</A>
              </li>
            </Ul>
            <Button size="sm">Learn more</Button>
          </div>
          <div>
            <TitleBorder color="accent3" />
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              `}
            >
              <Typography
                variant="subtitle"
                css={css`
                  margin: 0;
                `}
              >
                Applying for DACO Access
              </Typography>
              <img alt="controlled data" src="/static/controlled-data.svg" height="50" />
            </div>
            <Ul>
              <li>
                How to fill out the <A>DACO Application</A>
              </li>
              <li>
                What is the <A>review and approval process</A>?
              </li>
              <li>
                What is it mean to have <A>controlled data access</A>?
              </li>
            </Ul>
            <Button size="sm">Learn more</Button>
          </div>
          <div>
            <TitleBorder color="accent4" />
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              `}
            >
              <Typography
                variant="subtitle"
                css={css`
                  margin: 0;
                `}
              >
                FAQs
              </Typography>
              <img alt="faq" src="/static/faq.svg" height="50" />
            </div>
            <Ul>
              <li>
                How to <A>collaborate with ICGC ARGO</A>
              </li>
              <li>
                How to <A>register your program</A> with ICGC ARGO
              </li>
              <li>
                Restrictions for using <A>ARGO data in publications</A>
              </li>
            </Ul>
            <Button size="sm">Learn more</Button>
          </div>
        </div>
        <ContentBox
          css={css`
            width: 711px;
            margin: 39px auto;
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
              margin-bottom: 25px;
            `}
          >
            If you still can’t find what you’re looking for, get in touch and let us know how we can
            help.
          </Typography>
          <form name="createProgram">
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
                        content: 'Applying for controlled data access through DACO',
                        value: 'v1',
                      },
                      { content: 'Data Submissions', value: 'v2' },
                      { content: 'Technical Support', value: 'v3' },
                      { content: 'Other (please specify below)', value: 'v4' },
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
                      margin-bottom: 16px;
                      height: 115px;
                    `}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col align="right">
                <Button>SEND MESSAGE</Button>
              </Col>
            </Row>
          </form>
        </ContentBox>
      </div>
    </DefaultLayout>
  );
}
