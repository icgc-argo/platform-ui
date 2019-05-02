import React from "react";
import jwtDecode from "jwt-decode";
import { get } from "lodash";

import { isDccMember } from "global/utils/egoJwt";
import { withPathConfigValidation } from "./_app";

const Page = withPathConfigValidation(({ egoJwt, firstName, lastName }) => {
  return (
    <div>
      <div>DCC Overview Dashboard</div>
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

Page.isAccessible = ({ egoJwt, ctx }) => {
  return isDccMember(egoJwt);
};

export default Page;
