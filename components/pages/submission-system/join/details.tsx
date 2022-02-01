/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { useMutation, useQuery } from '@apollo/react-hooks';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { useToaster } from 'global/hooks/toaster';
import useAuthContext from 'global/hooks/useAuthContext';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { getConfig } from 'global/config';
import { useRouter } from 'next/router';
import { ERROR_STATUS_KEY } from 'pages/_error';
import React from 'react';
import { css } from 'uikit';
import Banner, { BANNER_VARIANTS } from 'uikit/notifications/Banner';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import Typography from 'uikit/Typography';
import { MinimalLayout } from '../layout';
import GET_JOIN_PROGRAM_INFO from './GET_JOIN_PROGRAM_INFO.gql';
import JoinProgramForm from './joinProgramForm';
import JoinProgramLayout from './JoinProgramLayout';
import JOIN_PROGRAM_MUTATION from './JOIN_PROGRAM_MUTATION.gql';
import GoogleLogin from 'uikit/Button/GoogleLogin';
import { PROGRAM_JOIN_DETAILS_PATH, INVITE_ID } from 'global/constants/pages';
import { createRedirectURL } from 'global/utils/common';
import queryString from 'query-string';
import GoogleLoginButton from 'components/GoogleLoginButton';

export const JUST_JOINED_PROGRAM_STORAGE_KEY = 'justJoinedProgram';

const JoinProgramDetailsPage = ({ firstName, lastName, authorizedPrograms = [] }: any) => {
  const { EGO_URL } = getConfig();

  const router = useRouter();
  const { inviteId } = router.query;
  const [joinProgram] = useMutation(JOIN_PROGRAM_MUTATION);
  const toaster = useToaster();

  const { updateToken, data: userModel } = useAuthContext();

  const [notFound, setNotFound] = React.useState(false);

  const {
    data: { joinProgramInvite = {} as any, programOptions: { institutions = [] } = {} } = {},
    loading,
  } = useQuery(GET_JOIN_PROGRAM_INFO, {
    variables: { inviteId },
    onCompleted: (data) => {
      if (!joinProgramInvite) {
        return;
      }
    },
    onError: (error) => {
      if (error.message.includes('NOT_FOUND')) {
        setNotFound(true);
      } else {
        error[ERROR_STATUS_KEY] = 500;
        throw new Error(error.message);
      }
    },
  });

  const incorrectEmail =
    !loading && get(userModel, 'context.user.email') !== get(joinProgramInvite, 'user.email');

  const handleSubmit: React.ComponentProps<typeof JoinProgramForm>['onSubmit'] = async (
    validData,
  ) => {
    try {
      await joinProgram({
        variables: {
          joinProgramInput: {
            ...omit(validData, 'institutions'),
            invitationId: inviteId,
            // TODO: fix the misalignment of ui and api
            institute: validData.institutions[0],
          },
        },
      });

      const egoToken = await updateToken(); // Side effect
      if (egoToken) {
        window.localStorage.setItem(
          JUST_JOINED_PROGRAM_STORAGE_KEY,
          joinProgramInvite.program.shortName,
        );
        router.push(
          PROGRAM_DASHBOARD_PATH.replace(
            PROGRAM_SHORT_NAME_PATH,
            joinProgramInvite.program.shortName,
          ),
        );
      } else {
        // Guard against bad impl
        throw new Error('Could not update authorization.');
      }
    } catch (err) {
      // handle error
      toaster.addToast({
        variant: TOAST_VARIANTS.ERROR,
        title: '',
        content: err.message,
      });
    }
  };

  const [fullDetailsRedirect, setFullDetailsRedirect] = React.useState('');

  React.useEffect(() => {
    setFullDetailsRedirect(
      createRedirectURL({
        origin: location.origin,
        path: PROGRAM_JOIN_DETAILS_PATH.replace(INVITE_ID, inviteId as string),
      }),
    );
  }, []);

  return (
    <MinimalLayout>
      <JoinProgramLayout
        tabValue={incorrectEmail ? 'step1' : 'step2'}
        joinProgramInvite={joinProgramInvite}
        loading={loading}
        notFound={notFound}
      >
        {incorrectEmail ? (
          <>
            <Banner
              title={'Incorrect email address'}
              variant={BANNER_VARIANTS.ERROR}
              content="Please try again using the same email address to which your program invitation was sent."
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
                id="google-login"
                link={EGO_URL}
                redirectPath={fullDetailsRedirect}
              />
            </div>
          </>
        ) : (
          <>
            <Typography variant="subtitle2" as="h2">
              Hello {get(joinProgramInvite, 'user.firstName')}{' '}
              {get(joinProgramInvite, 'user.lastName')}
            </Typography>
            <Typography
              css={css`
                margin-bottom: 27px;
              `}
            >
              Please provide the following details about yourself.
            </Typography>
            <JoinProgramForm
              onSubmit={handleSubmit}
              programName={get(joinProgramInvite, 'program.name')}
              userRole={get(joinProgramInvite, 'user.role')}
              institutions={institutions}
            />
          </>
        )}
      </JoinProgramLayout>
    </MinimalLayout>
  );
};

export default JoinProgramDetailsPage;
