import React from "react";
import jwtDecode from "jwt-decode";
import { get } from "lodash";

import useEgoToken from "global/hooks/useEgoToken";

const LoggedIn = () => {
  const { token: egoToken } = useEgoToken();
  const data = egoToken ? jwtDecode(egoToken) : null;
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
};

export default LoggedIn;
