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

import React from 'react';
import { css, styled } from 'uikit';
import SubmissionLayout from '../layout';
import TitleBar from 'uikit/TitleBar';
import ProgramForm from '../program-form/ProgramForm';
import Container from 'uikit/Container';
import Link from 'next/link';
import {
  PROGRAMS_LIST_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import Button from 'uikit/Button';
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';
import { useRouter } from 'next/router';
import CREATE_PROGRAM_MUTATION from './CREATE_PROGRAM_MUTATION.gql';
import { useMutation } from '@apollo/react-hooks';
import useCommonToasters from 'components/useCommonToasters';
import SIDE_MENU_PROGRAM_LIST from '../SIDE_MENU_PROGRAM_LIST.gql';
import { useGlobalLoadingState } from 'components/ApplicationRoot';

/* *************************************** *
 * Reshape form data for gql input
 * *************************************** */
const createProgramInput = formData => ({
  name: formData.programName,
  shortName: formData.shortName,
  description: formData.description,
  commitmentDonors: parseInt(formData.commitmentLevel),
  website: formData.website,
  institutions: formData.institutions,
  countries: formData.countries,
  regions: Array.from(formData.processingRegions),
  membershipType: formData.membershipType,
  admins: [
    {
      email: formData.adminEmail,
      firstName: formData.adminFirstName,
      lastName: formData.adminLastName,
      role: 'ADMIN',
    },
  ],
  cancerTypes: formData.cancerTypes,
  primarySites: formData.primarySites,
});

type CreateProgramMutationResult = { newProgram: { shortName: string } };
type CreateProgramMutationInput = ReturnType<typeof createProgramInput>;
export default () => {
  const toaster = useToaster();
  const router = useRouter();
  const commonToasters = useCommonToasters();
  const [sendCreateProgram] = useMutation<
    CreateProgramMutationResult,
    { program: CreateProgramMutationInput }
  >(CREATE_PROGRAM_MUTATION, {
    update: (store, { data }: { data: CreateProgramMutationResult }) => {
      const { programs: cachedProgramList } = store.readQuery({ query: SIDE_MENU_PROGRAM_LIST });
      store.writeQuery({
        query: SIDE_MENU_PROGRAM_LIST,
        data: {
          programs: [...cachedProgramList, data.newProgram],
        },
      });
    },
  });

  const { setLoading: setFormDisabled } = useGlobalLoadingState();

  const onSubmit = async data => {
    try {
      setFormDisabled(true);
      await sendCreateProgram({
        variables: { program: createProgramInput(data) },
      });
      router.push(PROGRAMS_LIST_PATH);
      toaster.addToast({
        title: '',
        variant: TOAST_VARIANTS.SUCCESS,
        content: <>The program: {<strong>{data.programName}</strong>} has been created</>,
        onInteraction: event => {
          if (event.type === NOTIFICATION_INTERACTION_EVENTS.ACTION) {
            router.push(PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, data.shortName));
          }
        },
      });
    } catch (err) {
      if (err.message.match(/duplicate key.*program_short_name_key/)) {
        toaster.addToast({
          title: 'Program Not Created',
          variant: TOAST_VARIANTS.ERROR,
          content:
            'A program with the same Program Short Name already exists. Please choose a new Program Short Name.',
        });
      } else {
        commonToasters.unknownError();
      }
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <SubmissionLayout
      subtitle="Create a Program"
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <TitleBar>
            <>Create a Program</>
          </TitleBar>
        </div>
      }
    >
      <Container
        css={css`
          margin: 10px auto;
          padding: 10px 40px;
          max-width: 875px;
        `}
      >
        <ProgramForm
          onSubmit={onSubmit}
          leftFooterComponent={() => (
            <Link href={PROGRAMS_LIST_PATH}>
              <Button variant="text">Cancel</Button>
            </Link>
          )}
        />
      </Container>
    </SubmissionLayout>
  );
};
