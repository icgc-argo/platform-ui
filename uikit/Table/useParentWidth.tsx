import React from 'react';
import debounce from 'lodash/debounce';

export default (
  parentRef: React.RefObject<HTMLElement>,
  _config: { resizeDebounce?: number } = {},
) => {
  const config: typeof _config = {
    resizeDebounce: 200,
    ..._config,
  };
  const [width, setWidthState] = React.useState(0);
  const [resizing, setResizing] = React.useState(false);
  React.useEffect(() => {
    if (!!parentRef.current) setWidthState(parentRef.current.clientWidth);
  }, [!!parentRef.current ? parentRef.current.clientWidth : 0]);
  React.useEffect(() => {
    const setWidth = debounce((width: number) => {
      setWidthState(width);
      setResizing(false);
    }, config.resizeDebounce);
    const parentElement = parentRef.current;
    const onResize = () => {
      setResizing(true);
      setWidth(parentElement.clientWidth);
    };
    if (parentElement) window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [parentRef.current]);
  return { width, resizing };
};
