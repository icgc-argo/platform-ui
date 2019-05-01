import React from "react";
import jwtDecode from "jwt-decode";
import { get } from "lodash";

import { isDccMember } from "global/utils/egoJwt";
import { LOGIN_PAGE_PATH } from "global/constants";

const Page = ({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      <div>DCC Overview Dashboard</div>
      Logged in user: {firstName} {lastName}
    </div>
  );
};

Page.getInitialProps = ({ egoJwt, asPath, query, res }) => {
  const data = jwtDecode(egoJwt);
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  return { firstName, lastName };
};

Page.isAccessible = ({ egoJwt, ctx }) => {
  if (!egoJwt) {
    ctx.res.redirect(`${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`);
  }
  return isDccMember(egoJwt);
};

export default Page;
