/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { HttpResponse, http } from 'msw';

// 나만의 음악 등록 페이지 - 특정 곡 등록하기
export const uploadmymusichandlers = [
  http.post('/api/v1/tracks', () =>
    HttpResponse.json({
      status: 'success',
      data: {
        track_id: 123,
        title: 'Sunset Boulevard',
        duration: 120,
        has_lyrics: true,
        track_url: 'url/to/track/audio.mp3',
        track_image: 'url/to/track/image.png',
        thumbnail_image: 'url/to/track/image.png',
      },
      message: 'Track uploaded successfully.',
    }),
  ),
];
