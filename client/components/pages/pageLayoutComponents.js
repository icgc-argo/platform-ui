import css from '@emotion/css';
import styled from '@emotion/styled';

export const PageContainer = styled('div')`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey_4};
`;

export const Panel = styled('div')`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};
  width: 304px;
  padding-top: 30px;
  z-index: 1;
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
  background: ${({ theme }) => theme.colors.white};
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
  display: flex;
  align-items: center;
  height: 72px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const ContentBody = styled('div')`
  padding: 25px;
`;

export const ContentBox = styled('div')`
  padding: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);;
  /* box-shadow: ${({ theme }) => theme.shadows.pageElement}; */
  border-radius: 8px;
`;

export const PageFooter = styled('div')`
  background: ${({ theme }) => theme.colors.white};
  height: 64px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;
`;
