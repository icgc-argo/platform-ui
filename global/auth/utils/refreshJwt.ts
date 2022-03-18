/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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
import { isValidJwt } from '../../utils/egoJwt';
import Queue from 'promise-queue';
import useAuthContext from 'global/auth/hooks/useAuthContext';
import { EGO_JWT_KEY } from 'global/constants';
import { EGO_REFRESH_URL } from 'global/auth/utils/egoPaths';

var maxConcurrent = 1;
var maxQueue = Infinity;
var queue = new Queue(maxConcurrent, maxQueue);

const refreshJwt = () =>
  queue.add(() => {
    const { setJwt } = useAuthContext();

    // get token from cookie not context,
    // in case another session got a new JWT.
    const storedJwt = Cookies.get(EGO_JWT_KEY);

    if (isValidJwt(storedJwt)) {
      setJwt(storedJwt);
      return Promise.resolve(storedJwt);
    }

    return fetch(EGO_REFRESH_URL, {
      credentials: 'include',
      headers: {
        accept: '*/*',
        authorization: `Bearer ${storedJwt}`,
      },
      method: 'POST',
    })
      .then((res) => res.text())
      .then((newJwt) => {
        if (isValidJwt(newJwt)) {
          setJwt(newJwt);
        }
        return newJwt;
      });
  });

export default refreshJwt;
