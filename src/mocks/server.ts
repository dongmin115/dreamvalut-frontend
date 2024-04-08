/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupServer } from 'msw/node';
import { chartHandlers } from './handlers/chartHandlers';
import {
  handlers,
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
} from './handlers/handlers';
import { searchHandlers } from './handlers/search';

export const server = setupServer(
  ...handlers,
  ...chartHandlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
  ...searchHandlers,
);
