/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
import { createRedirectURL } from 'global/utils/common';

import GoogleLogin from 'uikit/Button/GoogleLogin';
import { getConfig } from 'global/config';
import GoogleLoginButton from 'components/GoogleLoginButton';

export enum InviteState {
  NotFound,
  Expired,
  Accepted,
  Pending,
  Revoked,
  UnSet,
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
  let inviteState: InviteState = InviteState.UnSet;

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
            border-radius: 8px 0 0 8px;
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
            as="h1"
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
                title={'This invitation has already been accepted'}
                variant={BANNER_VARIANTS.WARNING}
                content="Please log in to access your program."
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
                <GoogleLoginButton
                  link={EGO_URL}
                  redirectPath={createRedirectURL({
                    origin: location.origin,
                    path: `${PROGRAM_DASHBOARD_PATH.replace(
                      PROGRAM_SHORT_NAME_PATH,
                      joinProgramInvite.program.shortName,
                    )}`,
                  })}
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
          {inviteState == InviteState.UnSet && !loading && <div>Unknown Error</div>}
        </div>
      </Container>
    </div>
  );
}
