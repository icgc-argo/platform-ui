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

import { useState } from 'react';
import urlJoin from 'url-join';
import { isEmpty } from 'lodash';

import useTheme from '@icgc-argo/uikit/utils/useTheme';
import Button from '@icgc-argo/uikit/Button';
import Typography from '@icgc-argo/uikit/Typography';

import useAuthContext from 'global/hooks/useAuthContext';
import { getConfig } from 'global/config';
const { GATEWAY_API_ROOT } = getConfig();
import { DONOR_AGGREGATOR_SYNC_PROGRAM } from 'global/constants/gatewayApiPaths';

const SyncIndexButton = ({ program }: { program: string }) => {
  const theme = useTheme();
  const [requestResult, setRequestResult] = useState<'SUCCESS' | 'ERROR' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { fetchWithEgoToken } = useAuthContext();

  // On Click Handler sends request to gateway to sync program
  const sendSyncRequest = async () => {
    await fetchWithEgoToken(urlJoin(GATEWAY_API_ROOT, DONOR_AGGREGATOR_SYNC_PROGRAM), {
      method: 'POST',
      headers: { ['Content-Type']: 'application/json' },
      body: JSON.stringify({
        programId: program,
      }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            setRequestResult('SUCCESS');
            return;
          default:
            setRequestResult('ERROR');
            response
              .json()
              .then((data) =>
                data?.error && !isEmpty(data.error)
                  ? setErrorMessage(data.error)
                  : setErrorMessage('Unknown error occurred.'),
              );
        }
      })
      .catch((error) => {
        console.log(`Error sending sync request for ${program}:`, error);
        setRequestResult('ERROR');
        setErrorMessage('' + error);
      });
  };

  switch (requestResult) {
    case 'SUCCESS':
      return (
        <Typography component="span" bold color="success">
          Sync Initiated
        </Typography>
      );
    case 'ERROR':
      return (
        <div style={{ flexDirection: 'column', whiteSpace: 'pre-line' }}>
          <Typography component="div" bold color="error">
            Error:
          </Typography>
          <Typography component="div">{errorMessage}</Typography>
        </div>
      );

    default:
      return (
        <Button
          disabled={!!requestResult}
          isAsync
          onClick={sendSyncRequest}
          size="sm"
          variant="primary"
        >
          Sync: {program}
        </Button>
      );
  }
};
export default SyncIndexButton;
