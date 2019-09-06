import css from '@emotion/css';
import styled from '@emotion/styled';
import Container from '../Container';

export const PageContainer = styled('div')`
  display: grid;
  grid-template-rows: 58px 1fr 58px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey_4};
`;

export const Panel = styled('div')`
  position: fixed;
  bottom: 0px;
  top: 58px;
  overflow-y: auto;
  width: 230px;
  padding-top: 12px;
  padding-bottom: 58px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};
`;

export const PageContent = styled('div')`
  position: relative;
  min-height: 600px;
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

  &.noSidebar ${PageContent} {
    grid-column: 1;
    max-width: none;
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
`;

export const ContentBody = styled('div')`
  padding: 25px 30px;
`;

export const ContentBox = styled(Container)`
  padding: 8px;
`;

export const PageFooter = styled('div')`
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  padding: 0px 24px;
`;
