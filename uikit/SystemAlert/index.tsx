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
    icon: 'warning',
    fill: 'white',
  },
  warning: {
    color: 'warning_1',
    icon: 'warning',
    fill: 'primary_dark',
  },
  info: {
    color: 'secondary',
    icon: 'info',
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
  return (
    <Row
      css={css`
        background-color: ${theme.colors[ALERT_VARIANTS[alert.level].color]};
        padding: 10px 0;
      `}
    >
      <Col
        sm={1}
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Icon name={icon} width="30px" height="30px" />
      </Col>
      <Col
        sm={10}
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
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
      </Col>
      <Col
        sm={1}
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {alert.dismissable ? (
          <Icon
            name="times"
            width="15px"
            height="15px"
            fill={theme.colors[ALERT_VARIANTS[alert.level].fill]}
            onClick={onClose}
            title="Close"
            css={css`
              cursor: pointer;
            `}
          />
        ) : null}
      </Col>
    </Row>
  );
};

export default SystemAlert;
