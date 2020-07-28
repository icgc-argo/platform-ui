import React from 'react';
import { ThemeColorNames } from '../theme/types';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { UikitIconNames } from 'uikit/Icon/icons';
import { css } from 'uikit';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';

type AlertLevel = 'error' | 'warning' | 'info';

type AlertVariant = {
  [key in AlertLevel]: {
    color: keyof ThemeColorNames;
    icon: UikitIconNames;
    fill: keyof ThemeColorNames;
  };
};

const ALERT_VARIANTS: AlertVariant = {
  error: {
    color: 'error',
    icon: 'warning_transparent',
    fill: 'white',
  },
  warning: {
    color: 'warning_1',
    icon: 'warning_transparent',
    fill: 'primary_dark',
  },
  info: {
    color: 'secondary',
    icon: 'info_transparent',
    fill: 'white',
  },
};

export type Alert = {
  level: AlertLevel;
  title: string;
  message?: string;
  dismissable: boolean;
};

type AlertProps = {
  alert: Alert;
  onClose: () => void;
};

const SystemAlert: React.ComponentType<AlertProps> = ({ alert, onClose }) => {
  const theme = useTheme();
  const icon = ALERT_VARIANTS[alert.level].icon;
  const fill = ALERT_VARIANTS[alert.level].fill;
  return (
    <div
      css={css`
        background-color: ${theme.colors[ALERT_VARIANTS[alert.level].color]};
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <div>
          <Icon
            name={icon}
            fill={fill}
            width="30px"
            height="30px"
            css={css`
              margin-right: 15px;
            `}
          />
        </div>
        <div>
          <Typography
            css={css`
              font-size: 16px;
              font-weight: 500;
              color: ${theme.colors[ALERT_VARIANTS[alert.level].fill]};
              margin: 0;
            `}
          >
            {alert.title}
          </Typography>
          {alert.message && (
            <Typography
              css={css`
                margin: 0;
                color: ${theme.colors[ALERT_VARIANTS[alert.level].fill]};
                font-weight: 300;
              `}
            >
              {alert.message}
            </Typography>
          )}
        </div>
      </div>

      <div>
        {alert.dismissable ? (
          <Icon
            name="times"
            width="15px"
            height="15px"
            fill={theme.colors[ALERT_VARIANTS[alert.level].fill]}
            onClick={onClose}
            title="Close"
            css={css`
              padding-left: 5px;
              cursor: pointer;
            `}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SystemAlert;
