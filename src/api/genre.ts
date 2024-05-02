/* eslint-disable consistent-return */

import { getCookie } from '@/app/Cookies';
import axios from 'axios';

// 모든 장르 데이터 가져오기
const fetchGenres = async () => {
  try {
    const accessToken = await getCookie('accessToken');
    const refreshToken = await getCookie('refreshToken');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/genres/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-refresh-token': refreshToken,
        },
      },
    );
    if (response) {
      return response.data; // 장르 데이터 반환
    }
  } catch (error) {
    console.error('오류 발생', error);
    throw new Error('API 호출 중 오류 발생');
  }
};

// 내 장르 취향 가져오기
const EditfetchGenres = async () => {
  try {
    // 실제 서버 대신 msw의 모의 서버로 요청을 보냅니다.
    const response = await axios.get('/api/v1/users/preference');
    const genresData = response.data.data.genres;
    return genresData; // 장르 데이터 반환
  } catch (error) {
    console.error('오류 발생', error);
    throw new Error('API 호출 중 오류 발생');
  }
};

export { EditfetchGenres, fetchGenres };
