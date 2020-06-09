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

import ErrorLayout from 'components/pages/error';
import React from 'react';
import { css } from 'uikit';
import A from 'uikit/Link';
import Typography from 'uikit/Typography';

export default function Error404Page() {
  const handleReloadClick = () => window.location.reload();
  return (
    <ErrorLayout>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 23px 15px 23px 47px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <Typography
            as="h1"
            css={css`
              font-size: 40px;
              margin: 0;
              margin-bottom: 12px;
            `}
          >
            Ooops!
          </Typography>
          <Typography
            css={css`
              margin-top: 0;
              margin-bottom: 34px;
            `}
            variant="subtitle"
            color="secondary"
            as="h2"
          >
            Something went wrong
          </Typography>
          <Typography
            variant="subtitle2"
            css={css`
              margin: 0;
            `}
            as="p"
          >
            We are working on fixing the problem and appreciate your patience.{' '}
            <A href="#" onClick={handleReloadClick}>
              Reload this page
            </A>
            .
          </Typography>
        </div>
        <div>
          <img alt="Bug in the code" src="/static/client-error.svg" />
        </div>
      </div>
    </ErrorLayout>
  );
}
