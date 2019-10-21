import styled from '@emotion/styled';
import Container from '../Container';

export const PageContainer = styled('div')`
  display: grid;
  grid-template-rows: 58px 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey_4};
`;

export const Sidebar = styled('div')`
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 58px);
`;

export const Collapsible = styled('div')`
  border-top: 1px solid ${({ theme }) => theme.colors.grey_2};
  min-height: 58px;
  width: 100%;
`;

export const Panel = styled('div')`
  overflow-y: auto;
  padding-top: 12px;
`;

export const PageContent = styled('div')`
  position: relative;
  min-height: 600px;
  height: calc(100vh - 58px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

export const PageBody = styled('div')`
  display: grid;
  grid-template-columns: 230px 1fr;

  &.noSidebar {
    grid-template-columns: 1fr;
  }

  & ${PageContent} {
    grid-column: 2;
    max-width: calc(100vw - 230px);
  }

  &.noSidebar {
    ${PageContent} {
      grid-column: 1;
      max-width: none;
    }

    & .footer {
      grid-column: 1;
    }
  }
`;

export const ContentHeader = styled('div')`
  display: flex;
  align-items: center;
  height: 56px;
  padding-left: 30px;
  padding-right: 30px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
  flex-shrink: 0;
`;

export const ContentBody = styled('div')`
  padding: 25px 30px;
  flex: 1 0 auto;
`;

export const ContentBox = styled(Container)`
  padding: 8px;
`;
