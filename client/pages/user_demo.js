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
  try {
    const data = jwtDecode(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    return { firstName, lastName };
  } catch (err) {
    res.redirect(`${LOGIN_PAGE_PATH}?redirect=${encodeURI(asPath)}`);
    console.log("error!");
  }
};

Page.isAccessible = ({ egoJwt, ctx }) => {
  try {
    jwtDecode(egoJwt);
    return true;
  } catch {
    return false;
  }
};

export default Page;
