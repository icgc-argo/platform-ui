import React from "react";
import jwtDecode from "jwt-decode";
import { get } from "lodash";

import { isDccMember } from "global/utils/egoJwt";
import { createPage } from "./_app";

export default createPage({
  isAccessible: ({ egoJwt, ctx }) => {
    return isDccMember(egoJwt);
  },
  getInitialProps: ({ egoJwt, asPath, query, res }) => {
    const data = jwtDecode(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    return { firstName, lastName };
  }
})(({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      <div>DCC Overview Dashboard</div>
      Logged in user: {firstName} {lastName}
    </div>
  );
});
