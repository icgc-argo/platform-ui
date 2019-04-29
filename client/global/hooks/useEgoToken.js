import React from "react";
import fetch from "isomorphic-fetch";
import urlJoin from "url-join";
import jwtDecode from "jwt-decode";

import { EGO_JWT_KEY } from "global/constants";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";

const egoLoginUrl = urlJoin(
  EGO_API_ROOT,
  `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`
);

const getEgoToken = async () => {
  return await (localStorage.getItem(EGO_JWT_KEY) ||
    fetch(egoLoginUrl, {
      credentials: "include",
      headers: { accept: "*/*" },
      body: null,
      method: "GET",
      mode: "cors"
    }).then(resp => resp.text()));
};

export default () => {
  const [token, setToken] = React.useState(null);
  const [resolving, setResolving] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setResolving(true);
      try {
        const egoToken = await getEgoToken();
        localStorage.setItem(EGO_JWT_KEY, egoToken);
        setToken(egoToken);
      } catch (err) {
        console.warn("err", err);
      }
      setResolving(false);
    })();
  }, []);
  return { token, resolving, data: token ? jwtDecode(token) : null };
};
