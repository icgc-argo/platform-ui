//@flow
import colors from './colors';
import type { ProgressStatus } from '../../Progress/';

const color: { [key: ProgressStatus]: string } = {
  success: colors.success,
  error: colors.error,
  pending: colors.warning,
  disabled: colors.grey,
};

export default { color };
