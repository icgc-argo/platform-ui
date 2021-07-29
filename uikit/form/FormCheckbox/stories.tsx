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
import React, { useCallback, useState } from 'react';
import FormCheckbox from '.';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import RadioCheckboxGroup from '../RadioCheckboxGroup';

const createKnobs = () => {
  const [checked, setChecked] = useState(false);
  const disabled = boolean('disabled', false);
  const error = boolean('error', false);
  const required = boolean('required', false);
  const value = 'myCheckbox';

  return {
    checked,
    disabled,
    error,
    onBlur: () => {
      if (disabled) {
        action('checkbox blurred while disabled')(value, checked);
      } else {
        action('checkbox blurred, is it checked')(value, checked);
      }
    },
    onChange: () => {
      if (disabled) {
        action('checkbox clicked while disabled')(value, checked);
      } else {
        action('checkbox clicked, is it checked')(value, !checked);
        setChecked(!checked);
      }
    },
    onFocus: () => {
      if (disabled) {
        action('checkbox focused while disabled')(value, checked);
      } else {
        action('checkbox focused, is it checked')(value, checked);
      }
    },
    required,
    value,
  };
};

const createGroupKnobs = () => {
  const hasError = boolean('hasError', false);
  return { hasError };
};

const CheckboxStories = storiesOf(`${__dirname}`, module)
  .add('Default', () => (
    <FormCheckbox {...createKnobs()} aria-label="Item">
      Item
    </FormCheckbox>
  ))
  .add('Checkbox Group', () => {
    const [selectedItems, setSelected] = useState(new Set([]));
    const isChecked = useCallback((item) => selectedItems.has(item), [selectedItems]);
    const onChange = (event) => {
      const value = event.target.defaultValue;

      selectedItems.has(value) ? selectedItems.delete(value) : selectedItems.add(value);
      const newSelectedItems = new Set(selectedItems);

      action('checkbox clicked')(value, Array.from(newSelectedItems));
      setSelected(newSelectedItems);
    };
    return (
      <RadioCheckboxGroup
        {...createGroupKnobs()}
        onChange={onChange}
        isChecked={isChecked}
        disabled
      >
        <FormCheckbox aria-label="Sausage" value="sausage">
          Sausage
        </FormCheckbox>
        <FormCheckbox aria-label="Rashers" value="rashers">
          Rashers
        </FormCheckbox>
        <FormCheckbox aria-label="Black Pudding" value="black_pudding">
          Black Pudding
        </FormCheckbox>
        <div>
          <FormCheckbox aria-label="Grilled Tomato" value="grilled_tomato">
            Grilled Tomato
          </FormCheckbox>
          <FormCheckbox aria-label="Tayto Crisps" value="tayto_crisps">
            Tayto Crisps
          </FormCheckbox>
          <FormCheckbox aria-label="3-in-1" value="three_in_one">
            3-in-1
          </FormCheckbox>
        </div>
      </RadioCheckboxGroup>
    );
  });

export default CheckboxStories;
