/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosResponse } from 'axios';
import error from 'next/error';
import { useState } from 'react';
import { Genre } from '../types/edit_genre.ts';

const [genres, setGenres] = useState<Genre[]>([]);

const fetchGenres = async () => {
  try {
    // GET 요청을 보냅니다.
    const response: AxiosResponse<any> = await axios.get(
      '/api/v1/users/preference',
    );
    // 응답 데이터에서 장르 정보를 추출합니다.
    const genresData: Genre[] = response.data.data.genres;
    // 장르 정보를 설정합니다.
    setGenres(genresData);
  } catch (err) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export default fetchGenres;
