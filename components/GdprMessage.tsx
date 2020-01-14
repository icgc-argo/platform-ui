import React from 'react';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from '@emotion/core';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import { LOCAL_STORAGE_GDPR_ACCEPTTANCE_KEY } from 'global/constants';

export default () => {
  const theme = useTheme();
  const [accepted, setAcceptedState] = React.useState(true);
  const sync = () => {
    setAcceptedState(localStorage.getItem(LOCAL_STORAGE_GDPR_ACCEPTTANCE_KEY) === 'true');
  };
  const persistAcceptedState = (accepted: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_GDPR_ACCEPTTANCE_KEY, String(accepted));
    sync();
  };
  React.useEffect(() => {
    sync();
  }, []);
  return (
    <>
      {!accepted && (
        <div
          css={css`
            background: ${theme.colors.primary_dark};
            color: ${theme.colors.white};
            display: flex;
            padding: 8px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 16px;
              padding-left: 8px;
            `}
          >
            <Icon name="info" fill={theme.colors.secondary} width="30px" height="30px" />
          </div>
          <Typography as="div">
            This website uses cookies that are required to verify permissions, access controlled
            data, and analyze traffic. Your browser settings may allow you to turn off cookies. If
            you turn off browser cookies, you will not be able to access some features of the ICGC
            ARGO Data Platform. By continuing to use our website site without changing your browser
            settings, you consent to our use of cookies in accordance with our Privacy Policy. To
            learn more about how we use cookies on this website, please review our Privacy Policy.
          </Typography>
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 16px;
            `}
          >
            <Button variant="secondary" onClick={() => persistAcceptedState(true)}>
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
