/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/musicbarHandlers';
import { chartHandlers } from './handlers/chartHandlers';
import { uploadmymusichandlers } from './handlers/uploadmymusicHandlers';
import {
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
} from './handlers/handlers';
import { searchHandlers } from './handlers/search';

export const worker = setupWorker(
  ...chartHandlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
  ...uploadmymusichandlers,
  ...handlers,
  ...searchHandlers,
);
