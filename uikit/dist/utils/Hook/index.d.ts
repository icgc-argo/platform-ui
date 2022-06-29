import React from 'react';
declare const Hook: React.ComponentType<{
  initialState: any;
  /**
   * receives [state, setState] to keep with hooks semantic
   */
  render: (a: [any, React.Dispatch<any>]) => React.ReactNode | React.ReactNodeArray;
  /**
   * gets passed to React.useEffect, return cleanup function if needed
   */
  effect?: () => void | (() => () => void);
  /**
   * call result gets passed to React.useEffect, receives this component's state
   */
  watch?: (state: any) => any[];
}>;
export default Hook;
