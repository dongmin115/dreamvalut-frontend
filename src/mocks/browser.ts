/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/handlers';

export const worker = setupWorker(...handlers);
