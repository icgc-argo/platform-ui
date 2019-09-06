import React from 'react';
import get from 'lodash/get';

export default function useClickAway({
  domElementRef,
  onClickAway = e => {},
  onElementClick = e => {},
}) {
  React.useEffect(e => {
    const onGlobalClick = event => {
      if (!domElementRef) {
        return;
      }
      const isClickaway = !domElementRef.current.contains(event.target);

      if (isClickaway) {
        onClickAway(e);
      } else {
        onElementClick(e);
      }
    };
    document.addEventListener('click', onGlobalClick);
    return () => {
      document.removeEventListener('click', onGlobalClick);
    };
  });
}
