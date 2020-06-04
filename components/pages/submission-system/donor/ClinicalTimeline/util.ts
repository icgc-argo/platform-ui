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

import defaultTheme from 'uikit/theme/defaultTheme';

export const getTimelineStyles = (theme: typeof defaultTheme) => {
  const colors = theme.colors;
  return {
    primary_diagnosis: {
      checkboxColor: colors.secondary,
      borderColor: colors.secondary_1,
      backgroundColor: colors.secondary_4,
    },
    specimen: {
      checkboxColor: colors.accent3_dark,
      borderColor: colors.accent3,
      backgroundColor: colors.accent3_4,
    },
    treatment: {
      checkboxColor: colors.accent4,
      borderColor: colors.accent4_1,
      backgroundColor: colors.accent4_4,
    },
    follow_up: {
      checkboxColor: colors.accent2,
      borderColor: colors.accent2_1,
      backgroundColor: colors.accent2_4,
    },
    deceased: {
      borderColor: colors.grey_1,
      backgroundColor: colors.white,
      checkboxColor: colors.white,
    },
  };
};
