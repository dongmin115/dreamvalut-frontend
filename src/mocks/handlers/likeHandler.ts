/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { HttpResponse, http } from 'msw';

// 장르페이지-모든 장르 리스트 가져오기
export const AddLikeData = [
  http.post('/api/v1/tracks/114/likes', ({ request }) =>
    HttpResponse.json({
      status: 'success',
      message: 'Track liked successfully.',
      id: 2,
      user_id: 2,
      track_id: 1,
      request,
    }),
  ),
];

export const CancelLikeData = [
  http.delete('/api/v1/tracks/114/likes', ({ request }) =>
    HttpResponse.json({
      status: 'success',
      message: 'Like added successfully.',
      request,
    }),
  ),
];
