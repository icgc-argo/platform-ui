import React from 'react';
declare const useElementDimension: (
  parentRef: React.RefObject<HTMLElement>,
  _config?: {
    resizeDebounce?: number;
  },
) => {
  width: number;
  height: number;
  resizing: boolean;
};
export default useElementDimension;
