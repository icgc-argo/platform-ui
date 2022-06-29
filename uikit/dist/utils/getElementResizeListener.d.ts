/// <reference types="lodash" />
declare const _default: (() => {
  listenTo: <T extends HTMLElement>(el: T, cb: (el?: T) => void) => void;
  removeListener: <T_1 extends HTMLElement>(el: T_1, cb: (el?: T_1) => void) => void;
  removeAllListener: <T_2 extends HTMLElement>(el: T_2) => void;
  uninstall: <T_3 extends HTMLElement>(el: T_3) => void;
}) &
  import('lodash').MemoizedFunction;
export default _default;
