/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { css, Modal } from '@icgc-argo/uikit';

import ReactDOM from 'react-dom';

export const fillAvailableWidth = css`
  width: -webkit-fill-available;
  width: -moz-available;
  min-width: -webkit-fill-available;
  min-width: -moz-available;
`;

export const fillAvailableHeight = css`
  height: -webkit-fill-available;
  height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: -moz-available;
`;

export const modalPortalRef = React.createRef<HTMLDivElement>();

const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

const ModalPortal = ({ children }: { children: React.ReactElement }) => {
  const ref = modalPortalRef.current;
  const mounted = useMounted();
  return ref
    ? ReactDOM.createPortal(
        <div
          id="modalContainer"
          css={css`
            transition: all 0.2s;
            opacity: ${mounted ? 1 : 0};
          `}
        >
          <Modal.Overlay
            css={css`
              ${fillAvailableWidth}
              ${fillAvailableHeight}
              @media (min-width: 768px) {
                width: 100vw;
                height: 100vh;
              }
            `}
          >
            {children}
          </Modal.Overlay>
        </div>,
        ref,
      )
    : null;
};

export default ModalPortal;
