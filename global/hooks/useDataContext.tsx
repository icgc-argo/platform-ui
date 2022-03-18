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

import { createContext, ReactElement, useContext } from 'react';
import fetch from 'isomorphic-fetch';
import { isValidJwt } from 'global/utils/egoJwt';
import refreshJwt from 'global/auth/utils/refreshJwt';
import useAuthContext from 'global/auth/hooks/useAuthContext';

type T_DataContext = {
  downloadWithAuth: (input: RequestInfo, init?: RequestInit) => Promise<void>;
  fetchWithAuth: typeof fetch;
};

const DataContext = createContext<T_DataContext>({
  downloadWithAuth: async () => {},
  fetchWithAuth: fetch,
});

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const { egoJwt, logOut, setJwt } = useAuthContext();

  const fetchWithAuth: T_DataContext['fetchWithAuth'] = async (uri, options) => {
    const modifiedOption = {
      ...(options || {}),
      headers: { ...((options && options.headers) || {}), authorization: `Bearer ${egoJwt || ''}` },
    };

    if (egoJwt && !isValidJwt(egoJwt)) {
      const newJwt = (await refreshJwt()) as string;
      if (isValidJwt(newJwt)) {
        setJwt(newJwt);
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

  const downloadWithAuth: T_DataContext['downloadWithAuth'] = async (uri, options) => {
    const response = await fetchWithAuth(uri, options);
    const data = await response.blob();

    const contentDispositionHeader = response.headers.get('content-disposition');
    const filename = contentDispositionHeader ? contentDispositionHeader.split('filename=')[1] : '';

    const blob = new Blob([data], {
      type: data.type || 'application/octet-stream',
    });
    // @ts-ignore
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE doesn't allow using a blob object directly as link href.
      // Workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      // @ts-ignore
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

  const dataContextValue = {
    downloadWithAuth,
    fetchWithAuth,
  };

  return <DataContext.Provider value={dataContextValue}>{children}</DataContext.Provider>;
};

export default function useDataContext() {
  return useContext(DataContext);
}
