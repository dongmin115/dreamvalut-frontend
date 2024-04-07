/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { HttpResponse, http } from 'msw';

// 나만의 음악 등록 페이지 - 특정 곡 등록하기
export const uploadmymusichandlers = [
  http.post('/api/v1/tracks', () =>
    HttpResponse.json({
      track_info: {
        title: 'Sunset Boulevard',
        prompt:
          'Inspired by a sunset along the coast, bringing a serene end to a bustling day.',
        has_lyrics: true,
        tags: ['chill', 'sunset', 'electronic'],
        genre_id: 1,
      },
      track_image: 'image_file.jpg',
      track_audio: 'track_file.jpg',
    }),
  ),
];
