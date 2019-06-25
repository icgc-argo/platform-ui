import React from 'react';
import PropTypes from 'prop-types';

import { styled, css } from '..';
import Typography from '../Typography';
import Button from '../Button';
import Icon from '../Icon';
import FocusWrapper from '../FocusWrapper';

const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const ModalContainer = styled('div')`
  position: relative;
  overflow: auto;
  border-radius: 20px;
  box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 776px;
`;
const ModalTitle = styled('div')`
  margin: 24px;
`;
const ModalBody = styled('div')`
  margin: 24px;
  margin-top: 0px;
`;
const ModalFooter = styled('div')`
  margin: 24px;
  margin-bottom: 0px;
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
  background: ${({ theme }) => {
    const { r, g, b } = hexToRgb(theme.colors.primary_dark);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }};
`;

/**
 * Can use <Modal.overlay /> for the overlay
 */
const Modal = ({
  title = 'Add Users',
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
    <ModalFooter>
      <ButtonContainer>
        <Button disabled={actionDisabled} onClick={onActionClick}>
          {actionButtonText}
        </Button>
        <Button
          css={css`
            border: none;
          `}
          variant="secondary"
          size="sm"
          onClick={onCancelClick}
        >
          {cancelText}
        </Button>
      </ButtonContainer>
    </ModalFooter>
  </ModalContainer>
);
Modal.Overlay = props => <ModalOverlay {...props} />;

Modal.propTypes = {
  title: PropTypes.node,
  actionButtonText: PropTypes.node,
  actionDisabled: PropTypes.bool,
  cancelText: PropTypes.node,
  onActionClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
