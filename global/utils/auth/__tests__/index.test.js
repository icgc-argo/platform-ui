import { getConfig } from 'global/config';
import { createLoginURL } from '..';

const { EGO_URL } = getConfig();

describe('create ego URLs', () => {
  describe('create login URL with redirect parameter', () => {
    // testing all of the URL patterns
    test('homepage', () => {
      const expected = EGO_URL;
      const input = `/`;
      const result = createLoginURL(input);
      expect(result).toEqual(expected);
    });
    test('page with a URL parameter', () => {
      const expected = `${EGO_URL}&redirect_uri=${location.origin}/repository%3Ffilters%3D%257B%22content%22%253A%255B%255D%252C%22op%22%253A%22and%22%257D%26isOauth%3Dtrue`;
      const input = `/repository?filters=%7B"content"%3A%5B%5D%2C"op"%3A"and"%7D`;
      const result = createLoginURL(input);
      expect(result).toEqual(expected);
    });
    test('entity page', () => {
      const fakeUuid = '1fd44f4e-5797-11ec-bf63-0242ac130002';
      const expected = `${EGO_URL}&redirect_uri=${location.origin}/file%2F${fakeUuid}%3FisOauth%3Dtrue`;
      const input = `/file/${fakeUuid}`;
      const result = createLoginURL(input);
      expect(result).toEqual(expected);
    });
  });
});
