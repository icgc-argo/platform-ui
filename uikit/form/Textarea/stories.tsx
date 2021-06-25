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
import { boolean, number, radios, text } from '@storybook/addon-knobs';

import Textarea from '.';

export default storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    const labelForCounterKnobs = 'Counter props';
    const labelForTextAreaKnobs = 'Basic props';
    const [value, setValue] = React.useState('');
    const disabled = boolean('disabled', false, labelForTextAreaKnobs);

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

    return (
      <Textarea
        aria-label="demo-input"
        countDirection={radios(
          'count direction',
          { Ascending: 'asc', Descending: 'desc' },
          'asc',
          labelForCounterKnobs,
        )}
        countLimit={number(
          'count limit',
          0,
          { max: Infinity, min: 0, range: true, step: 1 },
          labelForCounterKnobs,
        )}
        countPosition={radios(
          'count position',
          { Left: 'left', Right: 'right' },
          'right',
          labelForCounterKnobs,
        )}
        countType={radios(
          'count type',
          { Characters: 'chars', Words: 'words' },
          'chars',
          labelForCounterKnobs,
        )}
        disabled={disabled}
        error={boolean('error', false, labelForTextAreaKnobs)}
        focused={boolean('focused', false, labelForTextAreaKnobs)}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={text('placeholder', '', labelForTextAreaKnobs)}
        truncate={boolean('truncate', false, labelForCounterKnobs)}
        rows={number('rows', 3, { min: 1, step: 1 }, labelForTextAreaKnobs)}
      />
    );
  },
  {},
);
