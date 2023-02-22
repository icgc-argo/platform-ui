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

const ProgramSummaryLinkContainer = () => {
  return (
    <div
      css={css`
        width: 30%;
        margin: 14px 0px 4px 35px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      `}
    >
      <ProgramSummaryLink
        circleFill={'secondary_3'}
        iconName={'testtube'}
        iconFill={'secondary'}
        totalNum={1039}
        subtitle={'Total Registered Donors'}
      />

      <ProgramSummaryLink
        circleFill={'accent2_3'}
        iconName={'workflow'}
        iconFill={'accent2_dark'}
        totalNum={1039}
        subtitle={'Donors with Clinical Data'}
      />

      <ProgramSummaryLink
        circleFill={'accent4_3'}
        iconName={'download'}
        iconFill={'accent4_dark'}
        totalNum={1039}
        subtitle={'Total Files'}
      />
    </div>
  );
};

export default ProgramSummaryLinkContainer;
