import * as React from 'react';
import { css } from 'uikit';
import Container from 'uikit/Container';
import Tabs, { Tab } from 'uikit/Tabs';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import Typography from 'uikit/Typography';
import DnaLoader from 'uikit/DnaLoader';
import get from 'lodash/get';
import useAuthContext from 'global/hooks/useAuthContext';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { useRouter } from 'next/router';

import GoogleLogin from 'uikit/Button/GoogleLogin';
import { getConfig } from 'global/config';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';

export enum InviteState {
  NotFound,
  Expired,
  Accepted,
  Pending,
  Revoked,
  Loading,
}

export default function JoinProgramLayout({
  tabValue,
  children,
  joinProgramInvite = {},
  notFound,
  loading,
}: {
  tabValue: string;
  children: React.ReactNode;
  joinProgramInvite: any;
  loading: boolean;
  notFound: boolean;
}) {
  const { EGO_URL } = getConfig();
  let inviteState: InviteState = InviteState.Loading;

  if (notFound) {
    inviteState = InviteState.NotFound;
  } else if (joinProgramInvite.status == 'EXPIRED') {
    inviteState = InviteState.Expired;
  } else if (joinProgramInvite.status == 'PENDING') {
    inviteState = InviteState.Pending;
  } else if (joinProgramInvite.status == 'REVOKED') {
    inviteState = InviteState.Revoked;
  } else if (joinProgramInvite.status == 'ACCEPTED') {
    inviteState = InviteState.Accepted;
  }
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
      `}
    >
      <Container
        css={css`
          display: grid;
          grid-template-columns: 50% 50%;
          min-width: 900px;
          min-height: 408px;
        `}
      >
        <div
          css={css`
            background-image: url('/static/argo-data-scientist.jpg');
            background-size: cover;
          `}
        />
        <div
          css={css`
            padding: 0 22px 22px 22px;
          `}
        >
          <Tabs
            value={inviteState == InviteState.Pending ? tabValue : ''}
            css={css`
              margin-bottom: 30px;
            `}
          >
            <Tab
              value="step1"
              label="Step 1: Log in"
              css={css`
                padding: 14px;
                width: 50%;
                justify-content: center;
                pointer-events: none;
              `}
            />
            <Tab
              value="step2"
              label="Step 2: Basic details"
              css={css`
                padding: 14px;
                width: 50%;
                justify-content: center;
                pointer-events: none;
              `}
            />
          </Tabs>
          <Typography
            variant="title"
            css={css`
              margin: 31px 0;
            `}
          >
            Join an ICGC ARGO Program
          </Typography>
          {inviteState == InviteState.NotFound && (
            <Banner
              title={'Inivitation not found'}
              variant={BANNER_VARIANTS.ERROR}
              content=""
              css={css`
                margin-bottom: 30px;
              `}
            />
          )}
          {inviteState == InviteState.Expired && (
            <Banner
              title={'Oops, your invitation has expired'}
              variant={BANNER_VARIANTS.ERROR}
              content="Please contact your Program Administrator for a new invitation."
              css={css`
                margin-bottom: 30px;
              `}
            />
          )}
          {inviteState == InviteState.Revoked && (
            <Banner
              title={'Oops, your invitation has been revoked'}
              variant={BANNER_VARIANTS.ERROR}
              content="Please contact your Program Administrator for a new invitation."
              css={css`
                margin-bottom: 30px;
              `}
            />
          )}
          {inviteState == InviteState.Accepted && (
            <>
              <Banner
                title={'Oops, your invitation has been accepted'}
                variant={BANNER_VARIANTS.WARNING}
                content="Please log in to access your program"
                css={css`
                  margin-bottom: 30px;
                `}
              />
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <GoogleLogin
                  link={EGO_URL}
                  onClick={() => {
                    window.localStorage.setItem(
                      LOCAL_STORAGE_REDIRECT_KEY,
                      PROGRAM_DASHBOARD_PATH.replace(
                        PROGRAM_SHORT_NAME_PATH,
                        joinProgramInvite.program.shortName,
                      ),
                    );
                  }}
                />
              </div>
            </>
          )}
          {inviteState == InviteState.Pending && children}
          {loading && (
            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <DnaLoader />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
