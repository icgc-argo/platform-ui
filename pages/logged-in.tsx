import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import useAuthContext from 'global/hooks/useAuthContext';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Cookies from 'js-cookie';
import React from 'react';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import useTheme from 'uikit/utils/useTheme';
import urlJoin from 'url-join';

export default createPage({ isPublic: true })(() => {
  const theme = useTheme();

  const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();

  const redirect = (token: string) => {
    location.assign(getDefaultRedirectPathForUser(token));
  };

  React.useEffect(() => {
    const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);
    fetch(egoLoginUrl, {
      credentials: 'include',
      headers: { accept: '*/*' },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.text())
      .then(egoToken => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        redirect(egoToken);
      })
      .catch(err => {
        console.warn('err: ', err);
        redirect(null);
      });
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
