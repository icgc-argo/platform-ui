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

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { NOTIFICATION_VARIANTS, NotificationVariant } from '.';
import FocusWrapper from '../../FocusWrapper';

const getBackgroundColor = ({ theme, variant }: { theme?: any; variant: NotificationVariant }) =>
  ({
    [NOTIFICATION_VARIANTS.INFO]: theme.colors.secondary_4,
    [NOTIFICATION_VARIANTS.SUCCESS]: theme.colors.success_4,
    [NOTIFICATION_VARIANTS.WARNING]: theme.colors.warning_4,
    [NOTIFICATION_VARIANTS.ERROR]: theme.colors.error_4,
  }[variant]);
export const getBorderColor = ({ theme, variant }: { theme?: any; variant: NotificationVariant }) =>
  ({
    [NOTIFICATION_VARIANTS.INFO]: theme.colors.secondary_2,
    [NOTIFICATION_VARIANTS.SUCCESS]: theme.colors.success_2,
    [NOTIFICATION_VARIANTS.WARNING]: theme.colors.warning_2,
    [NOTIFICATION_VARIANTS.ERROR]: theme.colors.error_2,
  }[variant]);

export const NotificationContainer = styled('div')`
  display: flex;
  border-radius: 8px;
  box-shadow: ${({ theme, noShadow }: any) => !noShadow && `0 2px 4px 0 ${theme.colors.grey_2}`};
  border: solid 1px ${getBorderColor};
  background-color: ${getBackgroundColor};
`;

export const NotificationBodyContainer = styled('div')`
  margin: 8px;
  flex: 1;
`;

export const IconContainer = styled('div')`
  margin-top: 12px;
  margin-bottom: 8px;
  margin-left: 8px;
  line-height: 0px;
`;

export const ActionButtonsContainer = styled<'div', { variant?: NotificationVariant }>('div')`
  min-width: 80px;
  border-left: solid 1px ${getBorderColor};
  display: flex;
  flex-direction: column;
`;

export const ActionButton = styled<typeof FocusWrapper, { variant?: NotificationVariant }>(
  FocusWrapper,
)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
