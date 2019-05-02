import React from "react";
import { get } from "lodash";
import jwtDecode from "jwt-decode";

import { LOGIN_PAGE_PATH } from "global/constants";

const Page = ({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
};

Page.getInitialProps = ({ egoJwt, asPath, query, res }) => {
  const data = jwtDecode(egoJwt);
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  throw new Error("yoooo!");
  return { firstName, lastName };
};

Page.isAccessible = ({ egoJwt, ctx }) => {
  try {
    jwtDecode(egoJwt);
    return true;
  } catch {
    return false;
  }
};

Page.isPublic = false;

export default Page;
