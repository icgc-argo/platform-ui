import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';

import { styled, css } from '..';
import Typography from '../Typography';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from '../Button';
import Icon, { ICON_NAMES } from '../Icon';
import FocusWrapper from '../FocusWrapper';

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
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
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
const Modal = ({
  title = 'Add Users',
  titleIconConfig = {
    name: null,
    fill: null,
  },
  buttonSize = BUTTON_SIZES.MD,
  actionButtonText = 'Apply',
  cancelText = 'Cancel',
  onActionClick = () => {},
  onCancelClick = () => {},
  onCloseClick = () => {},
  actionDisabled = false,
  children,
}) => (
  <ModalContainer>
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
      <div>
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
        <Button
          size={buttonSize || BUTTON_SIZES.MD}
          disabled={actionDisabled}
          onClick={onActionClick}
        >
          {actionButtonText}
        </Button>
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
  </ModalContainer>
);

Modal.Overlay = function Overlay(props) {
  return <ModalOverlay {...props} />;
};

Modal.propTypes = {
  title: PropTypes.node,
  titleIconConfig: PropTypes.shape({
    name: PropTypes.oneOf(Object.values(ICON_NAMES)).isRequired,
    fill: PropTypes.string,
  }),
  buttonSize: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  actionButtonText: PropTypes.node,
  actionDisabled: PropTypes.bool,
  cancelText: PropTypes.node,
  onActionClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
