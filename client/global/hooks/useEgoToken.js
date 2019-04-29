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

export default ({ onError = () => {} }) => {
  const [token, setToken] = React.useState(null);
  const [resolving, setResolving] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setResolving(true);
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
        setToken(egoToken);
      } catch (err) {
        console.warn("err", err);
        onError(err);
      }
      setResolving(false);
    })();
  }, []);
  return { token, resolving, data: token ? jwtDecode(token) : null };
};
