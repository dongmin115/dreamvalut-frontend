/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/v1/tracks/track_id', () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        track_id: 1,
        title: 'Dreamscape',
        uploader_name: 'Uploader 1',
        has_lyrics: false,
        track_url: 'url/to/track/audio.mp3',
        track_image: 'url/to/image.png',
        thumbnail_image: 'url/to/thumbnail.png',
        prompt: 'This is the prompt how this track was made...',
      },
      message: 'Track information retrieved successfully.',
    });
  }),
];
