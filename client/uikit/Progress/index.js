// @flow
import * as React from 'react';
import { styled } from '../';
import Icon from '../Icon';

// TODO: flow type from CONST
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

const getIcon = (state: ProgressStatus) => {
  switch (state) {
    case PROGRESS_STATUS.SUCCESS:
      return <Icon name="checkmark" />;

    case PROGRESS_STATUS.ERROR:
      return <Icon name="exclamation" />;

    case PROGRESS_STATUS.PENDING:
      return <Icon name="ellipses" />;

    case PROGRESS_STATUS.DISABLED:
      return null;
  }
};

const ProgressItem = ({ state, text }: { state: ProgressStatus, text: string }) => (
  <div>
    <div>{text}</div>
    <ProgressMarker state={state}>{getIcon(state)}</ProgressMarker>
  </div>
);

export default ProgressItem;
