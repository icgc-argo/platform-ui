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

import { useQuery } from '@apollo/client';
import { GqlClinicalSubmissionData } from './program-clinical-submission/types';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from '@emotion/core';
import Link from '@icgc-argo/uikit/Link';
import Notification, {
  NOTIFICATION_INTERACTION_EVENTS,
} from '@icgc-argo/uikit/notifications/Notification';
import { PROGRAM_CLINICAL_SUBMISSION_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import SIDE_MENU_CLINICAL_SUBMISSION_STATE_QUERY from './gql/SIDE_MENU_CLINICAL_SUBMISSION_STATE_QUERY';
import { getConfig } from 'global/config';
import { DOCS_DICTIONARY_PAGE } from 'global/constants/docSitePaths';
import { useClinicalSubmissionSchemaVersion } from 'global/hooks/useClinicalSubmissionSchemaVersion';

export const SchemaInvalidSubmissionNotification = ({
  marginTop,
  marginBottom,
  programShortName,
  isClinicalSubmissionPage = false,
}: {
  marginTop?: number;
  marginBottom?: number;
  programShortName: string;
  isClinicalSubmissionPage?: boolean;
}) => {
  const router = useRouter();

  const { data: { clinicalSubmissions = undefined } = {} } = useQuery<{
    clinicalSubmissions: GqlClinicalSubmissionData;
  }>(SIDE_MENU_CLINICAL_SUBMISSION_STATE_QUERY, {
    variables: {
      programShortName: programShortName,
    },
  });

  const { DOCS_URL_ROOT } = getConfig();
  const latestDictionaryResponse = useClinicalSubmissionSchemaVersion();

  const hasSchemaErrorsAfterMigration =
    clinicalSubmissions && clinicalSubmissions.state === 'INVALID_BY_MIGRATION';
  const [closedMigrationMsg, setclosedMigrationMsg] = React.useState(false);

  const getContentWithLink = (submissionPage: boolean) => (
    <div
      css={css`
        padding: 8px 8px 8px 0px;
      `}
    >
      {!latestDictionaryResponse.loading && (
        <Link href={DOCS_DICTIONARY_PAGE} target="_blank">
          Version {latestDictionaryResponse.data.clinicalSubmissionSchemaVersion} of the data
          dictionary
        </Link>
      )}
      {` was released and has made your clinical submission invalid. `}
      {submissionPage ? `See the details below.` : `See the details in your clinical workspace.`}
    </div>
  );

  const handleOnInteraction: React.ComponentProps<typeof Notification>['onInteraction'] = ({
    type,
  }) => {
    if (type === NOTIFICATION_INTERACTION_EVENTS.ACTION) {
      router.push(
        PROGRAM_CLINICAL_SUBMISSION_PATH.replace(
          PROGRAM_SHORT_NAME_PATH,
          programShortName as string,
        ),
      );
    } else {
      setclosedMigrationMsg(true);
    }
  };

  return (
    (hasSchemaErrorsAfterMigration && !closedMigrationMsg && (
      <Notification
        css={css`
          margin-top: ${marginTop}px;
          margin-bottom: ${marginBottom}px;
        `}
        size="SM"
        variant="ERROR"
        title={`Your clinical submission is invalid`}
        content={getContentWithLink(isClinicalSubmissionPage)}
        interactionType={isClinicalSubmissionPage ? 'NONE' : 'ACTION_DISMISS'}
        onInteraction={isClinicalSubmissionPage ? undefined : handleOnInteraction}
      />
    )) ||
    null
  );
};
