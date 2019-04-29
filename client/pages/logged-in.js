import React from "react";
import { get } from "lodash";

import useEgoToken from "global/hooks/useEgoToken";

const LoggedIn = () => {
  const { data } = useEgoToken();
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  return (
    <div>
      Logged in user: {firstName} {lastName}
    </div>
  );
};

export default LoggedIn;
