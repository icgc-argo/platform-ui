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

import urlJoin from 'url-join';
import { getConfig } from 'global/config';
import Cookies from 'js-cookie';
import { EGO_JWT_KEY } from 'global/constants';
import { isValidJwt } from './egoJwt';
import Queue from 'promise-queue';

const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();

var maxConcurrent = 1;
var maxQueue = Infinity;
var queue = new Queue(maxConcurrent, maxQueue);

// pass client_id to get ego api to set correct response headers
const refreshUrl = urlJoin(EGO_API_ROOT, `/api/oauth/refresh?client_id=${EGO_CLIENT_ID}`);

export default () =>
  queue.add(() => {
    return fetch(refreshUrl, {
      credentials: 'include',
      headers: {
        accept: '*/*',
        authorization: Cookies.get(EGO_JWT_KEY) || '',
      },
      method: 'POST',
    })
      .then(res => res.text())
      .then(newJwt => {
        if (isValidJwt(newJwt)) {
          Cookies.set(EGO_JWT_KEY, newJwt);
        }
        return newJwt;
      });
  });
