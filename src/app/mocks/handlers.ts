/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://api.example.com/api/user', () => {
    return HttpResponse.json({
      data: {
        name: 'handongryong',
        age: 25,
      },
    });
  }),
];
