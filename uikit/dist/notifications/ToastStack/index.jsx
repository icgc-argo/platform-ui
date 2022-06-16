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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import React from 'react';
import PropTypes from 'prop-types';
import differenceBy from 'lodash/differenceBy';
import { styled } from '../..';
import Toast from '../Toast';
const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
const ANIMATION_DURATION = 500;
const StackContainer = styled('div')`
  max-width: 400px;
`;
const AnimatedContainer = styled('div')`
  margin-top: 10px;
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  @keyframes exit {
    from {
      opacity: 1;
      transform: translateX(0px);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
  animation: ${({ unMounting }) => (unMounting ? 'exit' : 'enter')} ${ANIMATION_DURATION / 1000}s
    ease-in-out;
`;
const ToastStack = ({ toastConfigs = [], onInteraction = ({ id, toastIndex, payload }) => {} }) => {
  // holds on to a local copy of toastConfigs for timing with animation
  const convertToLocalStack = (toastConfigs) =>
    toastConfigs.map((i) => Object.assign(Object.assign({}, i), { unMounting: false }));
  const [stack, setStack] = React.useState(convertToLocalStack(toastConfigs));
  const previousToastConfigs = usePrevious(toastConfigs);
  // this ensures previously registered timeouts are canceled on new render
  const [currentTimeout, setCurrentTimeout] = React.useState(null);
  const lastTimeOut = usePrevious(currentTimeout);
  if (lastTimeOut) {
    clearTimeout(lastTimeOut);
  }
  // observes toastConfigs from props to sync up with local state, with some delay for animation
  React.useEffect(() => {
    const [itemToRemove] = differenceBy(previousToastConfigs, toastConfigs);
    if (itemToRemove) {
      setStack(
        convertToLocalStack(previousToastConfigs).map((item) =>
          Object.assign(Object.assign({}, item), { unMounting: item.id === itemToRemove.id }),
        ),
      );
      setCurrentTimeout(
        setTimeout(() => {
          setStack(convertToLocalStack(toastConfigs));
        }, ANIMATION_DURATION),
      );
    } else {
      setStack(convertToLocalStack(toastConfigs));
    }
  }, [toastConfigs]);
  return (
    <StackContainer>
      {stack.map((_a, i) => {
        var { id, unMounting } = _a,
          rest = __rest(_a, ['id', 'unMounting']);
        return (
          <AnimatedContainer key={id} unMounting={unMounting}>
            <Toast
              {...rest}
              onInteraction={(payload) => {
                onInteraction({
                  toastIndex: i,
                  id,
                  payload,
                });
                if (rest.onInteraction) {
                  rest.onInteraction(payload);
                }
              }}
            />
          </AnimatedContainer>
        );
      })}
    </StackContainer>
  );
};
ToastStack.propTypes = {
  /**
   * This is directly the props that goes to `Toast` component, with addition of a unique `id` field.
   * Check out https://argo-ui-storybook.netlify.com/?path=/story/uikit-toast--basic
   */
  toastConfigs: PropTypes.arrayOf(
    PropTypes.shape(Object.assign({ id: PropTypes.string.isRequired }, Toast.propTypes)),
  ),
  onInteraction: PropTypes.func,
};
export default ToastStack;
//# sourceMappingURL=index.jsx.map
