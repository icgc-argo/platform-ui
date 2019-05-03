// @flow
import React from "react";
import jwtDecode from "jwt-decode";
import { get } from "lodash";

import { isRdpcMember, hasAccessToProgram } from "global/utils/egoJwt";
import { createPage } from "./_app";

export default createPage({
  isPublic: false,
  isAccessible: ({ egoJwt, ctx }) => {
    const {
      query: { id }
    } = ctx;
    if (id) {
      return (
        !isRdpcMember(egoJwt) && hasAccessToProgram({ egoJwt, programId: id })
      );
    } else {
      return true;
    }
  },
  getInitialProps: ({ egoJwt, asPath, query }) => {
    const data = jwtDecode(egoJwt);
    const firstName = get(data, "context.user.firstName", "");
    const lastName = get(data, "context.user.lastName", "");
    return { firstName, lastName, programId: query.id };
  }
})(({ egoJwt, firstName, lastName, programId }) => {
  return (
    <div>
      <div>Programs list</div>
      Logged in user: {firstName} {lastName}
      <div>
        <div>Program id: {programId}</div>
      </div>
    </div>
  );
});
