import { css } from '@emotion/core';

export default {
  title: 'Exclamation Mark',
  viewBox: '0 0 20 20',
  pathDefinitions: [
    {
      d: 'M0 0h20v20H0z',
      fill: '#D0D1D8',
    },
    {
      d:
        'M9.803 14.444C8.255 14.444 7 15.688 7 17.222 7 18.757 8.255 20 9.803 20c1.549 0 2.804-1.243 2.804-2.778 0-1.534-1.255-2.778-2.804-2.778M9.803 0C8.255 0 7 1.244 7 2.778l.56 8.333a2.233 2.233 0 0 0 2.243 2.222 2.233 2.233 0 0 0 2.243-2.222l.56-8.333C12.607 1.244 11.353 0 9.804 0',
      fill: '#FFF',
    },
  ],
  css: css`
    height: 20px;
    width: 20px;
  `,
};
