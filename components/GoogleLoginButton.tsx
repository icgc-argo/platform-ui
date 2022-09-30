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

import { GoogleLogin } from '@icgc-argo/uikit';
import { removeToken } from 'global/hooks/useAuthContext';
import useFiltersContext from './pages/file-repository/hooks/useFiltersContext';

const GoogleLoginButton: React.ComponentType<React.ComponentProps<typeof GoogleLogin>> = ({
  ...props
}) => {
  const { clearFilters } = useFiltersContext();
  return (
    <GoogleLogin
      {...props}
      onClick={(e) => {
        // if there's an existing jwt, the url does not decode properly and the app returns a 404. the browser navigation does not show any platform redirect param
        // when the jwt is removed first, the redirect parameter shows up properly in the url and navigation to the details page occurs after login
        // this looks like it is somehow related to the _app auth check + redirect logic, but next returns the /_error path immediately so haven't pinpointed what is happening
        // for reference:
        // jwt is removed, this is the url after the browser comes back from google: http://localhost:8080/?redirect=/submission%2Fprogram%2Fjoin%2Fdetails%2F<inviteId>%3FisOauth%3Dtrue
        // jwt is NOT removed: http://localhost:8080/submission%2Fprogram%2Fjoin%2Fdetails%2F<inviteId>%3FisOauth%3Dtrue
        // NOTE: the removeToken() fix does not work if the login button is right clicked to open a new tab, user will get a 404 after login as mentioned above
        if (props.onClick) {
          props.onClick(e);
        }
        clearFilters();
        removeToken();
      }}
    />
  );
};

export default GoogleLoginButton;
