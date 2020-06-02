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
import Modal from 'uikit/Modal';
import { UserModel } from '../common';

const DeleteUserModal = ({
  user,
  dismissModal,
  onSubmit,
}: {
  user: typeof UserModel;
  onSubmit: () => any | void;
  dismissModal: () => any | void;
}) => {
  return (
    <Modal
      title="Remove User?"
      titleIconConfig={{ name: 'warning', fill: 'warning' }}
      actionButtonText="Remove User"
      buttonSize="sm"
      cancelText="Cancel"
      onActionClick={() => onSubmit()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      <div style={{ width: '245px' }}>
        Are you sure you want to remove{' '}
        <strong>{user ? `${user.firstName} ${user.lastName}` : ''}</strong> from the program?
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
