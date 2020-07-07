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

import React from 'react';
import { storiesOf } from '@storybook/react';

import { select, boolean, text } from '@storybook/addon-knobs';

import InteractiveIcon from '.';
import icons, { UikitIconNames } from '../icons';
import defaultTheme from 'uikit/theme/defaultTheme';
import { css } from '@emotion/core';

const InteractiveIconStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = {
    text: text('value', 'confused?'),
    fill: select('fill', [null, '#00f', ...Object.keys(defaultTheme.colors)], null),
    name: select('name', Object.keys(icons) as UikitIconNames[], 'question'),
    disabled: boolean('disabled', false),
    position: select('position', ['top', 'bottom', 'left', 'right'], 'bottom'),
  };
  return (
    <div
      css={css`
        margin-top: 20px;
        display: flex;
        justify-content: center;
      `}
    >
      <InteractiveIcon html={<span>{knobs.text}</span>} {...knobs}></InteractiveIcon>
    </div>
  );
});

export default InteractiveIconStories;
