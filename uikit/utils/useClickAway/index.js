import React from 'react';

export default function useClickAway({
  domElementRef,
  onClickAway = e => {},
  onElementClick = e => {},
}) {
  React.useEffect(e => {
    const onGlobalClick = event => {
      const isClickaway = !event.path.includes(domElementRef.current);
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
