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

import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Cookies from 'js-cookie';
import React from 'react';
import { getPermissionsFromToken } from 'global/utils/egoJwt';
import { useRouter } from 'next/router';
import DefaultLayout from '../components/pages/DefaultLayout';
import FullPageLoader from '../components/placeholders/FullPageLoader';

export default createPage({ isPublic: true })(() => {
  const router = useRouter();
  const { EGO_TOKEN_URL } = getConfig();

  const redirect = (token: string) => {
    const redirect = getDefaultRedirectPathForUser(getPermissionsFromToken(token));
    router.push(redirect);
  };

  React.useEffect(() => {
    fetch(EGO_TOKEN_URL, {
      credentials: 'include',
      headers: { accept: '*/*' },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.text())
      .then((egoToken) => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        redirect(egoToken);
      })
      .catch((err) => {
        console.warn('err: ', err);
        redirect(null);
      });
  });

  return (
    <DefaultLayout>
      <FullPageLoader />
    </DefaultLayout>
  );
});
