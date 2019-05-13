//@flow
import React from "react";
import { get } from "lodash";

import {
  isRdpcMember,
  getAuthorizedProgramPolicies,
  decodeToken
} from "global/utils/egoJwt";
import { createPage } from "global/utils/pages";

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    return !isRdpcMember(egoJwt);
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    const data = decodeToken(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    const authorizedPrograms = getAuthorizedProgramPolicies(egoJwt);
    return { firstName, lastName, authorizedPrograms };
  }
})(({ egoJwt, firstName, lastName, authorizedPrograms = [] }) => {
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
});
