import React from 'react';
import Modal from 'uikit/Modal';
import { css, styled } from 'uikit';
import Icon from 'uikit/Icon';
import Link from 'uikit/Link';
import urljoin from 'url-join';
import { DOCS_DATA_ACCESS_PATH } from 'global/constants/docSitePaths';
import { getConfig } from 'global/config';
import useTheme from 'uikit/utils/useTheme';
import Banner from 'uikit/notifications/Banner';

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

const ProgramServicesModal = ({
  dismissModal,
  hasPrograms,
  isLoggedIn,
}: {
  dismissModal: () => any | void;
  hasPrograms: boolean;
  isLoggedIn: boolean;
}) => {
  const { DOCS_URL_ROOT, EGO_URL } = getConfig();
  const theme = useTheme();

  return (
    <Modal
      title="For Program Members"
      actionVisible={!isLoggedIn}
      actionButtonText={
        <a
          css={css`
            text-decoration: none;
            color: ${theme.colors.white};
          `}
          href={EGO_URL}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            {' '}
            <Icon
              width="18px"
              height="18px"
              name="google"
              fill="none"
              css={css`
                margin-right: 8px;
              `}
            />
            Login with Google
          </div>
        </a>
      }
      buttonSize="sm"
      cancelText="Cancel"
      onActionClick={null}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      <div
        css={css`
          max-width: 770px;
          margin-top: -18px;
        `}
      >
        {isLoggedIn && !hasPrograms && (
          <Banner
            variant="WARNING"
            title="You do not have access to any programs"
            css={css`
              margin-bottom: 16px;
            `}
          />
        )}
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
          <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_DATA_ACCESS_PATH)}>
            DACO approval.
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ProgramServicesModal;
