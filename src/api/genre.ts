/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable consistent-return */

import { Genre } from '@/types/genre.ts';
import api from './axios_interceptor.ts';

// 모든 장르 데이터 가져오기
export const fetchGenres = async () => {
  try {
    const response = await api.get('/genres/list');

    if (response) {
      return response.data; // 장르 데이터 반환
    }
  } catch (error) {
    console.error('오류 발생', error);
  }
};

// 장르 정보 가져오기
export const getUserGenres = async (
  setGenres: any,
  setSelectedGenreIds: any,
) => {
  try {
    const response = await api.get('/users/preference?page=0&size=15');

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

export const patchUser = async (name: string, genreId: number[]) => {
  try {
    await api.patch(
      '/users', // API 엔드포인트
      {
        display_name: name,
        genre_ids: genreId,
      },
    );
  } catch (error) {
    console.error('장르 선택 실패:', error);
  }
};

export const postGenreTaste = async (genreIds: number[]) => {
  console.log('genreIds:', genreIds);
  try {
    const response = await api.post('/users/preference', {
      genre_ids: genreIds,
    });
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error navigating to next page:', error);
  }
};
