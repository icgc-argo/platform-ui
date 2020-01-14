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
