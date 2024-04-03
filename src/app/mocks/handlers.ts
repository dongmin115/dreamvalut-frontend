/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';

// 가상 데이터
export const handlers = [
  http.get('/api/v1/genres/list', () => {
    return HttpResponse.json({
      status: 'success',
      data: [
        {
          genre_id: 1,
          genre_name: 'Pop',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 2,
          genre_name: 'Rock',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 3,
          genre_name: 'Jazz',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 4,
          genre_name: 'Ballade',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 5,
          genre_name: 'Classical',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 6,
          genre_name: 'Rock',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 7,
          genre_name: 'Hip-Hap',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 8,
          genre_name: 'Folk',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 9,
          genre_name: 'OST',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 10,
          genre_name: 'J-Pop',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 11,
          genre_name: 'Musical',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
        {
          genre_id: 12,
          genre_name: 'EDM',
          genre_image: 'https://i.ibb.co/Bq4w6f9/Folk.png',
        },
      ],
      message: 'List of genres retrieved successfully.',
    });
  }),
];
