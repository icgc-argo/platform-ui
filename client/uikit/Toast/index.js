import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '../';
import Typography from '../Typography';
import Icon from '../Icon';
import FocusWrapper from '../FocusWrapper';
import useTheme from '../utils/useTheme';
import {
  ToastBodyContainer,
  IconContainer,
  ToastContainer,
  ActionButtonsContainer,
  ActionButton,
  getBorderColor,
} from './styledComponents';

const getDefaultInteractionType = variant =>
  ({
    [TOAST_VARIANTS.INFO]: TOAST_INTERACTION.CLOSE,
    [TOAST_VARIANTS.SUCCESS]: TOAST_INTERACTION.EXAPAND_DISMISS,
    [TOAST_VARIANTS.WARNING]: TOAST_INTERACTION.CLOSE,
    [TOAST_VARIANTS.ERROR]: TOAST_INTERACTION.CLOSE,
  }[variant]);

const DefaultIcon = ({ variant }) => (
  <Icon
    name="info"
    fill={
      {
        [TOAST_VARIANTS.INFO]: 'secondary',
        [TOAST_VARIANTS.SUCCESS]: 'success',
        [TOAST_VARIANTS.WARNING]: 'warning',
        [TOAST_VARIANTS.ERROR]: 'error',
      }[variant]
    }
    width="30px"
    height="30px"
  />
);

const Toast = ({
  variant = TOAST_VARIANTS.INFO,
  interactionType = getDefaultInteractionType(variant),
  title,
  content = 'Lorem ipsum dolor amet helvetica post-ironic fingerstache trust fund pitchfork tofu venmo live-edge',
  expandText = 'VIEW',
  dismissText = 'DISMISS',
  icon = <DefaultIcon variant={variant} />,
  onInteraction = ({ type, event }) => {},
}) => {
  const theme = useTheme();
  const dispatchEvent = eventType => e => onInteraction({ type: eventType, event: e });
  return (
    <ToastContainer variant={variant}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <ToastBodyContainer>
        {title && (
          <Typography
            variant="subtitle2"
            bold
            css={css`
              margin: 0px;
              margin-top: 4px;
              margin-bottom: 4px;
            `}
          >
            {title}
          </Typography>
        )}
        <Typography
          variant="paragraph"
          css={css`
            margin: 0px;
          `}
        >
          {content}
        </Typography>
      </ToastBodyContainer>
      {interactionType === TOAST_INTERACTION.CLOSE && (
        <FocusWrapper
          css={css`
            margin: 8px;
            height: 15px;
          `}
          onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.CLOSE)}
        >
          <Icon name="times" width="15px" height="15px" fill="primary_1" />
        </FocusWrapper>
      )}
      {interactionType === TOAST_INTERACTION.EXAPAND_DISMISS && (
        <ActionButtonsContainer variant={variant}>
          <ActionButton
            css={css`
              border-bottom: solid 1px ${getBorderColor({ theme, variant })};
            `}
            onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.EXPAND)}
          >
            <Typography variant="paragraph" component="div" bold>
              {expandText}
            </Typography>
          </ActionButton>
          <ActionButton variant={variant} onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.DISMISS)}>
            <Typography variant="paragraph" component="div" bold>
              {dismissText}
            </Typography>
          </ActionButton>
        </ActionButtonsContainer>
      )}
    </ToastContainer>
  );
};

export const TOAST_INTERACTION_EVENTS = {
  CLOSE: 'CLOSE',
  EXPAND: 'EXPAND',
  DISMISS: 'DISMISS',
};

export const TOAST_VARIANTS = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};
export const TOAST_INTERACTION = {
  CLOSE: 'CLOSE',
  EXAPAND_DISMISS: 'EXAPAND_DISMISS',
  NONE: 'NONE',
};

Toast.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  icon: PropTypes.node,
  onInteraction: PropTypes.func,
  variant: PropTypes.oneOf([
    TOAST_VARIANTS.INFO,
    TOAST_VARIANTS.SUCCESS,
    TOAST_VARIANTS.WARNING,
    TOAST_VARIANTS.ERROR,
  ]),
  interactionType: PropTypes.oneOf([
    TOAST_INTERACTION.NONE,
    TOAST_INTERACTION.CLOSE,
    TOAST_INTERACTION.EXAPAND_DISMISS,
  ]),
  expandText: PropTypes.string,
  dismissText: PropTypes.string,
};

export default Toast;
