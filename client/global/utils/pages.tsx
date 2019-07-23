import * as React from 'react';
import orderBy from 'lodash/orderBy';
import {
  PROGRAMS_LIST_PATH,
  USER_PAGE_PATH,
  PROGRAM_SHORT_NAME_PATH,
  RDPC_PATH,
  PROGRAM_DASHBOARD_PATH,
} from 'global/constants/pages';
import {
  isDccMember,
  isRdpcMember,
  canReadSomeProgram,
  getReadableProgramShortNames,
} from './egoJwt';

export const getDefaultRedirectPathForUser = (
  egoJwt: string,
  useStatic: boolean = false,
): string => {
  if (isDccMember(egoJwt)) {
    return PROGRAMS_LIST_PATH;
  } else if (isRdpcMember(egoJwt)) {
    return RDPC_PATH;
  } else if (canReadSomeProgram(egoJwt)) {
    const readableProgramShortNames = getReadableProgramShortNames(egoJwt);
    const orderedProgramShortNames = orderBy(readableProgramShortNames);
    return egoJwt
      ? PROGRAM_DASHBOARD_PATH
      : PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, orderedProgramShortNames[0]);
  } else {
    return USER_PAGE_PATH;
  }
};

export type GetInitialPropsContext = {
  pathname: string;
  query: {
    [key: string]: any;
  };
  asPath: string;
  req?: any;
  res?: any;
  err?: Error;
};
export type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt: string;
};
type PageConfigProps = {
  isPublic: boolean;
  isAccessible: ({ egoJwt: string, ctx: GetInitialPropsContext }) => Promise<boolean>;
  getInitialProps: (p: GetInitialPropsContextWithEgo) => Promise<any>;
  getGqlQueriesToPrefetch: (
    p: GetInitialPropsContextWithEgo,
  ) => Promise<Array<{ query: any; variables?: { [key: string]: any } }>>;
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;

type CratePageConfig = {
  isPublic?: PageConfigProps['isPublic'];
  isAccessible?: PageConfigProps['isAccessible'];
  getInitialProps?: PageConfigProps['getInitialProps'];
  getGqlQueriesToPrefetch?: PageConfigProps['getGqlQueriesToPrefetch'];
};
export const createPage = ({
  isPublic = false,
  isAccessible = async () => true,
  getInitialProps = async () => ({}),
  getGqlQueriesToPrefetch = async () => [],
}: CratePageConfig) => (
  page: React.ComponentType<any> = () => <div>Here's a page</div>,
): PageWithConfig => {
  const pageWithConfig: typeof page & CratePageConfig = page;
  pageWithConfig.isPublic = isPublic;
  pageWithConfig.isAccessible = isAccessible;
  pageWithConfig.getGqlQueriesToPrefetch = getGqlQueriesToPrefetch;
  pageWithConfig.getInitialProps = getInitialProps;
  return pageWithConfig as PageWithConfig;
};
