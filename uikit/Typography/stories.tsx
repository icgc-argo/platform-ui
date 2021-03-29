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
import { radios, select, boolean } from '@storybook/addon-knobs';
import defaultTheme from '../theme/defaultTheme';

import Typography, { TypographyVariant } from '.';

const TypographyStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const knobs = {
      variant: radios(
        'variant',
        // @ts-ignore storybook type scary
        Object.keys(defaultTheme.typography) as Array<TypographyVariant>,
        'hero',
      ),
      component: select(
        'component',
        [null, 'h1', 'h2', 'h3', 'h4', 'h5', 'div', 'span', 'p'],
        null,
      ),
      bold: boolean('bold', false),
      color: select('color', [null, '#00f', ...Object.keys(defaultTheme.colors)], null),
    };
    return <Typography {...knobs}>Skeleton</Typography>;
  })
  .add('List', () => (
    <>
      {Object.entries(defaultTheme.typography).map(([key]) => (
        <div key={key}>
          <Typography variant={key as keyof typeof defaultTheme.typography}>{key}</Typography>
        </div>
      ))}
    </>
  ));

export default TypographyStories;
