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
import { css } from '@emotion/core';
import Typography from '../../Typography';
import Icon from '../../Icon';
import FocusWrapper from '../../FocusWrapper';
import useTheme from '../../utils/useTheme';
import {
  NotificationBodyContainer,
  IconContainer,
  NotificationContainer,
  ActionButtonsContainer,
  ActionButton,
  getBorderColor,
} from './styledComponents';
const getDefaultInteractionType = (variant) =>
  ({
    [NOTIFICATION_VARIANTS.INFO]: NOTIFICATION_INTERACTION.CLOSE,
    [NOTIFICATION_VARIANTS.SUCCESS]: NOTIFICATION_INTERACTION.ACTION_DISMISS,
    [NOTIFICATION_VARIANTS.WARNING]: NOTIFICATION_INTERACTION.CLOSE,
    [NOTIFICATION_VARIANTS.ERROR]: NOTIFICATION_INTERACTION.CLOSE,
  }[variant]);
const DefaultIcon = ({ variant, size }) => {
  const fill = {
    [NOTIFICATION_VARIANTS.INFO]: 'secondary',
    [NOTIFICATION_VARIANTS.SUCCESS]: 'success',
    [NOTIFICATION_VARIANTS.WARNING]: 'warning',
    [NOTIFICATION_VARIANTS.ERROR]: 'error',
  }[variant];
  const name = {
    [NOTIFICATION_VARIANTS.INFO]: 'info',
    [NOTIFICATION_VARIANTS.SUCCESS]: 'success',
    [NOTIFICATION_VARIANTS.WARNING]: 'warning',
    [NOTIFICATION_VARIANTS.ERROR]: 'warning',
  }[variant];
  const width = {
    [NOTIFICATION_SIZES.MD]: '25px',
    [NOTIFICATION_SIZES.SM]: '20px',
  }[size];
  const height = width;
  return <Icon name={name} fill={fill} width={width} height={height} />;
};
const Notification = (_a) => {
  var {
      variant = NOTIFICATION_VARIANTS.INFO,
      size = NOTIFICATION_SIZES.MD,
      interactionType = getDefaultInteractionType(variant),
      title,
      content,
      actionText = 'VIEW',
      dismissText = 'DISMISS',
      icon = <DefaultIcon variant={variant} size={size} />,
      onInteraction = ({ type, event }) => {},
      noShadow = false,
      contentProps = {},
    } = _a,
    otherProps = __rest(_a, [
      'variant',
      'size',
      'interactionType',
      'title',
      'content',
      'actionText',
      'dismissText',
      'icon',
      'onInteraction',
      'noShadow',
      'contentProps',
    ]);
  const theme = useTheme();
  const dispatchEvent = (eventType) => (e) => onInteraction({ type: eventType, event: e });
  const titleTypographyVariant = {
    [NOTIFICATION_SIZES.MD]: 'subtitle2',
    [NOTIFICATION_SIZES.SM]: 'paragraph',
  }[size];
  const bodyTypographyVariant = {
    [NOTIFICATION_SIZES.MD]: 'paragraph',
    [NOTIFICATION_SIZES.SM]: 'data',
  }[size];
  const headerVerticalMargin = {
    [NOTIFICATION_SIZES.MD]: '4px',
    [NOTIFICATION_SIZES.SM]: '0px',
  }[size];
  return (
    <NotificationContainer variant={variant} noShadow={noShadow} {...otherProps}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <NotificationBodyContainer {...contentProps}>
        {title && (
          <Typography
            variant={titleTypographyVariant}
            bold
            css={css`
              ${size === NOTIFICATION_SIZES.MD
                ? css`
                    font-size: 16px;
                  `
                : ''}
              margin: 0px;
              margin-top: ${headerVerticalMargin};
              margin-bottom: ${headerVerticalMargin};
            `}
          >
            {title}
          </Typography>
        )}
        {content && (
          <Typography
            variant={bodyTypographyVariant}
            css={css`
              margin: 0px;
            `}
          >
            {content}
          </Typography>
        )}
      </NotificationBodyContainer>
      {interactionType === NOTIFICATION_INTERACTION.CLOSE && (
        <FocusWrapper
          css={css`
            margin: 8px;
            height: 15px;
            line-height: 0px;
          `}
          onClick={dispatchEvent(NOTIFICATION_INTERACTION_EVENTS.CLOSE)}
        >
          <Icon name="times" width="12px" height="12px" fill="primary_1" />
        </FocusWrapper>
      )}
      {interactionType === NOTIFICATION_INTERACTION.ACTION_DISMISS && (
        <ActionButtonsContainer variant={variant}>
          <ActionButton
            css={css`
              border-bottom: solid 1px ${getBorderColor({ theme, variant })};
            `}
            onClick={dispatchEvent(NOTIFICATION_INTERACTION_EVENTS.ACTION)}
          >
            <Typography variant="data" component="div" bold>
              {actionText}
            </Typography>
          </ActionButton>
          <ActionButton
            variant={variant}
            onClick={dispatchEvent(NOTIFICATION_INTERACTION_EVENTS.DISMISS)}
          >
            <Typography variant="data" component="div" bold>
              {dismissText}
            </Typography>
          </ActionButton>
        </ActionButtonsContainer>
      )}
    </NotificationContainer>
  );
};
export const NOTIFICATION_VARIANTS = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
});
export const NOTIFICATION_INTERACTION_EVENTS = Object.freeze({
  CLOSE: 'CLOSE',
  ACTION: 'ACTION',
  DISMISS: 'DISMISS',
});
export const NOTIFICATION_INTERACTION = Object.freeze({
  CLOSE: 'CLOSE',
  ACTION_DISMISS: 'ACTION_DISMISS',
  NONE: 'NONE',
});
export const NOTIFICATION_SIZES = Object.freeze({
  MD: 'MD',
  SM: 'SM',
});
Notification.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  icon: PropTypes.node,
  onInteraction: PropTypes.func,
  variant: PropTypes.oneOf([
    NOTIFICATION_VARIANTS.INFO,
    NOTIFICATION_VARIANTS.SUCCESS,
    NOTIFICATION_VARIANTS.WARNING,
    NOTIFICATION_VARIANTS.ERROR,
  ]),
  interactionType: PropTypes.oneOf([
    NOTIFICATION_INTERACTION.NONE,
    NOTIFICATION_INTERACTION.CLOSE,
    NOTIFICATION_INTERACTION.ACTION_DISMISS,
  ]),
  actionText: PropTypes.string,
  dismissText: PropTypes.string,
  size: PropTypes.oneOf([NOTIFICATION_SIZES.MD, NOTIFICATION_SIZES.SM]),
  noShadow: PropTypes.bool,
};
export default Notification;
//# sourceMappingURL=index.jsx.map
