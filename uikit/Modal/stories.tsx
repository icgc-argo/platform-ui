import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';

import Modal from '.';
import { ICON_NAMES, BUILT_IN_ICON_COLORS } from '../Icon';
import { BUTTON_SIZES } from '../Button';

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
        name: select('titleIconConfig.name', [null, ...Object.values(ICON_NAMES)], null),
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
          Setting a fixed width of the children will make the modal shrink down to fit
        </div>
      </Modal>
    </Modal.Overlay>
  ));

export default ModalStories;
