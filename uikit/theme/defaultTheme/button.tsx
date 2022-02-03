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

import colors from './colors';
export default {
  fontSizes: {
    sm: '12px',
    md: '13px',
  },
  borderWeights: {
    sm: '1px',
    md: '2px',
  },
  paddings: {
    sm: '5px 10px',
    md: '6px 20px',
  },
  textColors: {
    primary: {
      default: colors.white,
      disabled: colors.white,
    },
    secondary: {
      default: '#523785',
      disabled: colors.white,
    },
    text: {
      default: '#523785',
      disabled: '#d0d1d8',
    },
  },
  borderColors: {
    primary: {
      default: '#8258d0',
      hover: '#9e78e1',
      active: '#6d41bd',
      focus: '#523785',
      disabled: colors.grey_disabled,
    },
    secondary: {
      default: colors.grey_1,
      hover: colors.grey_1,
      active: colors.grey_1,
      focus: '#8a8d9f',
      disabled: colors.grey_disabled,
    },
    text: {
      default: 'transparent',
      hover: '#f2ecfd',
      active: '#e6def6',
      focus: colors.white,
      disabled: 'none',
    },
  },
  colors: {
    primary: {
      default: '#8258d0',
      hover: '#9e78e1',
      active: '#6d41bd',
      focus: '#8258d0',
      disabled: colors.grey_disabled,
    },
    secondary: {
      default: colors.white,
      hover: '#f2ecfd',
      active: '#e6def6',
      focus: colors.white,
      disabled: colors.grey_disabled,
    },
    text: {
      default: 'transparent',
      hover: '#f2ecfd',
      active: '#e6def6',
      focus: colors.white,
      disabled: 'none',
    },
  },
};
