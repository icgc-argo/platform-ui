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

import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import Pipe from '.';
import { text, select } from '@storybook/addon-knobs';

import defaultTheme from '../theme/defaultTheme';
const themeColors = Object.keys(defaultTheme.colors) as Array<keyof typeof defaultTheme.colors>;

const PipeStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const colourKnobs = [
    select('Fill Colour: First', themeColors, 'accent1_dimmed', null),
    select('Fill Colour: Second', themeColors, 'warning_dark', null),
    select('Fill Colour: Third', themeColors, 'error', null),
  ];
  const childrenKnobs = [
    text('Text: First', '2'),
    text('Text: Second', '4'),
    text('Text: Third', '5'),
  ];

  return (
    <div
      css={css`
        margin: auto;
        width: 50%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: stretch;
      `}
    >
      <Pipe>
        <Pipe.Item fill={colourKnobs[0]}>{childrenKnobs[0]}</Pipe.Item>
        <Pipe.Item fill={colourKnobs[1]}>{childrenKnobs[1]}</Pipe.Item>
        <Pipe.Item fill={colourKnobs[2]}>{childrenKnobs[2]}</Pipe.Item>
      </Pipe>
      <Pipe>
        <Pipe.Item fill={'accent3_dark'}>Just One Child</Pipe.Item>
      </Pipe>
      <Pipe>
        <Pipe.Item fill={'accent2'}>Or Many</Pipe.Item>
        <Pipe.Item fill={'secondary_dark'}>2</Pipe.Item>
        <Pipe.Item fill={'accent4_dark'}>1</Pipe.Item>
        <Pipe.Item fill={'accent2'}>9</Pipe.Item>
        <Pipe.Item fill={'secondary_dark'}>4</Pipe.Item>
        <Pipe.Item fill={'accent4_dark'}>8</Pipe.Item>
      </Pipe>
    </div>
  );
});

export default PipeStories;
