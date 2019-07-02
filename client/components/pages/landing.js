import { EGO_API_ROOT, EGO_CLIENT_ID } from 'global/config';
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
import urlJoin from 'url-join';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

const Root = () => (
  <div
    css={css`
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
    `}
  >
    <AppBar>
      <Section>
        <Logo DomComponent={LinkToHome} />
        <MenuGroup>
          <MenuItem DomComponent={LinkToDataRepo}>Data Repository</MenuItem>
        </MenuGroup>
      </Section>
      <Section>
        <div
          css={css`
            display: flex;
            align-items: center;
            margin-right: 17px;
          `}
        >
          <Button>Login</Button>
        </div>
      </Section>
    </AppBar>
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
      `}
    >
      <div
        css={css`
          padding: 150px 0;
          text-align: center;
        `}
      >
        <div>
          <img width="380px" alt="" src="/static/argo.svg" />
        </div>
        <div>
          <Typography
            variant="hero"
            bold
            css={css`
              width: 100%;
              margin: 28px 0 25px 0;
            `}
          >
            Now open for Data Submission!
          </Typography>
        </div>
        <div>
          <GoogleLogin
            id="google-login"
            link={urlJoin(EGO_API_ROOT, `api/oauth/login/google?client_id=${EGO_CLIENT_ID}`)}
          />
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
                color: #0774d3;
              `}
            >
              Get started with Data Submission
            </Typography>
            <Typography component="div">
              • <a href="">Register for DACO access</a> in order to submit data.
            </Typography>
            <Typography component="div">
              • Our <a href="">documentation</a> outlines the submission process.
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
              css={css`
                color: #fff;
                margin: 0 50px;
              `}
            >
              ICGC ARGO aims to analyze specimens from cancer patients with{' '}
              <span
                css={css`
                  font-weight: bold;
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
    <Footer
      css={css`
        padding: 0 24px;
        box-shadow: 0 6px 0px 0px white, 0 1px 6px 0 rgba(0, 0, 0, 0.1),
          0 1px 5px 0 rgba(0, 0, 0, 0.08);
      `}
      links={[
        { displayName: 'Contact', href: '#' },
        { displayName: 'Documentation', href: '#' },
        { displayName: 'Privacy Policy', href: '#' },
        { displayName: 'Terms & Conditions', href: '#' },
        { displayName: 'Publication Policy', href: '#' },
      ]}
    />
  </div>
);

export default Root;
