import React from 'react';
import { styled, css } from 'uikit';
import SubmissionLayout from '../layout';
import TitleBar from 'uikit/TitleBar';
import CreateProgramForm from './CreateProgramForm';
import Container from 'uikit/Container';

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
      <Container
        css={css`
          margin: 10px auto;
          padding: 10px 40px;
          max-width: 875px;
        `}
      >
        <CreateProgramForm />
      </Container>
    </SubmissionLayout>
  );
};
