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
import defaultTheme from '../theme/defaultTheme';
import { select, number } from '@storybook/addon-knobs';

import TitleBorder from '.';
import Typography from '../Typography';

const themeColors = Object.keys(defaultTheme.colors) as Array<keyof typeof defaultTheme.colors>;

const TitleBorderStories = storiesOf(`${__dirname}`, module)
  .add('Full width', () => {
    const knobs = {
      color: select('color', themeColors, 'primary', null),
    };
    return (
      <div>
        <TitleBorder {...knobs} />
        <Typography variant="subtitle">Title</Typography>
      </div>
    );
  })
  .add('Fixed width', () => {
    const knobs = {
      color: select('color', themeColors, 'primary', null),
      width: String(number('Width', 45)),
    };
    return (
      <>
        <Typography variant="subtitle">A longer title, but shorter border</Typography>
        <TitleBorder {...knobs} />
      </>
    );
  });

export default TitleBorderStories;
