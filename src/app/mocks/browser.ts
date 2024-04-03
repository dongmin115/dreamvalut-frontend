/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupWorker } from 'msw/browser';
import {
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
  changegenrenhandlers,
} from './handlers';

// 브라우저에서 API mocking을 활성화할 수 있도록 클라이언트-작업자 간 통신을 준비한다.
export const worker = setupWorker(
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
  ...changegenrenhandlers,
);
