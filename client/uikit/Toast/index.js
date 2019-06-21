import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '../';
import Typography from '../Typography';
import Icon from '../Icon';
import FocusWrapper from '../FocusWrapper';
import useTheme from '../utils/useTheme';

const getBackgroundColor = ({ theme, variant }) =>
  ({
    [TOAST_VARIANTS.INFO]: theme.colors.secondary_4,
    [TOAST_VARIANTS.SUCCESS]: theme.colors.success_4,
    [TOAST_VARIANTS.WARNING]: theme.colors.warning_4,
    [TOAST_VARIANTS.ERROR]: theme.colors.error_4,
  }[variant]);
const getBorderColor = ({ theme, variant }) =>
  ({
    [TOAST_VARIANTS.INFO]: theme.colors.secondary_2,
    [TOAST_VARIANTS.SUCCESS]: theme.colors.success_2,
    [TOAST_VARIANTS.WARNING]: theme.colors.warning_2,
    [TOAST_VARIANTS.ERROR]: theme.colors.error_2,
  }[variant]);
const getDefaultInteractionType = variant =>
  ({
    [TOAST_VARIANTS.INFO]: TOAST_INTERACTION.CLOSE,
    [TOAST_VARIANTS.SUCCESS]: TOAST_INTERACTION.EXAPAND_DISMISS,
    [TOAST_VARIANTS.WARNING]: TOAST_INTERACTION.CLOSE,
    [TOAST_VARIANTS.ERROR]: TOAST_INTERACTION.CLOSE,
  }[variant]);

const ToastContainer = styled('div')`
  display: flex;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.colors.grey_2};
  border: solid 1px ${getBorderColor};
  background-color: ${getBackgroundColor};
`;

const ToastBodyContainer = styled('div')`
  margin-top: 8px;
  margin-bottom: 8px;
  flex: 1;
`;

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
      {icon && (
        <div
          css={css`
            margin-top: 8px;
            margin-left: 8px;
          `}
        >
          {icon}
        </div>
      )}
      <div
        css={css`
          margin: 8px;
          flex: 1;
        `}
      >
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
      </div>
      {interactionType === TOAST_INTERACTION.CLOSE && (
        <div
          css={css`
            margin: 8px;
          `}
        >
          <FocusWrapper onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.CLOSE)}>
            <Icon name="times" width="15px" height="15px" fill="primary_1" />
          </FocusWrapper>
        </div>
      )}
      {interactionType === TOAST_INTERACTION.EXAPAND_DISMISS && (
        <div
          css={css`
            min-width: 80px;
            border-left: solid 1px ${getBorderColor({ theme, variant })};
            display: flex;
            flex-direction: column;
          `}
        >
          <FocusWrapper
            onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.EXPAND)}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              flex: 1;
              border-bottom: solid 1px ${getBorderColor({ theme, variant })};
            `}
          >
            <Typography variant="paragraph" component="div" bold>
              {expandText}
            </Typography>
          </FocusWrapper>
          <FocusWrapper
            onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.DISMISS)}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              flex: 1;
            `}
          >
            <Typography variant="paragraph" component="div" bold>
              {dismissText}
            </Typography>
          </FocusWrapper>
        </div>
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
