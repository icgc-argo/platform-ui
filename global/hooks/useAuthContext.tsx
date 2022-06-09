/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, isValidJwt, getPermissionsFromToken } from 'global/utils/egoJwt';
import { getFilename } from 'global/utils/stringUtils';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import * as React from 'react';
import urlJoin from 'url-join';
import refreshJwt from 'global/utils/refreshJwt';
import queryString from 'query-string';

type T_AuthContext = {
  egoJwt?: string;
  logOut: (path?: string) => void;
  updateToken: () => Promise<string | void>;
  data: ReturnType<typeof decodeToken> | null;
  fetchWithEgoToken: typeof fetch;
  downloadFileWithEgoToken: (input: RequestInfo, init?: RequestInit) => Promise<void>;
  permissions: string[];
  isLoggingOut: boolean;
};

const AuthContext = React.createContext<T_AuthContext>({
  egoJwt: undefined,
  logOut: () => {},
  updateToken: async () => {},
  data: null,
  fetchWithEgoToken: fetch,
  downloadFileWithEgoToken: async () => {},
  permissions: [],
  isLoggingOut: false,
});

const setToken = (token: string) => {
  Cookies.set(EGO_JWT_KEY, token);
};

export const removeToken = () => {
  Cookies.remove(EGO_JWT_KEY);
};

export function AuthProvider({
  egoJwt,
  children,
}: {
  egoJwt?: string;
  children: React.ReactElement;
  initialPermissions: string[];
}) {
  const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();
  const updateTokenUrl = urlJoin(
    EGO_API_ROOT,
    `/api/oauth/update-ego-token?client_id=${EGO_CLIENT_ID}`,
  );

  const permissions = getPermissionsFromToken(egoJwt);

  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const router = useRouter();

  const logOut: T_AuthContext['logOut'] = async (path) => {
    // this will be reset to false when user logs in again, and AuthContext is re-instantiated
    setIsLoggingOut(true);
    removeToken();
    if (path) {
      let { url, query } = queryString.parseUrl(path);
      // Temp until we can remove private filters
      delete query.filters;
      router.push({ pathname: url, query: { ...query, loggingOut: true } }).then(router.reload);
    } else {
      router.push('/').then(router.reload);
    }
  };

  const fetchWithEgoToken: T_AuthContext['fetchWithEgoToken'] = async (uri, options) => {
    const modifiedOption = {
      ...(options || {}),
      headers: { ...((options && options.headers) || {}), authorization: `Bearer ${egoJwt || ''}` },
    };

    if (egoJwt && !isValidJwt(egoJwt)) {
      const newJwt = (await refreshJwt()) as string;
      if (isValidJwt(newJwt)) {
        setToken(newJwt);
      } else {
        logOut();
      }
      return fetch(uri, {
        ...modifiedOption,
        headers: { ...modifiedOption.headers, authorization: `Bearer ${newJwt}` },
      });
    } else {
      return fetch(uri, modifiedOption);
    }
  };

  const downloadFileWithEgoToken: T_AuthContext['downloadFileWithEgoToken'] = async (
    uri,
    options,
  ) => {
    const response = await fetchWithEgoToken(uri, options);
    const data = await response.blob();

    const contentDispositionHeader = response.headers.get('content-disposition');
    const filename = contentDispositionHeader ? getFilename(contentDispositionHeader) : '';

    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE doesn't allow using a blob object directly as link href.
      // Workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, filename);
      return;
    }
    // Other browsers
    // Create a link pointing to the ObjectURL containing the blob
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  };

  if (egoJwt && !isValidJwt(egoJwt)) {
    logOut();
  }

  const updateToken = () => {
    return fetch(updateTokenUrl, {
      credentials: 'include',
      headers: { Authorization: `Bearer ${egoJwt || ''}` },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.text())
      .then((egoToken) => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        return egoToken;
      })
      .catch((err) => {
        console.warn('err: ', err);
        throw err;
      });
  };

  const authData = {
    egoJwt,
    logOut,
    data: egoJwt ? decodeToken(egoJwt || '') : null,
    updateToken,
    fetchWithEgoToken,
    downloadFileWithEgoToken,
    permissions,
    isLoggingOut,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
