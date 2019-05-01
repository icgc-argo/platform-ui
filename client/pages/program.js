import React from "react";
import jwtDecode from "jwt-decode";
import { get } from "lodash";
import Router from "next/router";

import {
  isRdpcMember,
  getAuthorizedProgramPolicies
} from "global/utils/egoJwt";
import { LOGIN_PAGE_PATH } from "global/constants";

const Page = ({ egoJwt, firstName, lastName, authorizedPrograms = [] }) => {
  return (
    <div>
      <div>Programs list</div>
      Logged in user: {firstName} {lastName}
      <div>
        <div>authorized program policies: </div>
        {authorizedPrograms.map(policy => (
          <div key={policy}>{policy}</div>
        ))}
      </div>
    </div>
  );
};

Page.getInitialProps = ({ egoJwt, asPath, query }) => {
  try {
    const data = jwtDecode(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    const authorizedPrograms = getAuthorizedProgramPolicies(egoJwt);
    return { firstName, lastName, authorizedPrograms };
  } catch (err) {
    return {};
  }
};

Page.isAccessible = ({ egoJwt, ctx }) => {
  return !isRdpcMember(egoJwt);
};

export default Page;
