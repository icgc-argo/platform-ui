import React from "react";
import Router from "next/router";
import Link from "next/link";

import useEgoToken from "global/hooks/useEgoToken";
import { LOCAL_STORAGE_REDIRECT_KEY, LOGIN_PAGE_PATH } from "global/constants";

const Page = () => {
  const { data, token } = useEgoToken({
    onError: () => Router.replace(LOGIN_PAGE_PATH)
  });
  React.useEffect(() => {
    const currentRedirect = localStorage.getItem(LOCAL_STORAGE_REDIRECT_KEY);
    if (token && currentRedirect) {
      localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
      Router.replace(currentRedirect);
    }
  });
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href="/user">User page</Link>
    </div>
  );
};

Page.isPublic = true;

export default Page;
