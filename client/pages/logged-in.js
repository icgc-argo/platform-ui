import React from "react";
import { get } from "lodash";
import Router from "next/router";
import nextCookies from "next-cookies";

import useEgoToken from "global/hooks/useEgoToken";
import { LOCAL_STORAGE_REDIRECT_KEY, EGO_JWT_KEY } from "global/constants";

const LoggedIn = () => {
  const { data, token } = useEgoToken({
    onError: () => Router.replace("/login")
  });
  const firstName = get(data, "context.user.firstName", "");
  const lastName = get(data, "context.user.lastName", "");
  React.useEffect(() => {
    const currentRedirect = localStorage.getItem(LOCAL_STORAGE_REDIRECT_KEY);
    if (token && currentRedirect) {
      localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
      Router.replace(currentRedirect);
    }
  });
  return (
    <div>
      Logged in user: {firstName} {lastName}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LoggedIn;
