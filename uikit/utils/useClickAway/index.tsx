import React from 'react';
import get from 'lodash/get';

export default function useClickAway({
  domElementRef,
  onClickAway = e => {},
  onElementClick = e => {},
}) {
  React.useEffect(() => {
    const onGlobalClick = event => {
      if (!domElementRef.current) {
        return;
      }
      const isClickaway = !domElementRef.current.contains(event.target);

      if (isClickaway) {
        onClickAway(event);
      } else {
        onElementClick(event);
      }
    };
    document.addEventListener('click', onGlobalClick);
    return () => {
      document.removeEventListener('click', onGlobalClick);
    };
  });
}
