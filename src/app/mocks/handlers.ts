/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/v1/tracks/track_id', () => {
// 장르페이지-모든 장르 리스트 가져오기
export const genrehandlers = [
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
          genre_name: 'R&B',
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

// 장르페이지-내 장르 취향 설정하기
const genre_ids: number[] = [];

export const genreBooleanhandlers = [
  http.post('/api/v1/users/preference', () => {
    return HttpResponse.json({
      status: 'success',
      data: [
        {
          genre_ids,
        },
      ],
    });
  }),
];

// 마이페이지-내 장르 취향 가져오기
export const takemygenrehandlers = [
  http.get('/api/v1/users/preference', () => {
    return HttpResponse.json({
      status: 'success',
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
        genres: [
          {
            genre_id: 1,
            genre_name: 'Pop',
            state: false,
          },
          {
            genre_id: 2,
            genre_name: 'R&B',
            state: false,
          },
          {
            genre_id: 3,
            genre_name: 'Jazz',
            state: false,
          },
          {
            genre_id: 4,
            genre_name: 'Ballade',
            state: false,
          },
          {
            genre_id: 5,
            genre_name: 'Classical',
            state: false,
          },
          {
            genre_id: 6,
            genre_name: 'Rock',
            state: false,
          },
          {
            genre_id: 7,
            genre_name: 'Hip-Hap',
            state: false,
          },
          {
            genre_id: 8,
            genre_name: 'Folk',
            state: false,
          },
          {
            genre_id: 9,
            genre_name: 'OST',
            state: false,
          },
          {
            genre_id: 10,
            genre_name: 'J-Pop',
            state: false,
          },

          {
            genre_id: 11,
            genre_name: 'Musical',
            state: false,
          },
          {
            genre_id: 12,
            genre_name: 'EDM',
            state: false,
          },
        ],
      },
      message: 'User preferences retrieved successfully.',
    });
  }),
];

// 마이페이지 - 내 장르취향 변경하기
export const changegenrenhandlers = [
  http.put('/api/v1/users/preference', () => {
    return HttpResponse.json({
      status: 'success',
      data: [
        {
          genre_ids,
        },
      ],
    });
  }),
];
