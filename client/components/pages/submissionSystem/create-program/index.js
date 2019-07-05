import React from 'react';
import css from '@emotion/css';
import styled from '@emotion/styled';
import SubmissionLayout from '../layout';
import TitleBar from 'uikit/TitleBar';
import CreateProgramForm from './CreateProgramForm';

const SectionTitle = styled('h3')`
  ${({ theme }) => css(theme.typography.subtitle2)};
  color: ${({ theme }) => theme.colors.secondary};
`;

export default ({ logOut, pathname }) => {
  return (
    <SubmissionLayout
      subtitle="Create a Program"
      pathname={pathname}
      logOut={logOut}
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
      <CreateProgramForm />
    </SubmissionLayout>
  );
};
