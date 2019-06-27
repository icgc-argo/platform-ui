import css from '@emotion/css';
import styled from '@emotion/styled';

export const PageContainer = styled('div')`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey_4};
`;

export const Panel = styled('div')`
  min-width: 304px;
  padding-top: 28px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};
`;

export const PageBody = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const PageContent = styled('div')`
  flex: 1;
`;

export const ContentHeader = styled('div')`
  display: flex;
  align-items: center;
  height: 72px;
  padding-left: 30px;
  padding-right: 30px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
`;

export const ContentBody = styled('div')`
  padding: 25px 30px;
`;

export const ContentBox = styled('div')`
  padding: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
`;

export const PageFooter = styled('div')`
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  padding: 0px 24px;
`;
