import React from 'react';
import debounce from 'lodash/debounce';
import getElementResizeListener from 'uikit/utils/getElementResizeListener';

export default (
  parentRef: React.RefObject<HTMLElement>,
  _config: { resizeDebounce?: number } = {},
) => {
  const config: typeof _config = {
    resizeDebounce: 200,
    ..._config,
  };
  const [width, setWidthState] = React.useState(null);
  const [height, setHeightState] = React.useState(null);
  const [resizing, setResizing] = React.useState(false);
  React.useEffect(() => {
    if (!!parentRef.current) setWidthState(parentRef.current.clientWidth);
    if (!!parentRef.current) setHeightState(parentRef.current.clientHeight);
  }, [!!parentRef.current ? parentRef.current.clientWidth : 0]);
  React.useEffect(() => {
    const currentParent = parentRef.current;
    if (currentParent) {
      const setWidth = debounce((width: number) => {
        setWidthState(width);
        setResizing(false);
      }, config.resizeDebounce);
      const setHeight = debounce((height: number) => {
        setHeightState(height);
        setResizing(false);
      }, config.resizeDebounce);
      const onResize = () => {
        if (currentParent.clientWidth !== width) {
          setResizing(true);
          setWidth(currentParent.clientWidth);
        }
        if (currentParent.clientHeight !== height) {
          setResizing(true);
          setHeight(currentParent.clientHeight);
        }
      };
      const resizeListener = getElementResizeListener();
      if (currentParent) resizeListener.listenTo(currentParent, onResize);
      return () => {
        if (currentParent) resizeListener.removeListener(currentParent, onResize);
      };
    }
  }, [parentRef.current]);
  return { width, height, resizing };
};
