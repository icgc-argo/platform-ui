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
import { text, boolean, radios, select } from '@storybook/addon-knobs';

import Input, { INPUT_PRESETS } from '.';
import Icon from '../../Icon';
import { action } from '@storybook/addon-actions';

const createKnobs = () => {
  const disabled = boolean('disabled', false);
  const placeholder = text('Placeholder', 'Start typing here..');
  const showClear = boolean('showClear', false);
  const size = radios(
    'size',
    {
      sm: 'sm',
      lg: 'lg',
    },
    'sm',
  );
  return {
    showClear,
    disabled,
    placeholder,
    size,
  };
};

const InputStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const props = createKnobs();
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '200px' }}>
        <Input
          aria-label="demo-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => setValue(e.target.value)}
          {...props}
        />
      </div>
    );
  })
  .add('With preset', () => {
    const preset = select('preset', [null, ...Object.values(INPUT_PRESETS)], null);
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '200px' }}>
        <Input
          aria-label="demo-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => setValue(e.target.value)}
          preset={preset}
        />
      </div>
    );
  })
  .add('With icon', () => {
    const props = createKnobs();
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: '200px' }}>
        <Input
          aria-label="demo-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => setValue(e.target.value)}
          {...props}
          icon={<Icon name="search" />}
        />
      </div>
    );
  });

export default InputStories;
