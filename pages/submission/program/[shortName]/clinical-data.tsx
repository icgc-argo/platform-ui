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

import ProgramClinicalData from 'components/pages/submission-system/program-submitted-data';
import { getConfig } from 'global/config';
import { usePageQuery } from 'global/hooks/usePageContext';
import { canReadProgram } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ErrorPage from 'pages/_error';

export default createPage({
  isPublic: false,
  isAccessible: async ({ ctx, initialPermissions: permissions }) => {
    const {
      query: { shortName },
    } = ctx;
    return canReadProgram({ permissions, programId: String(shortName) });
  },
  startWithGlobalLoader: true,
})((props) => {
  const { FEATURE_SUBMITTED_DATA_ENABLED } = getConfig();
  const { donorId } = usePageQuery<{ donorId: string }>();

  if (!FEATURE_SUBMITTED_DATA_ENABLED) return <ErrorPage statusCode={404} />;
  return <ProgramClinicalData {...props} donorId={donorId} />;
});
