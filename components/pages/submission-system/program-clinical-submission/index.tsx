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
import SubmissionLayout from '../layout';
import { styled } from 'uikit';
import { usePageQuery } from 'global/hooks/usePageContext';
import { ClinicalSubmissionQueryData } from './types';
import CLINICAL_SUBMISSION_QUERY from './gql/CLINICAL_SUBMISSION_QUERY.gql';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { ContentHeader } from 'uikit/PageLayout';
import { useTheme } from 'uikit/ThemeProvider';
import Header from './Header';
import PageContent from './PageContent';
export const placeholderClinicalSubmissionQueryData = (
  shortName: string,
): ClinicalSubmissionQueryData => ({
  clinicalSubmissions: {
    version: '',
    programShortName: shortName,
    clinicalEntities: [],
    fileErrors: [],
    id: '',
    state: null,
    updatedAt: '',
    updatedBy: '',
    __typename: 'ClinicalSubmissionData',
  },
});

type ClinicalSubmissionQueryVariables = {
  programShortName: string;
};

export const useClinicalSubmissionQuery = (
  programShortName: string,
  options: Omit<
    QueryHookOptions<ClinicalSubmissionQueryData, ClinicalSubmissionQueryVariables>,
    'variables'
  > = {},
) => {
  const hook = useQuery<ClinicalSubmissionQueryData, ClinicalSubmissionQueryVariables>(
    CLINICAL_SUBMISSION_QUERY,
    {
      ...options,
      variables: {
        programShortName,
      },
    },
  );

  return {
    ...hook,
    data: hook.data || placeholderClinicalSubmissionQueryData(programShortName),
  };
};

export default function ProgramClinicalSubmission() {
  const theme = useTheme();
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const [] = React.useState<FileList | null>(null);

  const { data, loading: loadingClinicalSubmission } = useClinicalSubmissionQuery(programShortName);

  const isPendingApproval = data.clinicalSubmissions.state === 'PENDING_APPROVAL';

  return (
    <>
      <SubmissionLayout
        ContentHeaderComponent={styled(ContentHeader)`
          background: ${isPendingApproval ? theme.colors.accent3_4 : theme.colors.white};
        `}
        contentHeader={
          <Header
            programShortName={programShortName}
            showProgress={!loadingClinicalSubmission}
            isPendingApproval={isPendingApproval}
            submissionVersion={data.clinicalSubmissions.version}
          />
        }
      >
        <PageContent />
      </SubmissionLayout>
    </>
  );
}
