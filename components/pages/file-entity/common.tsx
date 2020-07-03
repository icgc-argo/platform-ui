import Typography from '../../../uikit/Typography';
import Container from '../../../uikit/Container';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FileAccessState } from './types';
import Icon from 'uikit/Icon';

export const FileCard: React.ComponentType<{
  cardTitle?: string;
  cardHeight?: string;
  loading?: boolean;
}> = ({ cardTitle, children, cardHeight = '100%', loading = false }) => (
  <Container
    loading={loading}
    css={css`
      height: ${cardHeight};
    `}
  >
    <div
      css={css`
        padding: 16px;
      `}
    >
      <Typography
        color="primary"
        variant="default"
        component="span"
        css={css`
          padding-bottom: 10px;
        `}
      >
        {cardTitle}
      </Typography>
      {children}
    </div>
  </Container>
);

export const TableDiv = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

export const getAccessIcon = (state: FileAccessState) =>
  ({
    [FileAccessState.CONTROLLED]: (
      <Icon
        width="18px"
        height="16px"
        fill="primary_2"
        name="lock"
        css={css`
          margin-right: 5px;
          margin-top: -5px;
        `}
      />
    ),
  }[state]);

export const DownloadIcon = () => (
  <Icon
    css={css`
      padding-right: 4px;
    `}
    fill="white"
    name="download"
    height="12px"
  />
);
