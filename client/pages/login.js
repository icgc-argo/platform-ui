import React from "react";
import urlJoin from "url-join";
import Router from "next/router";

import GoogleLogin from "uikit/SocialLoginButtons/GoogleLogin";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";
import { LOCAL_STORAGE_REDIRECT_KEY } from "global/constants";
import { withPathConfigValidation } from "./_app";

const Page = withPathConfigValidation(({ redirect, egoJwt }) => {
  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect);
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

Page.isPublic = true;

Page.getInitialProps = ({ query, egoJwt }) => {
  return {
    redirect: query.redirect,
    egoJwt
  };
};

export default Page;
