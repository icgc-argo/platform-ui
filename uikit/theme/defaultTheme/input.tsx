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

import colors from './colors';

type UikitInputState = 'default' | 'active' | 'focus' | 'disabled' | 'error' | 'hover';
export const INPUT_STATES = {
  default: 'default' as UikitInputState,
  active: 'active' as UikitInputState,
  focus: 'focus' as UikitInputState,
  disabled: 'disabled' as UikitInputState,
  error: 'error' as UikitInputState,
  hover: 'hover' as UikitInputState,
};

export default {
  fontSizes: { sm: '12px', lg: '14px' },
  paddings: {
    sm: '8px 10px',
    lg: '7px 10px',
  },
  textColors: {
    [INPUT_STATES.default]: colors.black,
    [INPUT_STATES.active]: colors.black,
    [INPUT_STATES.focus]: colors.black,
    [INPUT_STATES.disabled]: colors.grey,
    [INPUT_STATES.error]: colors.grey,
  },
  borderColors: {
    [INPUT_STATES.default]: colors.grey_1,
    [INPUT_STATES.active]: colors.grey,
    [INPUT_STATES.focus]: colors.grey,
    [INPUT_STATES.disabled]: colors.grey_2,
    [INPUT_STATES.error]: colors.error,
    [INPUT_STATES.hover]: colors.secondary_1,
  },
  colors: {
    [INPUT_STATES.default]: colors.white,
    [INPUT_STATES.disabled]: '#f6f6f7',
  },
};
