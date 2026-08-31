/*
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

import { Link } from '@icgc-argo/uikit';
import { NewsContainer, NewsItem } from './common';

const newsItems: NewsItem[] = [
  {
    title: 'March 9, 2026',
    text: (
      <>
        <Link
          href="https://docs.icgc-argo.org/docs/release-notes/data-releases"
          rel="noopener noreferrer"
          target="_blank"
        >
          Data Release 14.0
        </Link>{' '}
        adds 1528 new donors and updates to 495 existing donors from these programs: CRUK Grand
        Challenge — Mutographs{' '}
        <Link
          href="https://www.icgc-argo.org/page/99/mutographs"
          rel="noopener noreferrer"
          target="_blank"
        >
          (MUTO-INTL)
        </Link>
        , BC Cancer Personalized OncoGenomics Program{' '}
        <Link
          href="https://www.icgc-argo.org/page/97/bc-pogp"
          rel="noopener noreferrer"
          target="_blank"
        >
          (POG-CA)
        </Link>
        , Multicenter Study to Profile and Monitor Cancer-related Genomic Alterations in Circulating
        Tumor DNA and Gut Microbiome in Advanced Solid Malignancies - SCRUM-Japan MONSTAR-SCREEN{' '}
        <Link
          href="https://www.icgc-argo.org/page/130/scrum-monstar"
          rel="noopener noreferrer"
          target="_blank"
        >
          (MONSTAR-JP)
        </Link>
        , Polyethnic-1000{' '}
        <Link
          href="https://www.icgc-argo.org/page/115/p-1000"
          rel="noopener noreferrer"
          target="_blank"
        >
          (P1000-US)
        </Link>
        , The Australian Pancreatic Genome Initiative{' '}
        <Link
          href="https://www.icgc-argo.org/page/145/apgi-au"
          rel="noopener noreferrer"
          target="_blank"
        >
          (APGI-AU)
        </Link>
        , Pancreatic Cancer Harmonized "Omics" analysis for Personalized Treatment{' '}
        <Link
          href="https://www.icgc-argo.org/page/96/paca-ca"
          rel="noopener noreferrer"
          target="_blank"
        >
          (PACA-CA)
        </Link>
        .
      </>
    ),
  },
  {
    title: 'December 4, 2025',
    text: (
      <>
        The Data Discovery page now includes a Download option. DACO-approved users can now download
        clinical data or molecular file manifests or both for all donors within their selected
        cohort.{' '}
        <Link
          href="https://docs.icgc-argo.org/docs/data-access/daco/applying"
          rel="noopener noreferrer"
          target="_blank"
        >
          DACO approval
        </Link>{' '}
        is required to access this feature.
      </>
    ),
  },
  {
    title: 'September 29, 2025',
    text: (
      <>
        A new Data Discovery section is available on the ARGO platform portal, which allows users to
        explore donor data in the ICGC-ARGO through interactive charts, using clinical and file
        filters.{' '}
        <Link
          href="https://docs.icgc-argo.org/docs/data-access/daco/applying"
          rel="noopener noreferrer"
          target="_blank"
        >
          DACO approval
        </Link>{' '}
        is required to access this feature.
      </>
    ),
  },
  {
    title: 'September 26, 2025',
    text: (
      <>
        <Link
          href="https://docs.icgc-argo.org/docs/release-notes/data-releases"
          rel="noopener noreferrer"
          target="_blank"
        >
          Data Release 13.0
        </Link>{' '}
        adds 366 new donors and 7825 molecular files and clinical data. This includes updates from
        BC Cancer Personalized OncoGenomics Program{' '}
        <Link
          href="https://www.icgc-argo.org/page/97/bc-pogp"
          rel="noopener noreferrer"
          target="_blank"
        >
          (POG-CA)
        </Link>
        , CRUK Grand Challenge - Mutographs{' '}
        <Link
          href="https://www.icgc-argo.org/page/99/mutographs"
          rel="noopener noreferrer"
          target="_blank"
        >
          (MUTO-INTL)
        </Link>
        , Polyethnic-1000{' '}
        <Link
          href="https://www.icgc-argo.org/page/115/p-1000"
          rel="noopener noreferrer"
          target="_blank"
        >
          (P1000-US)
        </Link>{' '}
        programs, and Multicenter Study to Profile and Monitor Cancer-related Genomic Alterations in
        Circulating Tumor DNA and Gut Microbiome in Advanced Solid Malignancies - SCRUM-Japan
        MONSTAR-SCREEN{' '}
        <Link
          href="https://www.icgc-argo.org/page/130/scrum-monstar"
          rel="noopener noreferrer"
          target="_blank"
        >
          (MONSTAR-JP)
        </Link>{' '}
        program.
      </>
    ),
  },
];

export default function LatestNews(): JSX.Element {
  return <NewsContainer newsItems={newsItems} />;
}
