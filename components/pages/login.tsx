import React from 'react';
import { css } from 'uikit';
import GoogleLogin from 'uikit/Button/GoogleLogin';
import Container from 'uikit/Container';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import DefaultLayout from './DefaultLayout';
import { getConfig } from 'global/config';
import Notification from 'uikit/notifications/Notification';
import urljoin from 'url-join';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

export default function LoginPage() {
  const theme = useTheme();
  const { EGO_URL } = getConfig();
  const { DOCS_URL_ROOT } = getConfig();
  return (
    <DefaultLayout>
      <div
        css={css`
          z-index: 2;
          position: absolute;
          width: 100%;
          top: 80px;
          display: flex;
          justify-content: center;
        `}
      >
        <Notification
          css={css`
            width: 1000px;
            max-width: 100%;
          `}
          variant="WARNING"
          interactionType={null}
          size="MD"
          title="This is a closed beta testing environment"
          content="To access the clinical submission system for beta testing, you will be invited to join a program via email. If you log in without an email invite, you will not have access to any programs."
          noShadow={false}
        />
      </div>
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
            justify-content: center;
            align-items: center;
            text-align: center;
          `}
        >
          <div>
            <img width="350px" alt="" src="/static/argo.svg" />
          </div>
          <div
            css={css`
              margin: 0 10px;
            `}
          >
            <Typography
              variant="hero"
              bold
              color="primary"
              css={css`
                width: 100%;
                margin: 28px 0 25px 0;
                font-weight: normal;
              `}
            >
              Welcome to the <br /> ICGC ARGO Data Platform
            </Typography>
          </div>
          <div>
            <GoogleLogin id="google-login" link={EGO_URL} />
          </div>
          <Container
            css={css`
              margin: 77px 50px 20px 50px;
              padding: 16px;
              text-align: left;
              display: inline-flex;
            `}
          >
            <div
              css={css`
                margin-right: 16px;
              `}
            >
              <img alt="" src="/static/testtube.svg" />
            </div>
            <div>
              <Typography
                component="div"
                css={css`
                  font-size: 16px;
                  font-weight: 600;
                `}
                color="secondary"
              >
                Get started with Data Submission
              </Typography>
              <Typography component="div">
                Visit our documentation website to learn how to{' '}
                <a href={urljoin(DOCS_URL_ROOT, 'managing-program-access/')}>manage a program,</a>{' '}
                <a href={urljoin(DOCS_URL_ROOT, 'registering-samples')}>register samples,</a> and{' '}
                <a href={urljoin(DOCS_URL_ROOT, 'submitting-clinical-data')}>
                  submit clinical data.
                </a>
              </Typography>
            </div>
          </Container>
        </div>
        <div>
          <div
            css={css`
              display: grid;
              height: 100%;
              text-align: center;
              column-gap: 6px;
              row-gap: 6px;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 2.3318fr 1fr;
            `}
          >
            <div
              css={css`
                grid-column-start: 1;
                grid-column-end: 3;
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url('/static/icgc-argo-galaxy.jpg');
                background-position: center;
                background-size: cover;
              `}
            >
              <Typography
                variant="title"
                color="white"
                css={css`
                  margin: 0 50px;
                  line-height: 42px;
                `}
              >
                ICGC ARGO aims to analyze specimens from cancer patients with{' '}
                <span
                  css={css`
                    font-weight: 600;
                  `}
                >
                  high quality clinical data
                </span>{' '}
                to address outstanding questions that are vital to our quest to defeat cancer.
              </Typography>
            </div>
            <div
              css={css`
                background-image: url('/static/icgc-argo-researcher.jpg');
                background-position: center;
                background-size: cover;
              `}
            />
            <div
              css={css`
                background-image: url('/static/icgc-argo-clinician-and-patient.jpg');
                background-position: center;
                background-size: cover;
              `}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
