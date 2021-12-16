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
import { action } from '@storybook/addon-actions';
import { text, boolean, radios } from '@storybook/addon-knobs';

import Select from '.';

const createKnobs = () => {
  const error = boolean('error', false);
  const disabled = boolean('disabled', false);
  const placeholder = text('Placeholder', '- Select an option -');
  const errorMessage = text('Error Message', 'Please fill out the required field.');
  const size = radios(
    'size',
    {
      sm: 'sm',
      lg: 'lg',
    },
    'sm',
  );
  const hintText = text('Hint Text', '');

  return {
    error,
    errorMessage,
    disabled,
    placeholder,
    size,
    hintText,
  };
};

const InputStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = createKnobs();
  const [value, setValue] = React.useState('');
  const [valueTwo, setValueTwo] = React.useState('');
  const onBlur = () => action('blur')();
  return (
    <div style={{ width: '200px' }}>
      <Select
        aria-label="demo-select"
        options={[
          { content: 'Value 1', value: 'v1' },
          { content: 'Value 2', value: 'v2' },
          { content: 'Value 3', value: 'v3' },
          { content: 'Value 4', value: 'v4' },
        ]}
        onChange={(val) => {
          setValue(val);
          action('onChange')();
        }}
        value={value}
        onBlur={onBlur}
        {...knobs}
      />
      <Select
        aria-label="demo-select"
        value={valueTwo}
        options={[
          { content: 'Value 1', value: 'v1' },
          { content: 'Value 2', value: 'v2' },
          { content: 'Value 3', value: 'v3' },
          { content: 'Value 4', value: 'v4' },
        ]}
        onChange={(val) => {
          setValueTwo(val);
          action('onChange')();
        }}
        onBlur={onBlur}
        {...knobs}
      />
    </div>
  );
});

export default InputStories;
