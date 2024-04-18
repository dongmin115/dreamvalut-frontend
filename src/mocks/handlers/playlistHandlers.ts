/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */

import { HttpResponse, http } from 'msw';

// 플레이리스트 추가
export const addPlaylist = [
  http.post('/api/v1/playlists', ({ request }) =>
    HttpResponse.json({
      playlist_id: 7,
      playlist_name: request,
      is_public: false,
      is_curated: false,
    }),
  ),
];

// 좋아요 누른 플레이리스트 썸네일 데이터 가져오기
export const likePlaylistThumbnail = [
  http.get('/api/v1/users/liked', () =>
    HttpResponse.json({
      status: 'success',
      data: {
        thumbnails: [
          'https://i.ibb.co/HgFcPLj/getaguitar.webp',
          'https://i.ibb.co/TbQL5kz/thatthat.jpg',
        ],
      },
      message: 'Thumbnails of user liked tracks retrieved successfully.',
    }),
  ),
];

// 나의 플레이리스트 썸네일 데이터 가져오기
export const myPlaylistThumbnail = [
  http.get('/api/v1/users/playlists/created', () =>
    HttpResponse.json({
      status: 'success',
      data: {
        playlists: [
          {
            playlist_id: 1,
            playlist_name: 'K-Pop Hits',
            thumbnails: [
              'https://i.ibb.co/yyDxwy2/image.png',
              'https://i.ibb.co/kxXMzJw/image.png',
              'https://i.ibb.co/JmcQcQx/image.png',
            ],
            created_at: '2024-02-10T11:20:00Z',
          },
          {
            playlist_id: 2,
            playlist_name: 'Chill Vibes',
            thumbnails: [
              'https://i.ibb.co/fprvy6W/image.png',
              'https://i.ibb.co/5FCZZxV/image.png',
              'https://i.ibb.co/r5mz6CW/image.png',
            ],
            created_at: '2024-02-09T11:20:00Z',
          },
          {
            playlist_id: 3,
            playlist_name: 'Party Mix',
            thumbnails: [
              'https://i.ibb.co/crQW4Cc/image.png',
              'https://i.ibb.co/6tDNRqn/image.png',
              'https://i.ibb.co/z22qCzv/image.png',
            ],
            created_at: '2024-02-08T11:20:00Z',
          },
          {
            playlist_id: 4,
            playlist_name: 'Relaxing Sounds',
            thumbnails: [
              'https://i.ibb.co/5WXYCf9/image.png',
              'https://i.ibb.co/tQ1624m/image.png',
              'https://i.ibb.co/Jzdn2SN/image.png',
            ],
            created_at: '2024-02-07T11:20:00Z',
          },
          {
            playlist_id: 5,
            playlist_name: 'Road Trip Mix',
            thumbnails: [
              'https://i.ibb.co/5sY7Fsc/image.png',
              'https://i.ibb.co/2vDypYD/image.png',
              'https://i.ibb.co/F8zNPJ4/image.png',
            ],
            created_at: '2024-02-06T11:20:00Z',
          },
          {
            playlist_id: 6,
            playlist_name: 'Study Session',
            thumbnails: [
              'https://i.ibb.co/jrntRHJ/image.png',
              'https://i.ibb.co/qsZ4TBk/image.png',
              'https://i.ibb.co/zWd5F8H/image.png',
            ],
            created_at: '2024-02-05T11:20:00Z',
          },
          {
            playlist_id: 7,
            playlist_name: 'Morning Motivation',
            thumbnails: [
              'https://i.ibb.co/ThpD5fX/image.png',
              'https://i.ibb.co/vZYNDVN/image.png',
              'https://i.ibb.co/rZwTCSS/image.png',
            ],
            created_at: '2024-02-04T11:20:00Z',
          },
          {
            playlist_id: 8,
            playlist_name: 'Late Night Jams',
            thumbnails: [
              'https://i.ibb.co/fkx9pJ7/image.png',
              'https://i.ibb.co/Qv6b7VD/image.png',
              'https://i.ibb.co/hRFgHmn/image.png',
            ],
            created_at: '2024-02-03T11:20:00Z',
          },
          {
            playlist_id: 9,
            playlist_name: 'Feel Good Favorites',
            thumbnails: [
              'https://i.ibb.co/Y3ZRLhT/image.png',
              'https://i.ibb.co/L5V8B8K/image.png',
              'https://i.ibb.co/w7jryfh/image.png',
            ],
            created_at: '2024-02-02T11:20:00Z',
          },
          {
            playlist_id: 10,
            playlist_name: 'Throwback Hits',
            thumbnails: [
              'https://i.ibb.co/hRFgHmn/image.png',
              'https://i.ibb.co/dJ5FLbm/image.png',
              'https://i.ibb.co/5FCZZxV/image.png',
            ],
            created_at: '2024-02-01T11:20:00Z',
          },
        ],
        page_info: {
          page: 0,
          size: 4,
          total_elements: 20,
          total_pages: 5,
        },
      },
      message: 'User playlists retrieved successfully.',
    }),
  ),
];

export const followPlaylistData = [
  http.get('/api/v1/users/playlists/followed', () =>
    HttpResponse.json({
      status: 'success',
      data: {
        playlists: [
          {
            playlist_id: 1,
            playlist_name: 'K-Pop Hits',
            thumbnails: [
              'https://i.ibb.co/yyDxwy2/image.png',
              'https://i.ibb.co/kxXMzJw/image.png',
              'https://i.ibb.co/JmcQcQx/image.png',
            ],
            created_at: '2024-02-10T11:20:00Z',
          },
          {
            playlist_id: 2,
            playlist_name: 'Chill Vibes',
            thumbnails: [
              'https://i.ibb.co/fprvy6W/image.png',
              'https://i.ibb.co/5FCZZxV/image.png',
              'https://i.ibb.co/r5mz6CW/image.png',
            ],
            created_at: '2024-02-09T11:20:00Z',
          },
          {
            playlist_id: 3,
            playlist_name: 'Party Mix',
            thumbnails: [
              'https://i.ibb.co/crQW4Cc/image.png',
              'https://i.ibb.co/6tDNRqn/image.png',
              'https://i.ibb.co/z22qCzv/image.png',
            ],
            created_at: '2024-02-08T11:20:00Z',
          },
          {
            playlist_id: 4,
            playlist_name: 'Relaxing Sounds',
            thumbnails: [
              'https://i.ibb.co/5WXYCf9/image.png',
              'https://i.ibb.co/tQ1624m/image.png',
              'https://i.ibb.co/Jzdn2SN/image.png',
            ],
            created_at: '2024-02-07T11:20:00Z',
          },
          {
            playlist_id: 5,
            playlist_name: 'Road Trip Mix',
            thumbnails: [
              'https://i.ibb.co/5sY7Fsc/image.png',
              'https://i.ibb.co/2vDypYD/image.png',
              'https://i.ibb.co/F8zNPJ4/image.png',
            ],
            created_at: '2024-02-06T11:20:00Z',
          },
          {
            playlist_id: 6,
            playlist_name: 'Study Session',
            thumbnails: [
              'https://i.ibb.co/jrntRHJ/image.png',
              'https://i.ibb.co/qsZ4TBk/image.png',
              'https://i.ibb.co/zWd5F8H/image.png',
            ],
            created_at: '2024-02-05T11:20:00Z',
          },
          {
            playlist_id: 7,
            playlist_name: 'Morning Motivation',
            thumbnails: [
              'https://i.ibb.co/ThpD5fX/image.png',
              'https://i.ibb.co/vZYNDVN/image.png',
              'https://i.ibb.co/rZwTCSS/image.png',
            ],
            created_at: '2024-02-04T11:20:00Z',
          },
          {
            playlist_id: 8,
            playlist_name: 'Late Night Jams',
            thumbnails: [
              'https://i.ibb.co/fkx9pJ7/image.png',
              'https://i.ibb.co/Qv6b7VD/image.png',
              'https://i.ibb.co/hRFgHmn/image.png',
            ],
            created_at: '2024-02-03T11:20:00Z',
          },
          {
            playlist_id: 9,
            playlist_name: 'Feel Good Favorites',
            thumbnails: [
              'https://i.ibb.co/Y3ZRLhT/image.png',
              'https://i.ibb.co/L5V8B8K/image.png',
              'https://i.ibb.co/w7jryfh/image.png',
            ],
            created_at: '2024-02-02T11:20:00Z',
          },
          {
            playlist_id: 10,
            playlist_name: 'Throwback Hits',
            thumbnails: [
              'https://i.ibb.co/hRFgHmn/image.png',
              'https://i.ibb.co/dJ5FLbm/image.png',
              'https://i.ibb.co/5FCZZxV/image.png',
            ],
            created_at: '2024-02-01T11:20:00Z',
          },
        ],
        page_info: {
          page: 0,
          size: 6,
          total_elements: 15,
          total_pages: 3,
        },
      },
      message: 'Followed playlists retrieved successfully.',
    }),
  ),
];

// 인기 태그 데이터 가져오기
export const popularTagsData0 = [
  http.get('/api/v1/tags/list?page=0', () =>
    HttpResponse.json({
      content: [
        {
          tag_id: 1,
          tag_name: 'Chill',
          tag_image: 'https://i.ibb.co/yyDxwy2/image.png',
        },
        {
          tag_id: 2,
          tag_name: 'Energetic',
          tag_image: 'https://i.ibb.co/kxXMzJw/image.png',
        },
        {
          tag_id: 3,
          tag_name: 'Happy',
          tag_image: 'https://i.ibb.co/JmcQcQx/image.png',
        },
        {
          tag_id: 4,
          tag_name: 'Sad',
          tag_image: 'https://i.ibb.co/fprvy6W/image.png',
        },
        {
          tag_id: 5,
          tag_name: 'Angry',
          tag_image: 'https://i.ibb.co/5FCZZxV/image.png',
        },
        {
          tag_id: 6,
          tag_name: 'Relaxing',
          tag_image: 'https://i.ibb.co/r5mz6CW/image.png',
        },
      ],
      pageable: {
        page_number: 0,
        page_size: 6,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      total_pages: 3,
      total_elements: 15,
      last: false,
      first: true,
      number_of_elements: 6,
      size: 6,
      number: 0,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      empty: false,
    }),
  ),
];

export const popularTagsData1 = [
  http.get('api/v1/tags/list?page=1', () =>
    HttpResponse.json({
      content: [
        {
          tag_id: 7,
          tag_name: 'Hip Hop',
          tag_image: 'https://i.ibb.co/crQW4Cc/image.png',
        },
        {
          tag_id: 8,
          tag_name: 'Pop',
          tag_image: 'https://i.ibb.co/6tDNRqn/image.png',
        },
        {
          tag_id: 9,
          tag_name: 'IU',
          tag_image: 'https://i.ibb.co/z22qCzv/image.png',
        },
        {
          tag_id: 10,
          tag_name: 'BTS',
          tag_image: 'https://i.ibb.co/5WXYCf9/image.png',
        },
        {
          tag_id: 11,
          tag_name: 'Drive',
          tag_image: 'https://i.ibb.co/tQ1624m/image.png',
        },
        {
          tag_id: 12,
          tag_name: 'Study',
          tag_image: 'https://i.ibb.co/Jzdn2SN/image.png',
        },
      ],
      pageable: {
        page_number: 1,
        page_size: 6,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        offset: 6,
        paged: true,
        unpaged: false,
      },
      total_pages: 3,
      total_elements: 15,
      last: false,
      first: false,
      number_of_elements: 6,
      size: 6,
      number: 1,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      empty: false,
    }),
  ),
];
export const popularTagsData2 = [
  http.get('api/v1/tags/list?page=2', () =>
    HttpResponse.json({
      content: [
        {
          tag_id: 13,
          tag_name: 'Rock',
          tag_image: 'https://i.ibb.co/fkx9pJ7/image.png',
        },
        {
          tag_id: 14,
          tag_name: 'Jazz',
          tag_image: 'https://i.ibb.co/Qv6b7VD/image.png',
        },
        {
          tag_id: 15,
          tag_name: 'Classical',
          tag_image: 'https://i.ibb.co/rZwTCSS/image.png',
        },
        {
          tag_id: 16,
          tag_name: 'Sad',
          tag_image: 'https://i.ibb.co/ThpD5fX/image.png',
        },
        {
          tag_id: 17,
          tag_name: 'EDM',
          tag_image: 'https://i.ibb.co/vZYNDVN/image.png',
        },
        {
          tag_id: 18,
          tag_name: 'J',
          tag_image: 'https://i.ibb.co/Y3ZRLhT/image.png',
        },
      ],
      pageable: {
        page_number: 2,
        page_size: 6,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        offset: 12,
        paged: true,
        unpaged: false,
      },
      total_pages: 3,
      total_elements: 15,
      last: true,
      first: false,
      number_of_elements: 3,
      size: 3,
      number: 2,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      empty: false,
    }),
  ),
];

// 특정 플레이리스트 정보 가져오기
export const playlistHandlers = [
  http.get('/api/v1/playlists/playlist_id', () =>
    HttpResponse.json({
      playlist_id: 1,
      playlist_name: 'Chill Vibes',
      is_public: true,
      is_curated: false,
      owner_name: 'Default Display',
      tracks: {
        content: [
          {
            track_id: 5,
            title: 'Pop Track 5',
            uploader_name: 'Default Display',
            duration: 220,
            has_lyrics: true,
            track_url: 'http://trackurl5.com',
            track_image: 'http://trackimage5.com',
            thumbnail_image: 'http://thumbnail5.com',
            prompt: 'Prompt for Pop Track 5',
          },
          {
            track_id: 4,
            title: 'Pop Track 4',
            uploader_name: 'Default Display',
            duration: 190,
            has_lyrics: false,
            track_url: 'http://trackurl4.com',
            track_image: 'http://trackimage4.com',
            thumbnail_image: 'http://thumbnail4.com',
            prompt: 'Prompt for Pop Track 4',
          },
          {
            track_id: 3,
            title: 'Pop Track 3',
            uploader_name: 'Default Display',
            duration: 200,
            has_lyrics: true,
            track_url: 'http://trackurl3.com',
            track_image: 'http://trackimage3.com',
            thumbnail_image: 'http://thumbnail3.com',
            prompt: 'Prompt for Pop Track 3',
          },
          {
            track_id: 2,
            title: 'Pop Track 2',
            uploader_name: 'Default Display',
            duration: 180,
            has_lyrics: false,
            track_url: 'http://trackurl2.com',
            track_image: 'http://trackimage2.com',
            thumbnail_image: 'http://thumbnail2.com',
            prompt: 'Prompt for Pop Track 2',
          },
          {
            track_id: 1,
            title: 'Pop Track 1',
            uploader_name: 'Default Display',
            duration: 210,
            has_lyrics: true,
            track_url: 'http://trackurl1.com',
            track_image: 'http://trackimage1.com',
            thumbnail_image: 'http://thumbnail1.com',
            prompt: 'Prompt for Pop Track 1',
          },
        ],
        pageable: {
          page_number: 0,
          page_size: 30,
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        total_pages: 1,
        total_elements: 5,
        last: true,
        first: true,
        number_of_elements: 5,
        size: 30,
        number: 0,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        empty: false,
      },
    }),
  ),
];

// 나의 플레이리스트 + 팔로우한 플레이리스트 가져오기
export const getMyPlaylists = [
  http.get('/api/v1/users/playlists/list', () =>
    HttpResponse.json({
      status: 'success',
      data: {
        playlists: [
          {
            playlist_id: 1,
            playlist_name: 'Followed Playlist 1',
            is_public: true,
            is_curated: true,
          },
          {
            playlist_id: 2,
            playlist_name: 'My Playlist 1',
            is_public: false,
            is_curated: false,
          },
        ],
        page_info: {
          page: 0,
          size: 6,
          total_elements: 15,
          total_pages: 3,
        },
      },
      message: 'Followed playlists retrieved successfully.',
    }),
  ),
];

// 최근 감상한 곡 가져오기
export const getRecentList = [
  http.get('/api/v1/users/tracks/played', () =>
    HttpResponse.json({
      status: 'success',
      data: {
        tracks: [
          {
            track_id: 101,
            title: 'Summer Vibes',
            uploader_name: 'DJ Sunny',
            duration: 120,
            has_lyrics: false,
            track_url: 'url/to/track/audio.mp3',
            track_image: 'url/to/image.png',
            thumbnail_image: 'url/to/track/thumbnail1.com',
            prompt: 'This is the prompt how this track was made...',
          },
          {
            track_id: 102,
            title: 'Night Drive',
            uploader_name: 'DJ Moon',
            duration: 120,
            has_lyrics: false,
            track_url: 'url/to/track/audio.mp3',
            track_image: 'url/to/image.png',
            thumbnail_image: 'url/to/track/thumbnail2.com',
            prompt: 'This is the prompt how this track was made...',
          },
          // Additional tracks...
        ],
        page_info: {
          page: 0,
          size: 12,
          total_elements: 50,
          total_pages: 5,
        },
      },
      message: 'User played tracks retrieved successfully.',
    }),
  ),
];
