/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({
      success: true,
      message: '성공입니다~',
    });
  }),
];
