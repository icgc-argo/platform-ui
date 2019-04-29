import React from "react";
import fetch from "isomorphic-fetch";
import jwtDecode from "jwt-decode";
import urlJoin from "url-join";

import { EGO_JWT_KEY } from "global/constants";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";

const egoLoginUrl = urlJoin(
  EGO_API_ROOT,
  `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`
);

const LoggedIn = () => {
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    (async () => {
      try {
        const egoToken =
          localStorage.getItem(EGO_JWT_KEY) ||
          (await fetch(egoLoginUrl, {
            credentials: "include",
            headers: { accept: "*/*" },
            body: null,
            method: "GET",
            mode: "cors"
          }).then(resp => resp.text()));
        localStorage.setItem(EGO_JWT_KEY, egoToken);
        const data = jwtDecode(egoToken);
        setName(`${data.context.user.firstName} ${data.context.user.lastName}`);
      } catch (err) {
        console.warn("err", err);
      }
    })();
  }, []);
  return <div>Logged in user: {name}</div>;
};

export default LoggedIn;
