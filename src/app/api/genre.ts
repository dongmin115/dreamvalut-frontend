/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Genre, GenreData } from '../types/genre.ts';

const fetchGenres = async () => {
  const [retryCount, setRetryCount] = useState(0);
  const [genres, setGenres] = useState<GenreData[]>([]); // 변경: genres 상태 타입 수정
  try {
    const response = await axios.get('/api/v1/genres/list'); // 변경: Response 타입 지정
    if (response.data) {
      setGenres(response.data.data); // 장르 데이터 설정
    }
  } catch (error) {
    console.error('오류 발생:', error);
    if (retryCount < 5) {
      // 다섯 번 이하로 재시도
      setRetryCount(retryCount + 1); // 재시도 횟수 증가
    } else {
      throw new Error('API 호출이 여러 번 실패했습니다.');
    }
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
