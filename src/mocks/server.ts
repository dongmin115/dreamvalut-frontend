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
import {
  myPlaylistThumbnail,
  likePlaylistThumbnail,
  addPlaylist,
  getMyPlaylists,
  followPlaylistData,
  getRecentList,
  popularTagsData,
} from './handlers/playlistHandlers';
import { searchHandlers } from './handlers/searchHandlers';
import { AddLikeData, CancelLikeData } from './handlers/likeHandler';

export const server = setupServer(
  ...handlers,
  ...chartHandlers,
  ...genrehandlers,
  ...genreBooleanhandlers,
  ...takemygenrehandlers,
  ...searchHandlers,
  ...uploadmymusichandlers,
  ...myPlaylistThumbnail,
  ...likePlaylistThumbnail,
  ...addPlaylist,
  ...getMyPlaylists,
  ...followPlaylistData,
  ...getRecentList,
  ...popularTagsData,
  ...AddLikeData,
  ...CancelLikeData,
);
