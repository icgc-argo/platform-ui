import React from 'react';
import { ThemeColorNames } from '../theme/types';
import theme from 'uikit/theme/defaultTheme';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { UikitIconNames } from 'uikit/Icon/icons';
import { css } from 'uikit';
import { Col, Row } from 'react-grid-system';

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
    color: theme.colors.error as keyof ThemeColorNames,
    icon: 'warning',
    fill: theme.colors.white as keyof ThemeColorNames,
  },
  warning: {
    color: theme.colors.warning_1 as keyof ThemeColorNames,
    icon: 'warning',
    fill: theme.colors.primary_dark as keyof ThemeColorNames,
  },
  info: {
    color: theme.colors.secondary as keyof ThemeColorNames,
    icon: 'info',
    fill: theme.colors.white as keyof ThemeColorNames,
  },
};

// variants have different icon, text color and background color

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
  const icon = ALERT_VARIANTS[alert.level].icon;
  return (
    <Row
      css={css`
        background-color: ${ALERT_VARIANTS[alert.level].color};
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
            color: ${ALERT_VARIANTS[alert.level].fill};
            margin: 0;
          `}
        >
          {alert.title}
        </Typography>
        {alert.message && (
          <Typography
            css={css`
              margin: 0;
              color: ${ALERT_VARIANTS[alert.level].fill};
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
            fill={ALERT_VARIANTS[alert.level].fill}
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
