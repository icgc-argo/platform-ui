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
import urljoin from 'url-join';
import { getConfig } from 'global/config';

const { DOCS_URL_ROOT } = getConfig();

export const DOCS_DICTIONARY_PAGE = urljoin(DOCS_URL_ROOT, `/dictionary/`);

export const DOCS_DNA_PIPELINE_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/analysis-workflows/dna-pipeline',
);
export const DOCS_DATA_ACCESS_PAGE = urljoin(DOCS_URL_ROOT, '/docs/data-access/data-access');
export const DOCS_DATA_DOWNLOAD_PAGE = urljoin(DOCS_URL_ROOT, '/docs/data-access/data-download');
export const DOCS_PROGRAMMATIC_APIS_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/data-access/programmatic-apis',
);
export const DOCS_PUBLICATION_GUIDELINE_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/data-access/publication-guidelines',
);
export const DOCS_API_TOKEN_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/data-access/user-profile-and-api-token',
);

export const DOCS_DATA_RELEASES_PAGE = urljoin(DOCS_URL_ROOT, '/docs/release-notes/data-releases');
export const DOCS_DICTIONARY_RELEASES_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/release-notes/dictionary-releases',
);
export const DOCS_SOFTWARE_RELEASES_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/release-notes/software-releases',
);

export const DOCS_CLINICAL_VALIDATION_RULES_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/clinical-data-validation-rules',
);
export const DOCS_DICTIONARY_OVERVIEW_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/dictionary-overview',
);
export const DOCS_FAQ_PAGE = urljoin(DOCS_URL_ROOT, '/docs/submission/faq');
export const DOCS_MANAGING_PROGRAM_ACCESS_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/managing-program-access',
);
export const DOCS_REGISTERING_SAMPLES_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/registering-samples',
);
export const DOCS_SUBMISSION_HARMONIZATION_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/submission-data-harmonization',
);
export const DOCS_SUBMISSION_OVERVIEW_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/submission-overview',
);
export const DOCS_SUBMITTED_DATA_PAGE = urljoin(DOCS_URL_ROOT, '/docs/submission/submitted-data');
export const DOCS_SUBMITTING_CLINICAL_DATA_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/submitting-clinical-data',
);
export const DOCS_SUBMITTING_MOLECULAR_DATA_PAGE = urljoin(
  DOCS_URL_ROOT,
  '/docs/submission/submitting-molecular-data',
);
