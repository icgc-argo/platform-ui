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
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';

import Modal from '.';
import { ICON_NAMES, BUILT_IN_ICON_COLORS } from '../Icon';
import { BUTTON_SIZES } from '../Button';
import Icons from 'uikit/Icon/icons';

const ModalStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const createKnobs = () => {
      const title = text('title', 'Hipster');
      const children = text(
        'children',
        `Lorem ipsum dolor amet hoodie iPhone palo santo freegan bitters chicharrones fingerstache taiyaki authentic fam skateboard next level helvetica forage. Squid typewriter mustache, chia shoreditch retro gluten-free tbh bicycle rights kickstarter pickled pork belly post-ironic. Authentic green juice tofu kickstarter.`,
      );
      const actionButtonText = text('actionButtonText', 'Beer Me');
      const cancelText = text('cancelText', 'nevermind');
      const buttonSize = select('buttonSize', [null, ...Object.values(BUTTON_SIZES)], null);
      const actionDisabled = boolean('actionDisabled', false);
      const actionVisible = boolean('actionVisible', true);
      const titleIconConfig = {
        name: select(
          'titleIconConfig.name',
          [null, ...Object.keys(Icons)],
          null,
        ) as keyof typeof Icons,
        fill: select(
          'titleIconConfig.fill',
          [null, 'green', ...Object.values(Object.values(BUILT_IN_ICON_COLORS))],
          null,
        ),
      };
      return {
        title,
        children,
        actionButtonText,
        cancelText,
        buttonSize,
        actionDisabled,
        actionVisible,
        titleIconConfig,
      };
    };
    const props = createKnobs();
    return (
      <Modal.Overlay>
        <Modal
          {...props}
          onActionClick={action('onActionClick')}
          onCancelClick={action('onCancelClick')}
          onCloseClick={action('onCloseClick')}
        >
          <div>
            {props.children}
            <div style={{ margin: '20px' }}>
              BTW you can use <strong style={{ color: 'red' }}>Modal.Overlay</strong> for the
              overlay. Storybook doesn't show it in Story Source very well.
            </div>
          </div>
        </Modal>
      </Modal.Overlay>
    );
  })
  .add('Small configuation', () => (
    <Modal.Overlay>
      <Modal
        title="A small modal"
        titleIconConfig={{
          name: ICON_NAMES.warning,
          fill: BUILT_IN_ICON_COLORS.warning,
        }}
        buttonSize={BUTTON_SIZES.SM}
        actionButtonText="Leave this page"
        cancelText="Stay here"
        onActionClick={action('onActionClick')}
        onCancelClick={action('onCancelClick')}
        onCloseClick={action('onCloseClick')}
      >
        <div style={{ width: '300px' }}>
          Setting a fixed width of the children will make the modal shrink down to fit
        </div>
      </Modal>
    </Modal.Overlay>
  ))
  .add('Custom container', () => (
    <Modal.Overlay>
      <Modal
        title="A small modal"
        titleIconConfig={{
          name: ICON_NAMES.warning,
          fill: BUILT_IN_ICON_COLORS.warning,
        }}
        buttonSize={BUTTON_SIZES.SM}
        actionButtonText="Leave this page"
        cancelText="Stay here"
        onActionClick={action('onActionClick')}
        onCancelClick={action('onCancelClick')}
        onCloseClick={action('onCloseClick')}
        ContainerEl={({ children }) => (
          <div id="custom-div" style={{ backgroundColor: 'teal', borderRadius: '20px' }}>
            {children}
          </div>
        )}
      >
        <div style={{ width: '300px' }}>
          Passing a custom container is also an option
          <br />
          Here it's expanding to content size of children
        </div>
      </Modal>
    </Modal.Overlay>
  ));

export default ModalStories;
