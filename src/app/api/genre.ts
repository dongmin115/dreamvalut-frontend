/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Genre, GenreData } from '../types/genre.ts';

const fetchGenres = async () => {
  interface Response {
    // API 응답을 정의하는 TypeScript 인터페이스입니다.
    data: GenreData[];
  }
  try {
    const response = await axios.get<Response>('/api/v1/genres/list'); // 변경: Response 타입 지정
    return response.data.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

const EditfetchGenres = async () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  try {
    // GET 요청을 보냅니다.
    const response: AxiosResponse<any> = await axios.get(
      '/api/v1/users/preference',
    );
    // 응답 데이터에서 장르 정보를 추출합니다.
    const genresData: Genre[] = response.data.data.genres;
    // 장르 정보를 설정합니다.
    setGenres(genresData);
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export { EditfetchGenres, fetchGenres };
