import React from "react";
import fetch from "isomorphic-fetch";
import jwtDecode from "jwt-decode";
import urlJoin from "url-join";
import Cookies from "js-cookie";

import { EGO_JWT_KEY } from "global/constants";
import { EGO_API_ROOT, EGO_CLIENT_ID } from "global/config";

const egoLoginUrl = urlJoin(
  EGO_API_ROOT,
  `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`
);

export default ({ onError = () => {} } = {}) => {
  const [token, setToken] = React.useState(null);
  const [resolving, setResolving] = React.useState(false);
  React.useEffect(() => {
    setResolving(true);
    const existingToken = Cookies.get(EGO_JWT_KEY);
    if (existingToken) {
      setToken(existingToken);
      setResolving(false);
    } else {
      fetch(egoLoginUrl, {
        credentials: "include",
        headers: { accept: "*/*" },
        body: null,
        method: "GET",
        mode: "cors"
      })
        .then(res => res.text())
        .then(egoToken => {
          jwtDecode(egoToken);
          Cookies.set(EGO_JWT_KEY, egoToken);
          setToken(egoToken);
          setResolving(false);
        })
        .catch(err => {
          console.warn("err: ", err);
          setResolving(false);
          onError(err);
        });
    }
  }, []);
  return { token, resolving, data: token ? jwtDecode(token) : null };
};
