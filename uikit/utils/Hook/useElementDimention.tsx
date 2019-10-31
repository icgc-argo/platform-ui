import React from 'react';
import debounce from 'lodash/debounce';
import getElementResizeListener from 'uikit/utils/getElementResizeListener';

const useElementWidth = (
  parentRef: React.RefObject<HTMLElement>,
  _config: { resizeDebounce?: number } = {},
) => {
  const config: typeof _config = {
    resizeDebounce: 200,
    ..._config,
  };
  const [width, setWidthState] = React.useState(null);
  const [resizing, setResizing] = React.useState(false);
  React.useEffect(() => {
    if (!!parentRef.current) setWidthState(parentRef.current.clientWidth);
  }, [!!parentRef.current ? parentRef.current.clientWidth : 0]);
  React.useEffect(() => {
    const currentParent = parentRef.current;
    if (currentParent) {
      const setWidth = debounce((width: number) => {
        setWidthState(width);
        setResizing(false);
      }, config.resizeDebounce);
      const onResize = () => {
        if (currentParent.clientWidth !== width) {
          setResizing(true);
          setWidth(currentParent.clientWidth);
        }
      };
      const resizeListener = getElementResizeListener();
      if (currentParent) resizeListener.listenTo(currentParent, onResize);
      return () => {
        if (currentParent) resizeListener.removeListener(currentParent, onResize);
      };
    }
  }, [parentRef.current]);
  return { width, resizing };
};

const useElementHeight = (
  parentRef: React.RefObject<HTMLElement>,
  _config: { resizeDebounce?: number } = {},
) => {
  const config: typeof _config = {
    resizeDebounce: 200,
    ..._config,
  };
  const [height, setHeightState] = React.useState(null);
  const [resizing, setResizing] = React.useState(false);
  React.useEffect(() => {
    if (!!parentRef.current) setHeightState(parentRef.current.clientHeight);
  }, [!!parentRef.current ? parentRef.current.clientHeight : 0]);
  React.useEffect(() => {
    const currentParent = parentRef.current;
    if (currentParent) {
      const setHeight = debounce((height: number) => {
        setHeightState(height);
        setResizing(false);
      }, config.resizeDebounce);
      const onResize = () => {
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
  return { height, resizing };
};

export default (
  parentRef: React.RefObject<HTMLElement>,
  _config: { resizeDebounce?: number } = {},
) => {
  const { width, resizing: resizingWidth } = useElementWidth(parentRef, _config);
  const { height, resizing: resizingHeight } = useElementHeight(parentRef, _config);
  return {
    width,
    height,
    resizing: resizingWidth || resizingHeight,
  };
};
