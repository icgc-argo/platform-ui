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
import React, { useState } from 'react';
import { boolean, button } from '@storybook/addon-knobs';
import FormRadio from '.';
import { action } from '@storybook/addon-actions';
import Hook from '../../utils/Hook';
import Checkbox from '../FormCheckbox';
import RadioCheckboxGroup from '../RadioCheckboxGroup';

const createKnobs = () => {
  const checked = boolean('checked', false);
  const disabled = boolean('disabled', false);

  return {
    checked,
    disabled,
  };
};

const createGroupKnobs = () => {
  const hasError = boolean('hasError', false);
  return { hasError };
};

const RadioStories = storiesOf(`${__dirname}`, module)
  .add('Radio', () => <FormRadio {...createKnobs()}>Single Radio Button</FormRadio>)
  .add('Radio Group', () => {
    const [selectedItem, setSelected] = React.useState('one');
    const onChange = (value) => {
      action('radio button clicked')(value);
      setSelected(value);
    };
    const isChecked = (item) => item === selectedItem;

    return (
      <RadioCheckboxGroup {...createGroupKnobs()} onChange={onChange} isChecked={isChecked}>
        <FormRadio value="one">One</FormRadio>
        <FormRadio value="two">Two</FormRadio>
        <FormRadio value="three">Three</FormRadio>
        <div>
          <FormRadio value="four">Four</FormRadio>
        </div>
        <FormRadio value="five">Five</FormRadio>
        <div>
          <FormRadio value="six">Six</FormRadio>
        </div>
      </RadioCheckboxGroup>
    );
  })
  .add('Disabled Radio Group', () => {
    const [selectedItem, setSelected] = React.useState('one');
    const onChange = (value) => {
      action('radio button clicked')(value);
      setSelected(value);
    };
    const isChecked = (item) => item === selectedItem;

    return (
      <RadioCheckboxGroup
        {...createGroupKnobs()}
        onChange={onChange}
        isChecked={isChecked}
        disabled
      >
        <FormRadio value="one">One</FormRadio>
        <FormRadio value="two">Two</FormRadio>
        <FormRadio value="three">Three</FormRadio>
      </RadioCheckboxGroup>
    );
  });

export default RadioStories;
