import React from 'react';
import Modal from 'uikit/Modal';
import { css, styled } from 'uikit';
import Icon from 'uikit/Icon';

const Row = styled('span')`
  display: flex;
  justify-content: center;
  border-top: ${({ theme }) => `solid 1px  ${theme.colors.grey_2}`};

  &:first-of-type {
    border: none;
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: 14px;
`;

const MemberDescription = styled('div')`
  flex: 1;
  padding: 9px 0;
`;

const ProgramServicesModal = ({ dismissModal }: { dismissModal: () => any | void }) => {
  return (
    <Modal
      title="For Program Members"
      actionButtonText="LOGIN WITH GOOGLE"
      buttonSize="sm"
      cancelText="Cancel"
      onActionClick={null}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      <div style={{ maxWidth: '770px' }}>
        <div
          css={css`
            margin-bottom: 13px;
          `}
        >
          Program Members can log in to the ARGO Data Platform to manage their program or submit
          clinical data. Program Administrators invite members to join the program as one of the
          following user roles:
        </div>
        <div>
          <Row>
            <StyledIcon name="person_admin" />
            <MemberDescription>
              <b>Program Administrators</b> can manage program members, view the program dashboard,
              submit data and download data before it’s publicly released.
            </MemberDescription>
          </Row>
          <Row>
            <StyledIcon name="person_submitter" />
            <MemberDescription>
              <b>Data Submitters</b> can view the program dashboard, submit data and download data
              before it’s publicly released.
            </MemberDescription>
          </Row>
          <Row>
            <StyledIcon name="person_collaborator" />
            <MemberDescription>
              <b>Program Collaborators</b> can view the program dashboard and download data before
              it’s publicly released.
            </MemberDescription>
          </Row>
        </div>
        <div
          css={css`
            margin-top: 18px;
          `}
        >
          <b>Note:</b> For all user roles, downloading controlled data requires{' '}
          <a href="">DACO approval.</a>
        </div>
      </div>
    </Modal>
  );
};

export default ProgramServicesModal;
