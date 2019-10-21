import urlJoin from 'url-join';

export const GATEWAY_API_ROOT = process.env.GATEWAY_API_ROOT || 'http://localhost:9000';
export const EGO_API_ROOT = process.env.EGO_API_ROOT || '';
export const EGO_CLIENT_ID = process.env.EGO_CLIENT_ID || '';
export const EGO_PUBLIC_KEY = (
  process.env.EGO_PUBLIC_KEY ||
  `-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lOqMuPLCVusc6szklNXQL1FHhSkEgR7An+8BllBqTsRHM4bRYosseGFCbYPn8r8FsWuMDtxp0CwTyMQR2PCbJ740DdpbE1KC6jAfZxqcBete7gP0tooJtbvnA6X4vNpG4ukhtUoN9DzNOO0eqMU0Rgyy5HjERdYEWkwTNB30i9I+nHFOSj4MGLBSxNlnuo3keeomCRgtimCx+L/K3HNo0QHTG1J7RzLVAchfQT0lu3pUJ8kB+UM6/6NG+fVyysJyRZ9gadsr4gvHHckw8oUBp2tHvqBEkEdY+rt1Mf5jppt7JUV7HAPLB/qR5jhALY2FX/8MN+lPLmb/nLQQichVQIDAQAB\r\n-----END PUBLIC KEY-----`
).replace(/\\n/g, '\n');
export const AUTH_DISABLED = process.env.AUTH_DISABLED === 'true';
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID || '';
export const EGO_URL = urlJoin(EGO_API_ROOT, `/api/oauth/login/google?client_id=${EGO_CLIENT_ID}`);
