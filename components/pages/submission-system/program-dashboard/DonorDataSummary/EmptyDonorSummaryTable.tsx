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

import Typography from 'uikit/Typography';
import Link from 'uikit/Link';
import styled from '@emotion/styled';
import NoData from 'uikit/NoData';
import urljoin from 'url-join';
import PicBeakers from 'static/register.svg';
import PicHeart from 'static/clinical.svg';
import PicDna from 'static/dna.svg';
import { css } from '@emotion/core';
import { getConfig } from 'global/config';
import { DOCS_SUBMITTED_DATA_PATH } from 'global/constants/docSitePaths';

const { DOCS_URL_ROOT } = getConfig();

export default () => {
  const getStartedLink = (
    <Typography variant="data" component="span">
      <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_SUBMITTED_DATA_PATH)}>
        Get started with data submission »
      </Link>
    </Typography>
  );

  const NoDataIcon = styled('img')`
    padding: 0px 16px;
    max-width: 100vw;
  `;
  return (
    <NoData title="You do not have any donor data submitted." link={getStartedLink}>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          max-height: 100%;
        `}
      >
        <NoDataIcon alt="no data found" src={PicBeakers} />
        <NoDataIcon alt="no data found" src={PicHeart} />
        <NoDataIcon alt="no data found" src={PicDna} />
      </div>
    </NoData>
  );
};
