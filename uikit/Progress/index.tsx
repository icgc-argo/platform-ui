import * as React from 'react';
import { styled } from '../';
import Icon from '../Icon';
import { css } from '..';

export type ProgressStatus = 'success' | 'error' | 'pending' | 'disabled' | 'locked';

export const PROGRESS_STATUS: {
  SUCCESS: ProgressStatus;
  ERROR: ProgressStatus;
  PENDING: ProgressStatus;
  DISABLED: ProgressStatus;
  LOCKED: ProgressStatus;
} = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
  DISABLED: 'disabled',
  LOCKED: 'locked',
};

const Triangle = props => css`
  content: ' ';
  display: block;
  position: relative;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left-style: solid;
  border-left-width: 7px;
`;

const ProgressMarker = styled<'div', { state: ProgressStatus }>('div')`
  width: 100%;
  height: 14px;
  background-color: ${({ theme, state }) => theme.progress.color[state]};
  transition: background-color 500ms linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressSection = styled('div')`
  display: flex;
  align-items: flex-end;

  /* this ensures stacking context is local for z-index */
  transform: scale(1);

  /* first and last rounded corners */
  > div:first-of-type:not(:last-of-type) .progress-marker {
    border-radius: 10px 0 0 10px;
  }
  > div:last-of-type:not(:first-of-type) .progress-marker {
    border-radius: 0 10px 10px 0;
  }

  /* Separator positions */
  div:not(:last-child) .row::after {
    ${Triangle};
    z-index: 2;
  }

  div:not(:first-child) .row::before {
    ${Triangle};
    z-index: 1;
  }

  /* offset each step for seperator spacing */
  .step {
    width: 64px;
    text-align: center;
    margin-left: -4px;
  }
`;

/* Separator colors - based on state*/
const Separator = styled<'div', { state: ProgressStatus }>('div')`
  &:before {
    background-color: ${({ theme, state }) => theme.progress.color[state]};
    border-left-color: #fff;
    transition: background-color 500ms linear;
  }

  &:after {
    background-color: transparent;
    border-left-color: ${({ theme, state }) => theme.progress.color[state]};
  }
`;

const Text = styled<'div', { completed: boolean }>('div')`
  ${({ theme }) => theme.typography.caption};
  font-weight: ${({ completed }) => (completed ? 600 : 'normal')};
`;

const getIcon = (state: ProgressStatus) =>
  ({
    [PROGRESS_STATUS.SUCCESS]: <Icon width="10px" height="10px" fill="white" name="checkmark" />,
    [PROGRESS_STATUS.ERROR]: <Icon width="10px" height="10px" fill="white" name="exclamation" />,
    [PROGRESS_STATUS.PENDING]: <Icon width="14px" height="14px" fill="white" name="ellipses" />,
    [PROGRESS_STATUS.LOCKED]: <Icon width="10px" height="10px" fill="white" name="lock" />,
    [PROGRESS_STATUS.DISABLED]: null,
  }[state]);

export const ProgressItem = ({
  state,
  text,
  completed = state === PROGRESS_STATUS.SUCCESS,
}: {
  state: ProgressStatus;
  text: string;
  completed?: boolean;
}) => (
  <div className="step">
    <Text completed={completed}>{text}</Text>
    <Separator
      state={state}
      className="row"
      css={css`
        display: flex;
      `}
    >
      <ProgressMarker className="progress-marker" state={state}>
        {getIcon(state)}
      </ProgressMarker>
    </Separator>
  </div>
);

const Progress: React.ComponentType<{}> & { Item: typeof ProgressItem } = ({ children }) => (
  <ProgressSection>{children}</ProgressSection>
);

Progress.Item = ProgressItem;

export default Progress;
