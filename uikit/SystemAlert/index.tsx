import React from 'react';
import { css } from '@emotion/react';

import { ThemeColorNames } from '../theme/types';
import Typography from 'uikit/Typography';
import Icon from 'uikit/Icon';
import { UikitIconNames } from 'uikit/Icon/icons';
import { useTheme } from 'uikit/ThemeProvider';
import Link from 'uikit/Link';

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

/**
 * Find markdown style links in the alert message and render them as Link
 * @param message
 * @param linkColor
 * @returns
 */
const parseMessage = (message: string, linkColor: string) => {
  // Split message into text and links
  const messageParts = message.split(/(\[.+\]\(.*\))/);
  return messageParts.map((part) => {
    const matches = part.match(/\[(.*)\]\((.*)\)/);
    // matches will either be null (not a markdown link) or an array with the content like:
    // matches[0]: provided text
    // matches[1]: first group match (Link Display Text)
    // matches[2]: second group match (Link href)
    // matches... more stuff we dont care about
    if (matches) {
      return (
        <Link href={matches[2]} style={{ color: linkColor }} target="_blank">
          {matches[1]}
        </Link>
      );
    } else {
      return part;
    }
  });
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
              {parseMessage(alert.message, theme.colors[ALERT_VARIANTS[alert.level].fill])}
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
              padding-right: 18px;
              cursor: pointer;
            `}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SystemAlert;
