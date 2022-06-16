import { RefObject } from 'react';
export default function useClickAway({
  domElementRef,
  onClickAway,
  onElementClick,
}: {
  domElementRef: RefObject<HTMLElement>;
  onClickAway: (event: MouseEvent) => void;
  onElementClick: (event: MouseEvent) => void;
}): void;
