import React from 'react';
import PropTypes from 'prop-types';

import { styled, css } from '..';
import Typography from '../Typography';
import Button from '../Button';

const ModalContainer = styled('div')`
  overflow: auto;
  border-radius: 20px;
  box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
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

const Modal = ({
  title = 'Add Users',
  actionButtonText = 'Apply',
  cancelText = 'Cancel',
  onActionClick = () => {},
  onCancelClick = () => {},
  children,
}) => (
  <ModalContainer>
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
        <Button onClick={onActionClick}>{actionButtonText}</Button>
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

Modal.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default Modal;
