// @flow
import React from 'react';
import Router from 'next/router';

import useAuthContext from 'global/hooks/useAuthContext';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import { createPage } from 'global/utils/pages';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import useTheme from 'uikit/utils/useTheme';

export default createPage({ isPublic: true })(() => {
  const theme = useTheme();

  const authContext = useAuthContext();

  React.useEffect(() => {
    if (authContext) {
      const { data, token } = authContext;
      const currentRedirect = localStorage.getItem(LOCAL_STORAGE_REDIRECT_KEY);
      if (token) {
        if (currentRedirect) {
          localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
          Router.replace(currentRedirect);
        } else {
          Router.replace(getDefaultRedirectPathForUser(token));
        }
      }
    }
  });

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 58px 1fr;
        min-height: 100vh;
      `}
    >
      <div
        css={css`
          background-color: ${theme.colors.primary};
        `}
      />
      <div
        css={css`
          background-color: ${theme.colors.grey_4};
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <DnaLoader />
      </div>
      {/*       <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
});
