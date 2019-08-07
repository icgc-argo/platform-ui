import { EGO_URL } from 'global/config';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';
import { createPage, getRedirectPathForUser } from 'global/utils/pages';
import Router from 'next/router';
import React from 'react';
import { css } from 'uikit';
import AppBar, { Logo, MenuGroup, MenuItem, Section } from 'uikit/AppBar';
import Button from 'uikit/Button';
import GoogleLogin from 'uikit/Button/GoogleLogin';
import Container from 'uikit/Container';
import Footer from 'uikit/Footer';
import Typography from 'uikit/Typography';
import DefaultLayout from './DefaultLayout';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

export default function LoginPage() {
  return (
    <DefaultLayout>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
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
              Now Open for Data Submission!
            </Typography>
          </div>
          <div>
            <GoogleLogin id="google-login" link={EGO_URL} />
          </div>
          <Container
            css={css`
              margin: 77px auto 20px auto;
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
              <ul
                css={css`
                  padding-left: 18px;
                `}
              >
                <li>
                  <Typography component="div">
                    <a href="">Register for DACO access</a> in order to submit data.
                  </Typography>
                </li>
                <li>
                  <Typography component="div">
                    Our <a href="">documentation</a> outlines the submission process.
                  </Typography>
                </li>
              </ul>
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
