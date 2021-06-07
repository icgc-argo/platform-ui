/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Icon from '../Icon';

export type ProgressStatus = 'success' | 'error' | 'pending' | 'disabled' | 'locked' | 'closed';

export const PROGRESS_STATUS: {
  SUCCESS: ProgressStatus;
  ERROR: ProgressStatus;
  PENDING: ProgressStatus;
  DISABLED: ProgressStatus;
  LOCKED: ProgressStatus;
  CLOSED: ProgressStatus;
} = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
  DISABLED: 'disabled',
  LOCKED: 'locked',
  CLOSED: 'closed',
};

const Triangle = (props) => css`
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

  /* centre offset due to pseudo elements */
  & .progress-item:first-child svg {
    margin-left: 7px;
  }

  & .progress-item:last-child svg {
    margin-left: -7px;
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

const Text = styled('div')<{ completed: boolean; state: ProgressStatus }>`
  ${({ theme }) => theme.typography.caption};
  font-weight: ${({ completed }) => (completed ? 600 : 'normal')};
  color: ${({ theme, state }) => (state === 'locked' ? theme.colors.grey : theme.colors.black)};
`;

const getIcon = (state: ProgressStatus) =>
  ({
    [PROGRESS_STATUS.SUCCESS]: <Icon width="10px" height="10px" fill="white" name="checkmark" />,
    [PROGRESS_STATUS.ERROR]: <Icon width="10px" height="10px" fill="white" name="exclamation" />,
    [PROGRESS_STATUS.PENDING]: <Icon width="14px" height="14px" fill="white" name="ellipses" />,
    [PROGRESS_STATUS.LOCKED]: <Icon width="10px" height="10px" fill="white" name="lock" />,
    [PROGRESS_STATUS.DISABLED]: null,
    [PROGRESS_STATUS.CLOSED]: <Icon width="8px" height="8px" fill="white" name="times" />,
  }[state]);

export const ProgressItem = ({
  state,
  text,
  completed = state === PROGRESS_STATUS.SUCCESS,
  className = '',
  ...rest
}: {
  state: ProgressStatus;
  text: string;
  completed?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`progress-item ${className || ''}`}
    css={css`
      width: 64px;
      text-align: center;
      margin-left: -4px;
    `}
    {...rest}
  >
    <Text state={state} completed={completed}>
      {text}
    </Text>
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
