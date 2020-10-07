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

import * as React from 'react';
import { css } from 'uikit';
import { ContentBox } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { UikitIconNames } from 'uikit/Icon/icons';
import Tag from 'uikit/Tag';

export const Box = ({
  children,
  title,
  iconName,
  tag,
}: {
  children: React.ReactNode | React.ReactNodeArray;
  title: string;
  iconName: UikitIconNames;
  tag?: string;
}) => (
  <ContentBox
    css={css`
      width: 100%;
      box-sizing: border-box;
      padding: 24px;
      min-height: 150px;
      height: 100%;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      `}
    >
      <Typography
        variant="subtitle"
        color="primary"
        component="span"
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon
          name={iconName}
          color="primary"
          height="20px"
          width="20px"
          css={css`
            margin-right: 5px;
          `}
        />
        {title}
      </Typography>
      {tag && (
        <Tag
          css={css`
            line-height: normal;
          `}
        >
          {tag}
        </Tag>
      )}
    </div>
    <Typography variant="default">{children}</Typography>
  </ContentBox>
);
