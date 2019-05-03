//@flow
import * as React from "react";
import {
  LOCAL_STORAGE_REDIRECT_KEY,
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_ENTITY_PATH,
  DCC_OVERVIEW_PATH,
  USER_PAGE_PATH
} from "../constants";
import { isDccMember } from "./egoJwt";

export const getRedirectPathForUser = (egoJwt: string) => {
  if (isDccMember(egoJwt)) {
    return DCC_OVERVIEW_PATH;
  } else {
    return USER_PAGE_PATH;
  }
};

export type GetInitialPropsContext = {
  pathName: string,
  query: {
    [key: string]: any
  },
  asPath: string,
  req: any,
  res: any,
  err?: Error
};
export type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt: string
};
type PageConfigProps = {
  isPublic: boolean,
  isAccessible: ({ egoJwt: string, ctx: GetInitialPropsContext }) => boolean,
  getInitialProps: GetInitialPropsContextWithEgo => any
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;
export const createPage = ({
  isPublic = false,
  isAccessible = () => true,
  getInitialProps = () => ({})
}: {
  isPublic?: boolean,
  isAccessible?: ({ egoJwt: string, ctx: GetInitialPropsContext }) => boolean,
  getInitialProps?: GetInitialPropsContextWithEgo => any
}) => (page: Function = () => <div>Here's a page</div>): PageWithConfig => {
  page.isPublic = isPublic;
  page.isAccessible = isAccessible;
  page.getInitialProps = getInitialProps;
  return page;
};
