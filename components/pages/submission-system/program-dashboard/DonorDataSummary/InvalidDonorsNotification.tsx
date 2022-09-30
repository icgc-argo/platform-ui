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

import { css } from '@emotion/core';
import { Link, Notification } from '@icgc-argo/uikit';
import { DOCS_DICTIONARY_PAGE } from 'global/constants/docSitePaths';
import { useClinicalSubmissionSchemaVersion } from 'global/hooks/useClinicalSubmissionSchemaVersion';
import pluralize from 'pluralize';

export const InvalidDonorsNotification = ({ numInvalidDonors }: { numInvalidDonors: number }) => {
  const latestDictionaryResponse = useClinicalSubmissionSchemaVersion();

  const errorBody = (
    <div
      css={css`
        padding: 8px 8px 8px 0px;
      `}
    >
      {!latestDictionaryResponse.loading && (
        <Link href={DOCS_DICTIONARY_PAGE} target="_blank">
          Version {latestDictionaryResponse.data.clinicalSubmissionSchemaVersion} of the data
          dictionary
        </Link>
      )}{' '}
      was released and has made some donors invalid against the latest dictionary. Please correct
      the clinical data for the highlighted donors.
    </div>
  );

  const errorTitle = `${numInvalidDonors.toLocaleString()} ${pluralize(
    'donor',
    numInvalidDonors,
  )} ${pluralize('is', numInvalidDonors)} invalid and require updated clinical data.`;

  return numInvalidDonors > 0 ? (
    <Notification
      css={css`
        margin-top: 10px;
      `}
      size="MD"
      variant="ERROR"
      title={errorTitle}
      content={errorBody}
      interactionType={'NONE'}
    />
  ) : null;
};
