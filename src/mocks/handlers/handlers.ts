/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/v1/charts', () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        tracks: [
          {
            track_id: 1,
            rank: 1,
            title: 'Track Title 1',
            uploader_name: 'Uploader 1',
            thumbnail_image: 'url/to/thumbnail1.com',
          },
          {
            track_id: 2,
            rank: 2,
            title: 'Track Title 2',
            uploader_name: 'Uploader 2',
            thumbnail_image: 'url/to/thumbnail2.com',
          },
          {
            track_id: 3,
            rank: 3,
            title: 'Track Title 3',
            uploader_name: 'Uploader 3',
            thumbnail_image: 'url/to/thumbnail3.com',
          },
        ],
        page_info: {
          page: 0,
          size: 10,
          total_elements: 50,
          total_pages: 5,
        },
      },
      message: 'Charts retrieved successfully.',
    });
  }),
];
