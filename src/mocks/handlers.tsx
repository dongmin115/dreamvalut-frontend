/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://api.example.com/api/user', () =>
    HttpResponse.json({
      data: {
        name: 'handongryong',
        age: 25,
      },
    }),
  ),
];
