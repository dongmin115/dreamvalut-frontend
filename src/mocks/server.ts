/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupServer } from 'msw/node';
import { chartHandlers } from './handlers/chartHandlers';
import { handlers } from './handlers/musicbarHandlers';
import { uploadmymusichandlers } from './handlers/uploadmymusicHandlers';
import {
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
} from './handlers/genreHandlers';

export const server = setupServer(
  ...chartHandlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
  ...uploadmymusichandlers,
  ...handlers,
);
