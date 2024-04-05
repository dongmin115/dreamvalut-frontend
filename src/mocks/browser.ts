/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupWorker } from 'msw/browser';

import { chartHandlers } from './handlers/chartHandlers';
import {
  handlers,
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
} from './handlers/handlers';

export const worker = setupWorker(
  ...handlers,
  ...chartHandlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
);
