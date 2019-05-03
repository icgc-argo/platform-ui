import React from "react";
import urlJoin from "url-join";
import Router from "next/router";

import GoogleLogin from "uikit/SocialLoginButtons/GoogleLogin";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";
import { LOCAL_STORAGE_REDIRECT_KEY } from "global/constants";
import { getRedirectPathForUser } from "global/utils/pages";
import { createPage } from "./_app";

export default createPage({
  isPublic: true,
  getInitialProps: ({ query, egoJwt, res }) => {
    const { redirect } = query;
    if (egoJwt && res) {
      res.redirect(redirect || getRedirectPathForUser(egoJwt));
    }
    return {
      redirect,
      egoJwt
    };
  }
})(({ redirect, egoJwt }) => {
  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getRedirectPathForUser(egoJwt));
    } else {
      if (redirect) {
        localStorage.setItem(LOCAL_STORAGE_REDIRECT_KEY, redirect);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
      }
    }
  }, []);
  return (
    <div>
      <GoogleLogin
        link={urlJoin(
          EGO_API_ROOT,
          `api/oauth/login/google?client_id=${EGO_CLIENT_ID}`
        )}
      />
    </div>
  );
});
