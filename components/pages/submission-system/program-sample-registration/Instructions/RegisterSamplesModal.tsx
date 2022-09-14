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

import React from 'react';
import { Modal } from '@icgc-argo/uikit';
import { useMutation } from '@apollo/client';
import useGlobalLoader from 'components/GlobalLoader';
import ModalPortal from 'components/Modal';
import pluralize from 'pluralize';
import COMMIT_CLINICAL_REGISTRATION_MUTATION from './gql/COMMIT_CLINICAL_REGISTRATION_MUTATION';
import GET_REGISTRATION_QUERY from '../gql/GET_REGISTRATION_QUERY';
import get from 'lodash/get';
import { useToaster } from 'global/hooks/toaster';
import { TOAST_VARIANTS } from '@icgc-argo/uikit';
import Router from 'next/router';

import {
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SHORT_NAME_PATH,
  CONTACT_PAGE_PATH,
} from 'global/constants/pages';
import { sleep } from 'global/utils/common';
import { Typography } from '@icgc-argo/uikit';
import { HyperLink } from '@icgc-argo/uikit';
import Link from 'next/link';

export default function RegisterSamplesModal({
  onCancelClick: handleCancelClick,
  shortName,
  registrationId,
}: {
  onCancelClick: () => void;
  shortName: string;
  registrationId: string;
}) {
  const [commitRegistration] = useMutation(COMMIT_CLINICAL_REGISTRATION_MUTATION, {
    variables: {
      shortName,
      registrationId,
    },
    // update side menu status
    refetchQueries: [
      {
        query: GET_REGISTRATION_QUERY,
        variables: { shortName },
      },
    ],
  });

  const { setGlobalLoading } = useGlobalLoader();

  const toaster = useToaster();

  const handleActionClick = async () => {
    handleCancelClick();

    setGlobalLoading(true);
    await sleep();

    await commitRegistration()
      .then(async ({ data, errors }) => {
        await sleep();

        const num = get(data, 'commitClinicalRegistration.length', 0);
        Router.push(
          PROGRAM_DASHBOARD_PATH,
          PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, shortName),
        );

        toaster.addToast({
          interactionType: 'CLOSE',
          title: `${num.toLocaleString()} new registered ${pluralize('sample', num)}`,
          variant: TOAST_VARIANTS.SUCCESS,
          content: (
            <Typography>
              You will see the updates on your dashboard shortly. If you have any changes to this
              registered sample data, please{' '}
              <Link href={CONTACT_PAGE_PATH}>
                <HyperLink>contact the DCC.</HyperLink>
              </Link>
            </Typography>
          ),
        });
      })
      .catch((error) => {
        toaster.addToast({
          interactionType: 'CLOSE',
          title: '',
          variant: TOAST_VARIANTS.ERROR,
          content: error.toString(),
        });
      });
    setGlobalLoading(false);
  };

  return (
    <ModalPortal>
      <Modal
        title="Are you sure you want to register samples?"
        actionButtonText="YES, REGISTER SAMPLES"
        actionButtonId="modal-confirm-register"
        buttonSize="sm"
        onActionClick={handleActionClick}
        onCancelClick={handleCancelClick}
        onCloseClick={handleCancelClick}
      >
        <div>
          Once these samples are registered, you can submit clinical and molecular data for the
          donors associated with those samples.
        </div>
      </Modal>
    </ModalPortal>
  );
}
