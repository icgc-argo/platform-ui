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
import { radios, select, boolean, number } from '@storybook/addon-knobs';

import readme from './readme.md';
import Tooltip from '.';
import Icon from '../Icon';

const TooltipStories = storiesOf(`${__dirname}`, module).add(
  'Basic',
  () => {
    const knobs = {
      disabled: boolean('disabled', false),
      open: boolean('open', undefined),
      useContext: boolean('useContext', undefined),
      position: select('position', ['top', 'bottom', 'left', 'right'], 'bottom'),
      trigger: select('trigger', ['mouseenter', 'focus', 'click', 'manual'], undefined),
      tabIndex: number('tabIndex', undefined),
      interactive: boolean('interactive', undefined),
      interactiveBorder: number('interactiveBorder', undefined),
      delay: number('delay', undefined),
      hideDelay: number('hideDelay', undefined),
      animation: select('animation', ['shift', 'perspective', 'fade', 'scale', 'none'], undefined),
      animateFill: boolean('animateFill', undefined),
      duration: number('duration', undefined),
      distance: number('distance', undefined),
      offset: number('offset', undefined),
      // @ts-ignore tricky typing by libraries
      hideOnClick: select('hideOnClick', [true, false, 'persistent'], undefined) as any,
      multiple: boolean('multiple', undefined),
      followCursor: boolean('followCursor', undefined),
      inertia: boolean('inertia', undefined),
      transitionFlip: boolean('transitionFlip', undefined),
      unmountHTMLWhenHide: boolean('unmountHTMLWhenHide', undefined),
      sticky: boolean('sticky', undefined),
      stickyDuration: boolean('stickyDuration', undefined),
      touchHold: boolean('touchHold', undefined),
    };
    return (
      <div style={{ width: 200 }}>
        <div>Hover me!!!</div>
        <Tooltip
          html={<span>Doge~~~!!!!</span>}
          onRequestClose={action('onRequestClose')}
          beforeShown={action('beforeShown')}
          shown={action('shown')}
          beforeHidden={action('beforeHidden')}
          hidden={action('hidden')}
          {...knobs}
        >
          <img
            style={{ width: 50, borderRadius: 100 }}
            src="https://i.pinimg.com/originals/fa/0c/05/fa0c05778206cb2b2dddf89267b7a31c.jpg"
          />
        </Tooltip>
      </div>
    );
  },
  {
    info: {
      text: `${readme}`,
    },
  },
);

export default TooltipStories;
