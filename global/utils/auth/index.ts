import queryString from 'query-string';
import { get } from 'lodash';
import urlJoin from 'url-join';
import { createRedirectURL } from '../common';
import { getConfig } from '../../config';
import { LOGIN_PAGE_PATH } from '../../constants/pages';

const { EGO_URL } = getConfig();

export const createLoginURL = (asPath: string): string => {
  // split URL into path & query.
  // there could be a second level of queries inside the first &
  // pageContext.query is unreliable.
  const queryIndex = asPath.indexOf('?');
  const path = queryIndex === -1 ? asPath : asPath.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : asPath.slice(queryIndex + 1);
  const queryParsed = queryString.parse(query);

  const redirectParam = get(queryParsed, 'redirect') as string;

  if (redirectParam) {
    const parsedRedirect = queryString.parseUrl(redirectParam);
    const existingQuery = queryString.stringify(parsedRedirect.query);

    const queryRedirect = createRedirectURL({
      origin: location.origin,
      path: parsedRedirect.url,
      query: existingQuery,
    });
    return urlJoin(EGO_URL, queryRedirect);
  } else if (asPath === '/' || asPath === LOGIN_PAGE_PATH) {
    return EGO_URL;
  } else {
    const redirect = createRedirectURL({
      origin: location.origin,
      path,
      query,
    });
    return urlJoin(EGO_URL, redirect);
  }
};
