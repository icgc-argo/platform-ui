import React from "react";
import { get } from "lodash";
import jwtDecode from "jwt-decode";

const SelfDemo = ({ egoJwt }) => {
  const data = jwtDecode(egoJwt);
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
};

export default SelfDemo;
