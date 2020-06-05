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
import debounce from 'lodash/debounce';
import getElementResizeListener from 'uikit/utils/getElementResizeListener';

export default (
  parentRef: React.RefObject<HTMLElement>,
  _config: { resizeDebounce?: number } = {},
) => {
  const config: typeof _config = {
    resizeDebounce: 200,
    ..._config,
  };
  const [width, setWidthState] = React.useState<number | null>(null);
  const [height, setHeightState] = React.useState<number | null>(null);
  const [resizing, setResizing] = React.useState(false);
  React.useEffect(() => {
    if (!!parentRef.current) setWidthState(parentRef.current.clientWidth);
    if (!!parentRef.current) setHeightState(parentRef.current.clientHeight);
  }, [
    !!parentRef.current ? parentRef.current.clientWidth : 0,
    !!parentRef.current ? parentRef.current.clientHeight : 0,
  ]);
  React.useEffect(() => {
    const currentParent = parentRef.current;
    if (currentParent) {
      const setWidth = debounce((width: number) => {
        setWidthState(width);
        setResizing(false);
      }, config.resizeDebounce);
      const setHeight = debounce((height: number) => {
        setHeightState(height);
        setResizing(false);
      }, config.resizeDebounce);
      const onResize = () => {
        if (currentParent.clientWidth !== width) {
          setResizing(true);
          setWidth(currentParent.clientWidth);
        }
        if (currentParent.clientHeight !== height) {
          setResizing(true);
          setHeight(currentParent.clientHeight);
        }
      };
      const resizeListener = getElementResizeListener();
      if (currentParent) resizeListener.listenTo(currentParent, onResize);
      return () => {
        if (currentParent) resizeListener.removeListener(currentParent, onResize);
      };
    }
  }, [parentRef.current]);
  return { width, height, resizing };
};
