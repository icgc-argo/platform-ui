import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import Color from 'color';

import { styled, css } from '..';
import Typography from '../Typography';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS, ButtonSize } from '../Button';
import Icon, { ICON_NAMES } from '../Icon';
import FocusWrapper from '../FocusWrapper';
import Portal from '../Portal';
import { UikitIconNames } from 'uikit/Icon/icons';

const ModalContainer = styled('div')`
  position: relative;
  overflow: auto;
  border-radius: 20px;
  box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 776px;
  padding: 24px;
  padding-bottom: 0px;
`;
console.log('modal', ModalContainer, typeof ModalContainer);
const ModalTitle = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ModalBody = styled('div')`
  margin-top: 24px;
`;
const ModalFooter = styled('div')`
  margin-top: 24px;
  padding: 8px 0px;
  border-top: solid 1px ${({ theme }) => theme.colors.grey_2};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
`;
const ModalOverlay = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) =>
    Color(theme.colors.primary_dark)
      .alpha(0.8)
      .hsl()
      .string()};
`;

/**
 * Can use <Modal.overlay /> for the overlay
 */
const ModalComponent: React.ComponentType<{
  title?: React.ReactNode;
  titleIconConfig?: {
    name: UikitIconNames;
    fill?: string;
  };
  buttonSize?: ButtonSize;
  actionButtonText?: React.ReactNode;
  actionButtonId?: string;
  actionDisabled?: boolean;
  actionVisible?: boolean;
  cancelText?: React.ReactNode;
  onActionClick?: React.ComponentProps<typeof Button>['onClick'];
  onCancelClick?: React.ComponentProps<typeof Button>['onClick'];
  onCloseClick?: React.ComponentProps<typeof FocusWrapper>['onClick'];
  ContainerEl?: React.ReactType;
}> = ({
  title = 'Add Users',
  titleIconConfig = {
    name: null,
    fill: null,
  },
  buttonSize = BUTTON_SIZES.MD,
  actionButtonId,
  actionButtonText = 'Apply',
  actionVisible = true,
  cancelText = 'Cancel',
  onActionClick = () => {},
  onCancelClick = () => {},
  onCloseClick = () => {},
  actionDisabled = false,
  children,
  ContainerEl,
}) => {
  const Container = ContainerEl ? ContainerEl : ModalContainer;

  return (
    <Container>
      <FocusWrapper
        onClick={onCloseClick}
        css={css`
          position: absolute;
          top: 16px;
          right: 16px;
          line-height: 0px;
        `}
      >
        <Icon name="times" fill="primary_1" width="13px" height="13px" />
      </FocusWrapper>
      <div
        css={css`
          display: flex;
        `}
      >
        {titleIconConfig.name && (
          <div
            css={css`
              flex: 1;
              padding-right: 10px;
              padding-top: 3px;
            `}
          >
            <Icon
              name={titleIconConfig.name}
              width="20px"
              height="20px"
              fill={titleIconConfig.fill}
            />
          </div>
        )}
        <div
          css={css`
            width: 100%;
          `}
        >
          <ModalTitle>
            <Typography
              css={css`
                margin: 0px;
              `}
              variant="subtitle"
            >
              {title}
            </Typography>
          </ModalTitle>
          <ModalBody>
            <Typography variant="paragraph" component="div">
              {children}
            </Typography>
          </ModalBody>
        </div>
      </div>
      <ModalFooter>
        <ButtonContainer>
          {actionVisible && (
            <Button
              id={actionButtonId}
              size={buttonSize || BUTTON_SIZES.MD}
              disabled={actionDisabled}
              onClick={onActionClick}
            >
              {actionButtonText}
            </Button>
          )}
          <Button
            variant={BUTTON_VARIANTS.TEXT}
            css={css`
              margin-left: 10px;
            `}
            size={buttonSize || BUTTON_SIZES.MD}
            onClick={onCancelClick}
          >
            {cancelText}
          </Button>
        </ButtonContainer>
      </ModalFooter>
    </Container>
  );
};

const Overlay = props => <ModalOverlay {...props} />;
const Modal: typeof ModalComponent & { Overlay: typeof Overlay } = (() => {
  const output = ModalComponent as any;
  output.Overlay = Overlay;
  return output;
})();

export default Modal;
