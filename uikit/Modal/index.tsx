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
import Color from 'color';
import { styled, css } from '..';
import Typography from '../Typography';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS, ButtonSize } from '../Button';
import Icon from '../Icon';
import FocusWrapper from '../FocusWrapper';
import { UikitIconNames } from 'uikit/Icon/icons';

export const ModalContainer = styled('div')`
  position: relative;
  border-radius: 20px;
  box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 776px;
  width: auto;
  padding: 24px;
  padding-bottom: 0px;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 0 1rem;
`;

const ModalTitle = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ModalBody = styled('div')`
  margin-top: 24px;
  margin-bottom: 24px;
`;
const ModalFooter = styled('div')`
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
  background: ${({ theme }) => Color(theme.colors.primary_dark).alpha(0.8).hsl().string()};
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
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        `}
      >
        <ModalTitle>
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
          <Typography
            css={css`
              margin: 0px;
            `}
            variant="subtitle"
          >
            {title}
          </Typography>
        </ModalTitle>
        <FocusWrapper onClick={onCloseClick}>
          <Icon name="times" fill="primary_1" width="13px" height="13px" />
        </FocusWrapper>
      </div>

      <div
        css={css`
          display: flex;
          overflow-y: auto;
        `}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
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

const Overlay = (props) => <ModalOverlay {...props} />;
const Modal: typeof ModalComponent & { Overlay: typeof Overlay } = (() => {
  const output = ModalComponent as any;
  output.Overlay = Overlay;
  return output;
})();

export default Modal;
