/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */

import { getCookie } from '@/app/Cookies.tsx';
import axios from 'axios';

const accessToken = getCookie('accessToken');
// 모든 장르 데이터 가져오기
const fetchGenres = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/genres/list`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response) {
      return response.data; // 장르 데이터 반환
    }
  } catch (error) {
    console.error('오류 발생', error);
  }
};

// 내 장르 취향 가져오기
const EditfetchGenres = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/preference`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const genresData = response.data.data.genres;
    return genresData; // 장르 데이터 반환
  } catch (error) {
    console.error('오류 발생', error);
  }
};

export { EditfetchGenres, fetchGenres };
