/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { setupWorker } from 'msw/browser';
import {
  myPlaylistThumbnail,
  likePlaylistThumbnail,
  addPlaylist,
  playlistHandlers,
  getMyPlaylists,
} from './handlers/playlistHandlers';
import { handlers } from './handlers/musicbarHandlers';
import { chartHandlers } from './handlers/chartHandlers';
import { uploadmymusichandlers } from './handlers/uploadmymusicHandlers';
import {
  genrehandlers,
  genreBooleanhandlers,
  takemygenrehandlers,
} from './handlers/genreHandlers';
import { searchHandlers } from './handlers/searchHandlers';

export const worker = setupWorker(
  ...chartHandlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
  ...uploadmymusichandlers,
  ...handlers,
  ...searchHandlers,
  ...playlistHandlers,
  ...myPlaylistThumbnail,
  ...likePlaylistThumbnail,
  ...addPlaylist,
  ...getMyPlaylists,
);
