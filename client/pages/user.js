import React from "react";
import { get } from "lodash";
import jwtDecode from "jwt-decode";

import { createPage } from "./_app";

export default createPage({
  getInitialProps: ({ egoJwt, asPath, query, res }) => {
    const data = jwtDecode(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    return { firstName, lastName };
  }
})(({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
});
