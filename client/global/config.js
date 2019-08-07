// @flow

import { asEnum } from './utils/common';
import urlJoin from 'url-join';

export const ENVIRONMENTS = asEnum(
  {
    development: 'development',
    production: 'production',
  },
  { name: 'environment' },
);

export const PORT = Number(process.env.PORT) || 8080;
export const GATEWAY_API_ROOT = process.env.GATEWAY_API_ROOT || `http://localhost:9000`;

export const AUTH_DISABLED = String(process.env.AUTH_DISABLED).toLowerCase() === 'true';

export const EGO_API_ROOT = String(process.env.EGO_API_ROOT);
export const EGO_CLIENT_ID = String(process.env.EGO_CLIENT_ID);
export const EGO_URL = String(
  urlJoin(EGO_API_ROOT, `api/oauth/login/google?client_id=${EGO_CLIENT_ID}`),
);

export const GA_TRACKING_ID = String(process.env.GA_TRACKING_ID);

export const NODE_ENV = String(process.env.ENV || ENVIRONMENTS.development);

if (!GA_TRACKING_ID) {
  console.warn(`no GA_TRACKING_ID was provided`);
}

if (!EGO_API_ROOT) {
  /* checks for EGO_API_ROOT */
  console.warn('EGO_API must be specified');
}

/* checks for EGO_CLIENT_ID */
if (!EGO_CLIENT_ID) {
  console.warn('EGO_CLIENT_ID must be specified');
}

/* checks for NODE_ENV */
if (!process.env.NODE_ENV) {
  console.warn(`NODE_ENV not set, defaulting to ${ENVIRONMENTS.development}`);
}
if (!ENVIRONMENTS[NODE_ENV]) {
  throw new Error(`${NODE_ENV} is not a valid NODE_ENV configuration`);
}
