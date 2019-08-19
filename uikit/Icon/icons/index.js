//@flow
import spinner from './collection/spinner';
import chevron_down from './collection/chevron_down';
import chevron_right from './collection/chevron_right';
import dashboard from './collection/dashboard';
import programs from './collection/programs';
import rdpc from './collection/rdpc';
import slash from './collection/slash';
import search from './collection/search';
import times from './collection/times';
import asterisk from './collection/asterisk';
import users from './collection/users';
import edit from './collection/edit';
import times_circle from './collection/times_circle';
import checkmark from './collection/checkmark';
import info from './collection/info';
import success from './collection/success';
import warning from './collection/warning';
import mail from './collection/mail';
import trash from './collection/trash';
import google from './collection/google';
import plus_circle from './collection/plus_circle';
import key from './collection/key';
import user from './collection/user';

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
  slash,
  search,
  times,
  times_circle,
  asterisk,
  users,
  edit,
  checkmark,
  info,
  success,
  warning,
  mail,
  trash,
  google,
  plus_circle,
  key,
  user,
};

export type UikitIconNames = $Keys<typeof Icons>;

export default Icons;
