// @flow
import * as React from 'react';
import { styled } from '../';

export type ProgressStatus = 'success' | 'error' | 'pending' | 'disabled';

export const PROGRESS_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
  DISABLED: 'disabled',
};

const ProgressMarker = styled('div')`
  width: 100px;
  height: 100px;
  background-color: ${({ theme, state }) => theme.progress.color[state]};
`;

const ProgressItem = ({ state, text }: { state: ProgressStatus, text: string }) => (
  <div>
    <div>{text}</div>
    <ProgressMarker state={state} />
  </div>
);

export default ProgressItem;
