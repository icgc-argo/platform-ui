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

import Cookies from 'js-cookie';
import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, getPermissionsFromToken, isValidJwt } from 'global/utils/egoJwt';

export const authInitialState = {
  isAuthenticated: false,
  userModel: null,
  userPermissions: [],
  userJwt: undefined,
  isLoggingOut: false,
};

export type AuthState = {
  isAuthenticated: boolean;
  userModel: ReturnType<typeof decodeToken> | null;
  userPermissions: string[];
  userJwt?: string;
  isLoggingOut: boolean;
};

type AuthAction =
  | {
      type: 'REMOVE_TOKEN' | 'VALIDATE_TOKEN' | 'GET_TOKEN' | 'FINISH_LOGOUT';
    }
  | {
      type: 'UPDATE_TOKEN';
      payload: string;
    };

const setJwtCookie = (token: string) => {
  Cookies.set(EGO_JWT_KEY, token);
};

const getTokenCookie = (): string => {
  return Cookies.get(EGO_JWT_KEY);
};

const removeTokenCookie = () => {
  Cookies.set(EGO_JWT_KEY, null);
};

const makeTokenState = (token: string, state: AuthState) => {
  if (isValidJwt(token)) {
    setJwtCookie(token);
    return {
      ...state,
      isAuthenticated: true,
      isLoggingOut: false,
      userModel: decodeToken(token),
      userPermissions: getPermissionsFromToken(token),
      userJwt: token,
    };
  } else {
    removeTokenCookie();
    return authInitialState;
  }
};

export default function authReducer(state: AuthState = authInitialState, action: AuthAction) {
  switch (action.type) {
    case 'GET_TOKEN':
      const storedToken = getTokenCookie();
      return makeTokenState(storedToken, state);
    case 'UPDATE_TOKEN':
      const tokenPayload = action.payload || '';
      return makeTokenState(tokenPayload, state);
    case 'REMOVE_TOKEN':
      removeTokenCookie();
      return {
        ...authInitialState,
        isLoggingOut: true,
      };
    case 'FINISH_LOGOUT':
      removeTokenCookie();
      return {
        ...authInitialState,
        isLoggingOut: false,
      };
    default:
      return state;
  }
}
