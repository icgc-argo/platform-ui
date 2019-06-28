//@flow
import React from 'react';
import urlJoin from 'url-join';
import Router from 'next/router';

import GoogleLogin from 'uikit/Button/GoogleLogin';
import { EGO_API_ROOT, EGO_CLIENT_ID } from 'global/config';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';
import { getRedirectPathForUser } from 'global/utils/pages';
import { createPage } from 'global/utils/pages';
import AppBar, { Logo, MenuGroup, MenuItem, Section, UserBadge } from 'uikit/AppBar';
import Button from 'uikit/Button';
import { css } from 'uikit';

import Typography from 'uikit/Typography';
import Footer from 'uikit/Footer';
import Container from 'uikit/Container';

const LinkToHome = props => <a style={{ cursor: 'pointer' }} {...props} onClick={() => 'TODO'} />;

const LinkToDataRepo = props => <a {...props} onClick={() => 'TODO'} />;

export default createPage({
  isPublic: true,
  getInitialProps: async ({ query, egoJwt, res }) => {
    const { redirect } = query;
    if (egoJwt && res) {
      res.redirect(redirect || getRedirectPathForUser(egoJwt));
    }
    return {
      redirect,
      egoJwt,
    };
  },
})(({ redirect, egoJwt }) => {
  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getRedirectPathForUser(egoJwt));
    } else {
      if (redirect) {
        localStorage.setItem(LOCAL_STORAGE_REDIRECT_KEY, redirect);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
      }
    }
  }, []);

  return (
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
                • Register for DACO access in order to submit data.
              </Typography>
              <Typography component="div">
                • Our documentation outlines the submission process.
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
              grid-template-rows: 2fr 1fr;
              & > div {
                background-color: blue;
              }
            `}
          >
            <div
              css={css`
                grid-column-start: 1;
                grid-column-end: 3;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <Typography variant="title" color="white">
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
            <div>2</div>
            <div>3</div>
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
});
