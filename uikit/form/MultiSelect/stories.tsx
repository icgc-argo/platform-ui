/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
import MultiSelect, { Option } from '.';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { INPUT_SIZES } from '../common';

const MultiSelectStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const [value, setValue] = React.useState([]);
    return (
      <MultiSelect
        aria-label="multi-select"
        value={value}
        onChange={(event) => {
          action('value change')(event);
          setValue(event.target.value);
        }}
        onBlur={action('onBlur')}
        disabled={boolean('disabled', false)}
        error={boolean('error', false)}
        single={boolean('single', false)}
        allowNew={boolean('allowNew', false)}
        size={select('size', INPUT_SIZES, INPUT_SIZES.SM)}
      >
        <Option value="Afghanistan">Afghanistan</Option>
        <Option value="Albania">Albania</Option>
        <Option value="Algeria">Algeria</Option>
        <Option value="Andorra">Andorra</Option>
        <Option value="Angola">Angola</Option>
        <Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
        <Option value="Argentina">Argentina</Option>
        <Option value="Armenia">Armenia</Option>
        <Option value="Austria">Austria</Option>
        <Option value="Australia">Australia</Option>
        <Option value="Azerbaijan">Azerbaijan</Option>
        <Option value="Bahamas">Bahamas</Option>
        <Option value="Bahrain">Bahrain</Option>
        <Option value="Bangladesh">Bangladesh</Option>
        <Option value="Barbados">Barbados</Option>
        <Option value="Belarus">Belarus</Option>
        <Option value="Cambodia">Cambodia</Option>
        <Option value="Cameroon">Cameroon</Option>
        <Option value="Canada">Canada</Option>
      </MultiSelect>
    );
  })
  .add('Long option', () => {
    const [value, setValue] = React.useState([]);
    return (
      <MultiSelect
        aria-label="multi-select"
        value={value}
        onChange={(event) => {
          action('value change')();
          setValue(event.target.value);
        }}
        onBlur={action('onBlur')}
        allowNew
      >
        <Option value="Afghanistan">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Option>
        <Option value="Bfghanistan">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Option>
        <Option value="Cfghanistan">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Option>
      </MultiSelect>
    );
  });

export default MultiSelectStories;
