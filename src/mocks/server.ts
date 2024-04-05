/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupServer } from 'msw/node';
import {
  handlers,
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
} from './handlers';

// 개발 환경에서만 MSW를 활성화합니다.
export const server = setupServer(
  ...handlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
);
