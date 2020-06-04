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

import * as React from 'react';
import Modal from 'uikit/Modal';

type ModalProps = React.ComponentProps<typeof Modal>;

export default (initialModalProps: ModalProps = {}) => {
  const [isModalShown, setModalShown] = React.useState(false);
  const [modalProps, setModalProps] = React.useState<ModalProps>(initialModalProps);
  const [{ onConfirmed, onCancel }, setSignOffFlow] = React.useState({
    onConfirmed: () => setModalShown(false),
    onCancel: () => setModalShown(false),
  });

  const getUserConfirmation = (modalProps: ModalProps = {}): Promise<boolean> =>
    new Promise(resolve => {
      const onConfirmed = () => {
        setModalShown(false);
        resolve(true);
      };
      const onCancel = () => {
        setModalShown(false);
        resolve(false);
      };
      setModalProps({
        ...modalProps,
        onCancelClick: e => {
          if (!!modalProps.onCancelClick) modalProps.onCancelClick(e);
          onCancel();
        },
        onCloseClick: e => {
          if (!!modalProps.onCancelClick) modalProps.onCancelClick(e);
          onCancel();
        },
        onActionClick: e => {
          if (!!modalProps.onActionClick) modalProps.onActionClick(e);
          onConfirmed();
        },
      });
      setModalShown(true);
      setSignOffFlow({
        onConfirmed,
        onCancel,
      });
    });
  return {
    isModalShown,
    getUserConfirmation,
    onConfirmed,
    onCancel,
    modalProps,
  };
};
