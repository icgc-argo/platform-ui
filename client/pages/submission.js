//@flow
import React from "react";
import { get } from "lodash";

import { isDccMember, decodeToken } from "global/utils/egoJwt";
import { createPage } from "global/utils/pages";

export default createPage({
  isAccessible: async ({ egoJwt, ctx }) => {
    return isDccMember(egoJwt);
  },
  getInitialProps: async ({ egoJwt, asPath, query, res }) => {
    const data = decodeToken(egoJwt);
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
