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

import Typography from '../../../uikit/Typography';
import Container from '../../../uikit/Container';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FileAccessState } from './types';
import Icon from 'uikit/Icon';

export const FileCard: React.ComponentType<{
  cardTitle?: string;
  cardHeight?: string;
  loading?: boolean;
}> = ({ cardTitle, children, cardHeight = '100%', loading = false }) => (
  <Container
    loading={loading}
    css={css`
      height: ${cardHeight};
    `}
  >
    <div
      css={css`
        padding: 16px;
      `}
    >
      <Typography
        color="primary"
        variant="default"
        component="span"
        css={css`
          padding-bottom: 10px;
        `}
      >
        {cardTitle}
      </Typography>
      {children}
    </div>
  </Container>
);

export const TableDiv = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

export const getAccessIcon = (state: string) =>
  ({
    [FileAccessState.CONTROLLED]: (
      <Icon
        width="18px"
        height="16px"
        fill="primary_2"
        name="lock"
        css={css`
          margin-right: 2px;
        `}
      />
    ),
    [FileAccessState.OPEN]: (
      // TODO: move icon to uikit once it is separated https://github.com/icgc-argo/platform-ui/issues/2136
      <svg
        height="16"
        viewBox="0 0 14 21"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
        css={css`
          margin-right: 2px;
        `}
      >
        <path
          d="m3.99032061 8.05561848h7.97709919c.5984733 0 2.0325802.2269104 1.9974555 2.00184182v8.0184177c0 .5009209-.1280108 1.8161584-1.9974555 2.0018417h-9.9694656c-.49872774 0-2.15755636-.5075054-1.99745547-2.0018417v-8.0184177c-.15954967-1.95860758 1.88646804-2.00184182 2.38519577-2.00184182v-2.80515696c-.14495658-2.98592705 1.50388311-4.90902469 4.09826479-5.20957722 2.99236641-.30055253 5.15321911 1.7976801 5.15321911 5.00920886 0 .6011051-.3149567 1.01275684-.8136844 1.01275684-.4987278 0-.8182166-.41321836-.84844056-1.01275684-.14120926-2.80110024-1.50943921-3.55666469-3.38399089-3.43916002-1.49618321.2704839-2.79657937 1.76145475-2.60074194 3.5393442zm3.9309071 8.14145572v-2.2383891c.43098374-.2935282.71429217-.7865292.71429217-1.3454953 0-.8992062-.73267236-1.6289235-1.63520303-1.6289235-.90316446 0-1.63520303.7290861-1.63520303 1.6289235 0 .5592817.28330843 1.0522828.71429218 1.3454953v2.2383891c0 .5062572.41228665.916881.92091085.916881.5089411 0 .92091086-.4106238.92091086-.916881z"
          fill="#a1a4b1"
          fill-rule="evenodd"
        />
      </svg>
    ),
  }[state]);

export const DownloadIcon = () => (
  <Icon
    css={css`
      padding-right: 4px;
    `}
    fill="white"
    name="download"
    height="12px"
  />
);
