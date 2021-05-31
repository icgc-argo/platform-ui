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
  const [value, setValue] = React.useState('');
  const disabled = boolean('disabled', false);
  const error = boolean('error', false);
  const onBlur = () => {
    if (disabled) {
      action('blurred while disabled')(value);
    } else {
      action('blurred')(value);
    }
  };
  const onChange = (e) => {
    const eventValue = e.target.value;
    if (disabled) {
      action('clicked while disabled')(eventValue);
    } else {
      action('clicked')(eventValue);
      setValue(eventValue);
    }
  };
  const onFocus = () => {
    if (disabled) {
      action('focused while disabled')(value);
    } else {
      action('focused')(value);
    }
  };
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
    disabled,
    error,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    showClear,
    size,
    value,
  };
};

const InputStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    return (
      <div style={{ width: '200px' }}>
        <Input aria-label="demo-input" {...createKnobs()} />
      </div>
    );
  })
  .add('With preset', () => {
    const preset = select('preset', [null, ...Object.values(INPUT_PRESETS)], null);
    return (
      <div style={{ width: '200px' }}>
        <Input aria-label="demo-input" preset={preset} {...createKnobs()} />
      </div>
    );
  })
  .add('With icon', () => {
    return (
      <div style={{ width: '200px' }}>
        <Input aria-label="demo-input" icon={<Icon name="search" />} {...createKnobs()} />
      </div>
    );
  });

export default InputStories;
