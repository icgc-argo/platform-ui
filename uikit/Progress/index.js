// @flow
import * as React from 'react';
import { styled } from '../';
import Icon from '../Icon';
import { css } from '..';

// TODO: flow type from CONST
export type ProgressStatus = 'success' | 'error' | 'pending' | 'disabled';

export const PROGRESS_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
  DISABLED: 'disabled',
};

// no access to state prop when in  ProgressSection
const Triangle = props => css`
  content: ' ';
  display: block;

  position: relative;
  //top: 50%;
  //margin-top: -50px;
  //left: 100%;
  background-color: pink;

  border-top: 7px solid transparent; /* Go big on the size, and let overflow hide */
  border-bottom: 7px solid transparent;
  border-left: 7px solid ${props.theme.progress.color[props.state]};
`;
/*
  &::after {
    ${Triangle};
    z-index: 2;
  }

  &::before {
    ${Triangle};
    z-index: 1;
    margin-left: 1px;
    border-left-color: blue;
  }
  */
// TODO: check green color
const ProgressMarker = styled('div')`
  width: 70px;
  height: 14px;
  background-color: ${({ theme, state }) => theme.progress.color[state]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressSection = styled('div')`
  display: flex;
  align-items: flex-end;

  /* first and last rounded corners */
  > div:first-of-type .progress-marker {
    border-radius: 10px 0 0 10px;
  }
  > div:last-of-type .progress-marker {
    border-radius: 0 10px 10px 0;
  }

  /* arrow each section except last */
  div:not(:last-child) .row::after {
    ${Triangle};
    z-index: 2;
  }
`;

const Text = styled('div')`
  ${({ theme }) => theme.typography.caption};
  font-weight: ${({ completed }) => (completed ? 600 : 'normal')};
  width: 70px;
  text-align: center;
`;

const getIcon = (state: ProgressStatus) => {
  switch (state) {
    case PROGRESS_STATUS.SUCCESS:
      return <Icon width="10px" height="10px" fill="#fff" name="checkmark" />;

    case PROGRESS_STATUS.ERROR:
      return <Icon width="10px" height="10px" fill="#fff" name="exclamation" />;

    case PROGRESS_STATUS.PENDING:
      return <Icon fill="#fff" name="ellipses" />;

    case PROGRESS_STATUS.DISABLED:
      return null;
  }
};

export const ProgressItem = ({
  state,
  text,
  completed = false,
}: {
  state: ProgressStatus,
  text: string,
  completed?: boolean,
}) => (
  <div>
    <Text completed={completed}>{text}</Text>
    <div
      className="row"
      css={css`
        display: flex;
      `}
    >
      <ProgressMarker className="progress-marker" state={state}>
        {getIcon(state)}
      </ProgressMarker>
    </div>
  </div>
);

const Progress = ({ children }: { children: React.Node }) => (
  <ProgressSection>{children}</ProgressSection>
);

export default Progress;
