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

import { usePageQuery } from 'global/hooks/usePageContext';
import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ERROR_STATUS_KEY } from 'pages/_error';
import PROGRAM_SHORTNAME from './gql/PROGRAM_SHORTNAME.gql';
import { useGlobalLoadingState } from 'components/ApplicationRoot';
import { sleep } from 'global/utils/common';
import useAuthContext from './useAuthContext';

export const useProgramCheckEffect = () => {
  const { shortName } = usePageQuery<{ shortName: string }>();
  const { loading: loadingQuery, data: { program = undefined } = {} } = useQuery<{
    program: { name: string; shortName: string };
  }>(PROGRAM_SHORTNAME, {
    variables: {
      shortName: shortName,
    },
  });
  const { setLoading: setLoaderShown, isLoading: isLoaderShown } = useGlobalLoadingState();
  const { isLoggingOut } = useAuthContext();

  useEffect(() => {
    if (!isLoggingOut) {
      if (!program && !isLoaderShown) {
        setLoaderShown(true);
      }
      if (!loadingQuery) {
        if (!program) {
          const err = new Error('Program not found') as Error & { statusCode?: number };
          err[ERROR_STATUS_KEY] = 404;
          throw err;
        } else if (isLoaderShown) {
          sleep(1200).then(() => setLoaderShown(false));
        }
      }
    }
  }, [program, loadingQuery]);
};
