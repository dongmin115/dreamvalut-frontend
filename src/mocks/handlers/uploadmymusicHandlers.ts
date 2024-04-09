/* eslint-disable camelcase */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { HttpResponse, http } from 'msw';

const title: string = '';
const prompt: string = '';
const has_lyrics: boolean = false;
const tags: string[] = [];
const genre_id: number = 0;
const track_image: File | null = null;
const track_audio: File | null = null;

// 나만의 음악 등록 페이지 - 특정 곡 등록하기
export const uploadmymusichandlers = [
  http.post('/api/v1/tracks', () =>
    HttpResponse.json({
      track_info: {
        title,
        prompt,
        has_lyrics,
        tags,
        genre_id,
      },
      track_image,
      track_audio,
    }),
  ),
];
