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
import DropdownButton from '.';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { createKnobs as createButtonKnobs } from 'uikit/Button/stories';
import Button from 'uikit/Button';

const DropdownButtonStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = createButtonKnobs();
  const menuShown = boolean('menuShown', false);
  return (
    <DropdownButton
      onItemClick={action('onItemClick')}
      menuItems={[
        { display: <strong>Some Text</strong>, value: '1' },
        { display: 'Some Text', value: '2' },
        { display: <Button size="sm">Some Text</Button>, value: '4' },
      ]}
      menuShown={menuShown}
      {...knobs}
    >
      Click me!
    </DropdownButton>
  );
});

export default DropdownButtonStories;
