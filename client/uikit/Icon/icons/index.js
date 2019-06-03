import { css } from '@emotion/core';

import spinner from './collection/spinner';
import chevron_down from './collection/chevron_down';
import chevron_right from './collection/chevron_right';
import dashboard from './collection/dashboard';
import programs from './collection/programs';
import rdpc from './collection/rdpc';

/**
 * Icon path and property lookup object
 * css - sensible defaults - can be overridden from component
 */
const Icons = {
  spinner,
  chevron_down,
  chevron_right,
  dashboard,
  programs,
  rdpc,
};

export default Icons;
