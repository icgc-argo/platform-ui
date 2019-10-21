import colors from './colors';
import { ProgressStatus } from '../../Progress';

const color: { [key in ProgressStatus]: string } = {
  success: colors.success,
  error: colors.error,
  pending: colors.warning,
  disabled: '#cecfd3',
  locked: colors.accent3_dark,
};

export default { color };
