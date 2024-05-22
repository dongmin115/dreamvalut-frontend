/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable consistent-return */

import { getCookie } from '@/app/Cookies.tsx';
// import axios from 'axios';
import refreshapi from './axios_interceptor.ts';

const accessToken = getCookie('accessToken');
// 모든 장르 데이터 가져오기
export const fetchGenres = async () => {
  try {
    const response = await refreshapi.get(
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
export const EditfetchGenres = async () => {
  try {
    const response = await refreshapi.get(
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

export const postGenreTaste = async (genreIds: number[]) => {
  console.log('genreIds:', genreIds);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/preference`,
      { genre_ids: genreIds },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error navigating to next page:', error);
  }
};
