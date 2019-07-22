//@flow
import * as React from 'react';
import orderBy from 'lodash/orderBy';
import {
  LOCAL_STORAGE_REDIRECT_KEY,
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  DCC_OVERVIEW_PATH,
  USER_PAGE_PATH,
  PROGRAM_MANAGE_PATH,
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
  pathname: string,
  query: {
    [key: string]: any,
  },
  asPath: string,
  req?: any,
  res?: any,
  err?: Error,
};
export type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt: string,
};
type PageConfigProps = {
  isPublic: boolean,
  isAccessible: ({
    egoJwt: string,
    ctx: GetInitialPropsContext,
  }) => Promise<boolean>,
  getInitialProps: GetInitialPropsContextWithEgo => Promise<any>,
  getGqlQueriesToPrefetch: GetInitialPropsContextWithEgo => Promise<
    Array<{ query: any, variables?: { [key: string]: any } }>,
  >,
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;
export const createPage = ({
  isPublic = false,
  isAccessible = async () => true,
  getInitialProps = async () => ({}),
  getGqlQueriesToPrefetch = async () => [],
}: {
  isPublic?: $PropertyType<PageConfigProps, 'isPublic'>,
  isAccessible?: $PropertyType<PageConfigProps, 'isAccessible'>,
  getInitialProps?: $PropertyType<PageConfigProps, 'getInitialProps'>,
  getGqlQueriesToPrefetch?: $PropertyType<PageConfigProps, 'getGqlQueriesToPrefetch'>,
}) => (page: Function = () => <div>Here's a page</div>): PageWithConfig => {
  page.isPublic = isPublic;
  page.isAccessible = isAccessible;
  page.getGqlQueriesToPrefetch = getGqlQueriesToPrefetch;
  page.getInitialProps = getInitialProps;
  return page;
};
