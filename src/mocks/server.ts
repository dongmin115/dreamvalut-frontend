/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupServer } from 'msw/node';
import { handlers } from './handlers/handlers';
import { chartHandlers } from './handlers/chartHandlers';

export const server = setupServer(...handlers, ...chartHandlers);
