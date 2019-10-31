import elementResizeDetectorMaker from 'element-resize-detector';
import memoize from 'lodash/memoize';

export default memoize(elementResizeDetectorMaker as () => {
  listenTo: <T extends HTMLElement>(el: T, cb: (el?: T) => void) => void;
  removeListener: <T extends HTMLElement>(el: T, cb: (el?: T) => void) => void;
  removeAllListener: <T extends HTMLElement>(el: T) => void;
  uninstall: <T extends HTMLElement>(el: T) => void;
});
