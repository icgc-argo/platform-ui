import React from "react";
import Router from "next/router";

import useEgoToken from "global/hooks/useEgoToken";
import { LOCAL_STORAGE_REDIRECT_KEY, LOGIN_PAGE_PATH } from "global/constants";
import { getRedirectPathForUser } from "global/utils/pages";

const Page = () => {
  const { data, token, resolving } = useEgoToken({
    onError: () => Router.replace(LOGIN_PAGE_PATH)
  });
  React.useEffect(() => {
    const currentRedirect = localStorage.getItem(LOCAL_STORAGE_REDIRECT_KEY);
    if (!resolving && token) {
      if (currentRedirect) {
        localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
        Router.replace(currentRedirect);
      } else {
        Router.replace(getRedirectPathForUser(token));
      }
    }
  });
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

Page.isPublic = true;

export default Page;
