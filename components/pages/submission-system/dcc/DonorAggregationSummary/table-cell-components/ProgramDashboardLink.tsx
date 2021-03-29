import Link from 'next/link';
import { PROGRAM_SHORT_NAME_PATH, PROGRAM_DASHBOARD_PATH } from 'global/constants/pages';
export default ({ program }: { program: string }) => {
  return (
    <Link
      as={PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, program)}
      href={PROGRAM_DASHBOARD_PATH}
    >
      {program}
    </Link>
  );
};
