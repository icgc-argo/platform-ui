import React from "react";
import { get } from "lodash";
import jwtDecode from "jwt-decode";

import { withPathConfigValidation } from "./_app";

const Page = withPathConfigValidation(({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
});

Page.getInitialProps = ({ egoJwt, asPath, query, res }) => {
  const data = jwtDecode(egoJwt);
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  return { firstName, lastName };
};

export default Page;
