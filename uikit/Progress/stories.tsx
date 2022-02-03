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

import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import Progress from '.';
import { ProgressItem, PROGRESS_STATUS } from '.';
import { text, select, boolean } from '@storybook/addon-knobs';

const ProgressItemStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const state = select('state', PROGRESS_STATUS, PROGRESS_STATUS.SUCCESS);
    const title = text('text', 'Upload');
    const completed = boolean('completed', false);

    return (
      <Progress>
        <ProgressItem text={title} state={state} completed={completed} />
      </Progress>
    );
  })
  .add('Progress Bar', () => {
    const knobs = (index = 0, state = PROGRESS_STATUS.SUCCESS, title = 'Success') => ({
      state: select(`${index} - state`, PROGRESS_STATUS, state),
      text: text(`${index} - text`, title),
      completed: boolean(`${index} - completed`, false),
    });

    return (
      <Progress>
        <ProgressItem {...knobs(0)} />
        <ProgressItem {...knobs(1, PROGRESS_STATUS.PENDING, 'Pending')} />
        <ProgressItem {...knobs(2, PROGRESS_STATUS.DISABLED, 'Disabled')} />
        <ProgressItem {...knobs(3, PROGRESS_STATUS.ERROR, 'Error')} />
      </Progress>
    );
  });

export default ProgressItemStories;
