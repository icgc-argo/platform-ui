import { styled, css } from '../..';
import { NOTIFICATION_VARIANTS } from '.';
import FocusWrapper from '../../FocusWrapper';

const getBackgroundColor = ({ theme, variant }) =>
  ({
    [NOTIFICATION_VARIANTS.INFO]: theme.colors.secondary_4,
    [NOTIFICATION_VARIANTS.SUCCESS]: theme.colors.success_4,
    [NOTIFICATION_VARIANTS.WARNING]: theme.colors.warning_4,
    [NOTIFICATION_VARIANTS.ERROR]: theme.colors.error_4,
  }[variant]);
export const getBorderColor = ({ theme, variant }) =>
  ({
    [NOTIFICATION_VARIANTS.INFO]: theme.colors.secondary_2,
    [NOTIFICATION_VARIANTS.SUCCESS]: theme.colors.success_2,
    [NOTIFICATION_VARIANTS.WARNING]: theme.colors.warning_2,
    [NOTIFICATION_VARIANTS.ERROR]: theme.colors.error_2,
  }[variant]);

export const NotificationContainer = styled('div')`
  display: flex;
  border-radius: 8px;
  box-shadow: ${({ theme, noShadow }) => !noShadow && `0 2px 4px 0 ${theme.colors.grey_2}`};
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

export const ActionButtonsContainer = styled('div')`
  min-width: 80px;
  border-left: solid 1px ${getBorderColor};
  display: flex;
  flex-direction: column;
`;

export const ActionButton = styled(FocusWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
