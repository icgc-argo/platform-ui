import React from "react";
import urlJoin from "url-join";
import Router from "next/router";

import GoogleLogin from "uikit/SocialLoginButtons/GoogleLogin";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";
import { EGO_JWT_KEY, LOCAL_STORAGE_REDIRECT_KEY } from "global/constants";

const Login = ({ redirect }) => {
  React.useEffect(() => {
    const existingToken = localStorage.getItem(EGO_JWT_KEY);
    if (existingToken) {
      console.log("redirect: ", redirect);
      Router.replace(redirect);
    } else {
      localStorage.setItem(LOCAL_STORAGE_REDIRECT_KEY, redirect);
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
};

Login.getInitialProps = ({ query }) => {
  return {
    redirect: query.redirect || "/"
  };
};

export default Login;
