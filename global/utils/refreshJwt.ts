import urlJoin from 'url-join';
import { getConfig } from 'global/config';
import Cookies from 'js-cookie';
import { EGO_JWT_KEY } from 'global/constants';
import { isValidJwt } from './egoJwt';
import Queue from 'promise-queue';

const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();

var maxConcurrent = 1;
var maxQueue = Infinity;
var queue = new Queue(maxConcurrent, maxQueue);

// pass client_id to get ego api to set correct response headers
const refreshUrl = urlJoin(EGO_API_ROOT, `/api/oauth/refresh?client_id=${EGO_CLIENT_ID}`);

export default () =>
  queue.add(() => {
    return fetch(refreshUrl, {
      credentials: 'include',
      headers: {
        accept: '*/*',
        authorization: Cookies.get(EGO_JWT_KEY) || '',
      },
      method: 'POST',
    })
      .then(res => res.text())
      .then(newJwt => {
        if (isValidJwt(newJwt)) {
          Cookies.set(EGO_JWT_KEY, newJwt);
        }
        return newJwt;
      });
  });
