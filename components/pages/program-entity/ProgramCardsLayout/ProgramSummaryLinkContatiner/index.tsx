/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { css } from '@icgc-argo/uikit';

import ProgramSummaryLink from './ProgramSummaryLink';
import PROGRAM_SUMMARY_LINK_QUERY from '../../gql/PROGRAM_SUMMARY_LINK_QUERY';
import { useQuery } from '@apollo/client';

const ProgramSummaryLinkContainer = ({ programId }: { programId: string }) => {
  const { data: { file = null } = {}, loading } = useQuery(PROGRAM_SUMMARY_LINK_QUERY, {
    variables: {
      SQON: {
        content: [{ content: { field: 'study_id', value: programId }, op: 'in' }],
        op: 'and',
      },
    },
  });

  return (
    <div
      css={css`
        width: 30%;
        margin: 35px 0px 29px 35px;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      `}
    >
      <ProgramSummaryLink
        circleFill={'secondary_3'}
        iconName={'testtube'}
        iconFill={'secondary'}
        totalNum={loading ? 'loading' : file?.aggregations.donors__donor_id.bucket_count}
        subtitle={'Total Donors'}
      />

      <ProgramSummaryLink
        circleFill={'accent4_3'}
        iconName={'download'}
        iconFill={'accent4_dark'}
        totalNum={loading ? 'loading' : file?.aggregations.file_id.bucket_count}
        subtitle={'Total Files'}
      />
    </div>
  );
};

export default ProgramSummaryLinkContainer;
