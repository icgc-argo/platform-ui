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

import ToastStack from '.';
import { NOTIFICATION_VARIANTS } from '../Notification';

const ToastStackStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const [stack, setStack] = React.useState([
    {
      id: String(Math.random()),
      variant: NOTIFICATION_VARIANTS.SUCCESS,
      title: 'Hipster Ipsum',
      content:
        'Tilde gentrify single-origin coffee lo-fi roof party twee. Chillwave stumptown street art four dollar toast literally cred artisan',
    },
    {
      id: String(Math.random()),
      variant: NOTIFICATION_VARIANTS.WARNING,
      title: 'Hipster Ipsum',
      content: 'Cold-pressed beard narwhal ennui',
    },
    {
      id: String(Math.random()),
      variant: NOTIFICATION_VARIANTS.ERROR,
      title: 'Hipster Ipsum',
      content:
        'Thundercats la croix microdosing shoreditch, green juice VHS YOLO taxidermy adaptogen literally',
    },
  ]);

  const onInteraction = data => {
    const { id } = data;
    setStack(stack.filter(({ id: _id }) => id !== _id));
    action('onInteraction')(data);
  };
  return (
    <ToastStack
      onInteraction={onInteraction}
      toastConfigs={[
        {
          id: String(Math.random()),
          variant: NOTIFICATION_VARIANTS.SUCCESS,
          title: 'Hipster Ipsum',
          content:
            'Tilde gentrify single-origin coffee lo-fi roof party twee. Chillwave stumptown street art four dollar toast literally cred artisan',
        },
        {
          id: String(Math.random()),
          variant: NOTIFICATION_VARIANTS.WARNING,
          title: 'Hipster Ipsum',
          content: 'Cold-pressed beard narwhal ennui',
        },
        {
          id: String(Math.random()),
          variant: NOTIFICATION_VARIANTS.ERROR,
          title: 'Hipster Ipsum',
          content:
            'Thundercats la croix microdosing shoreditch, green juice VHS YOLO taxidermy adaptogen literally',
        },
      ]}
    />
  );
});

export default ToastStackStories;
