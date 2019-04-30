import React from "react";
import urlJoin from "url-join";
import Router from "next/router";

import GoogleLogin from "uikit/SocialLoginButtons/GoogleLogin";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";
import { LOCAL_STORAGE_REDIRECT_KEY } from "global/constants";

const Login = ({ redirect, egoJwt }) => {
  React.useEffect(() => {
    if (egoJwt) {
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

Login.getInitialProps = ({ query, egoJwt }) => {
  console.log("egoJwt: ", egoJwt);
  return {
    redirect: query.redirect || "/"
  };
};

export default Login;
