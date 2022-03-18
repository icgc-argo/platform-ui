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

import { createContext, ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { decodeToken } from 'global/utils/egoJwt';
import updateJwt from '../utils/updateJwt';
import { AuthState } from '../utils/authReducer';

export type T_AuthContext = {
  data: ReturnType<typeof decodeToken> | null;
  egoJwt?: string;
  forceLogout: any;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  logOut: (path?: string) => void;
  permissions: string[];
  setJwt: (token: string) => void;
  updateJwt: () => Promise<string | void>;
};

const AuthContext = createContext<T_AuthContext>({
  data: null,
  egoJwt: undefined,
  forceLogout: () => {},
  isAuthenticated: false,
  isLoggingOut: false,
  logOut: () => {},
  permissions: [],
  setJwt: (token: string) => {},
  updateJwt: async () => {},
});

export function AuthProvider({
  authState,
  children,
  forceLogout,
  handleLogout,
  handleJwt,
}: {
  authState: AuthState;
  children: ReactElement;
  forceLogout: () => void;
  handleLogout: () => void;
  handleJwt: (token: string) => void;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState<T_AuthContext['isLoggingOut']>(false);

  const { isAuthenticated, userModel, userPermissions, userJwt = '' } = authState;

  const logOut: T_AuthContext['logOut'] = async (path) => {
    // this will be reset to false when user logs in again, and AuthContext is re-instantiated
    setIsLoggingOut(true);
    router
      .push('/')
      .then(() => handleLogout())
      .then(router.reload);
  };

  const authContextValue: T_AuthContext = {
    data: userModel,
    egoJwt: userJwt,
    forceLogout,
    isAuthenticated,
    isLoggingOut,
    logOut,
    permissions: userPermissions,
    setJwt: handleJwt,
    updateJwt,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return useContext(AuthContext);
}
