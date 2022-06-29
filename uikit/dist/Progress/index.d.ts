import React from 'react';
export declare type ProgressStatus =
  | 'success'
  | 'error'
  | 'pending'
  | 'disabled'
  | 'locked'
  | 'closed';
export declare const PROGRESS_STATUS: {
  SUCCESS: ProgressStatus;
  ERROR: ProgressStatus;
  PENDING: ProgressStatus;
  DISABLED: ProgressStatus;
  LOCKED: ProgressStatus;
  CLOSED: ProgressStatus;
};
export declare const ProgressItem: ({
  state,
  text,
  completed,
  className,
  ...rest
}: {
  state: ProgressStatus;
  text: string;
  completed?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
declare const Progress: React.ComponentType<{}> & {
  Item: typeof ProgressItem;
};
export default Progress;
