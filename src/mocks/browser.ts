/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-multiple-empty-lines

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
worker.start({
  serviceWorker: {
    // `mockServiceWorker.js`가 생기는 위치
    url: 'C:Users\bowgidreamvalut-frontendpublicmockServiceWorker.js',
    options: {
      // `/m/mtn`이하 페이지로 scope를 제한
      scope: './',
    },
  },
});
