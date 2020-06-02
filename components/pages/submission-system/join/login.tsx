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

import { useQuery } from '@apollo/react-hooks';
import { PROGRAM_JOIN_DETAILS_PATH, INVITE_ID } from 'global/constants/pages';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { MinimalLayout } from '../layout';
import GET_JOIN_PROGRAM_INFO from './GET_JOIN_PROGRAM_INFO.gql';
import JoinProgramLayout from './JoinProgramLayout';
import { getConfig } from 'global/config';
import { createRedirectURL } from 'global/utils/common';
import GoogleLoginButton from 'components/GoogleLoginButton';

export default () => {
  const { EGO_URL } = getConfig();

  const router = useRouter();
  const { inviteId } = router.query;

  const [notFound, setNotFound] = React.useState(false);
  const {
    data: { joinProgramInvite = {} as any, programOptions: { institutions = [] } = {} } = {},
    loading,
  } = useQuery(GET_JOIN_PROGRAM_INFO, {
    variables: { inviteId },
    onError: error => {
      if (error.message.includes('NOT_FOUND')) {
        setNotFound(true);
      }
    },
  });

  const [fullJoinLoginRedirect, setFullJoinLoginRedirect] = React.useState('');

  React.useEffect(() => {
    setFullJoinLoginRedirect(
      createRedirectURL({
        origin: location.origin,
        path: PROGRAM_JOIN_DETAILS_PATH.replace(INVITE_ID, inviteId as string),
      }),
    );
  }, []);

  return (
    <MinimalLayout>
      <JoinProgramLayout
        tabValue="step1"
        joinProgramInvite={joinProgramInvite}
        notFound={notFound}
        loading={loading}
      >
        <Typography>
          Please log in to the ARGO Data Platform using the{' '}
          <b>same email address to which your program invitation was sent.</b>{' '}
        </Typography>
        <div
          css={css`
            display: flex;
            justify-content: center;
            padding-top: 82px;
            padding-bottom: 25px;
          `}
        >
          <GoogleLoginButton
            id="google-login"
            link={EGO_URL}
            redirectPath={fullJoinLoginRedirect}
          />
        </div>
      </JoinProgramLayout>
    </MinimalLayout>
  );
};
