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
import Notification, {
  NOTIFICATION_VARIANTS,
  NOTIFICATION_INTERACTION_EVENTS,
  NOTIFICATION_INTERACTION,
  NOTIFICATION_SIZES,
} from '.';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';

const NotificationStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const variant = select(
    'variant',
    [undefined, ...Object.values(NOTIFICATION_VARIANTS)],
    undefined,
  );
  const interactionType = select(
    'interactionType',
    [undefined, ...Object.values(NOTIFICATION_INTERACTION)],
    undefined,
  );
  const size = select('size', [undefined, ...Object.values(NOTIFICATION_SIZES)], undefined);
  const title = text('title', 'Hipster Ipsum');
  const content = text(
    'content',
    'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  );
  const actionText = text('actionText', undefined);
  const dismissText = text('dismissText', undefined);
  const noShadow = boolean('noShadow', false);
  return (
    <>
      <Notification
        variant={variant}
        interactionType={interactionType}
        size={size}
        actionText={actionText}
        dismissText={dismissText}
        title={title}
        content={content}
        noShadow={noShadow}
        onInteraction={action('RECEIVED EVENT')}
      />
      <Notification
        variant={variant}
        interactionType={interactionType}
        size={size}
        actionText={actionText}
        dismissText={dismissText}
        title={title}
        content={content}
        noShadow={noShadow}
        onInteraction={action('RECEIVED EVENT')}
        icon={null}
      />
    </>
  );
});

export default NotificationStories;
