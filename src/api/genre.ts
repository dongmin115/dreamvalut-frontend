/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */

import { getCookie } from '@/app/Cookies.tsx';
import { Genre } from '@/types/genre';
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

// 장르 정보 가져오기
const getUserGenres = async (setGenres: any, setSelectedGenreIds: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/preference?page=0&size=16`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    setGenres(response.data.content);

    // 선택된 장르 초기 ID 배열 생성
    const initialSelectedGenres = response.data.content
      .filter((genre: Genre) => genre.state)
      .map((genre: Genre) => genre.genre_id);

    setSelectedGenreIds(initialSelectedGenres);

    return response.data;
  } catch (error) {
    console.error('오류 발생', error);
  }
};

const patchUser = async (name: string, genreId: number[]) => {
  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users`, // API 엔드포인트
      {
        display_name: name,
        genre_ids: genreId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (error) {
    console.error('장르 선택 실패:', error);
  }
};

export { getUserGenres, fetchGenres, patchUser };
