/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Genre, GenreData } from '../types/genre.ts';

// const fetchGenres = async () => {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   try {
//     const response = await axios.get('/api/v1/genres/list'); // 변경: Response 타입 지정
//     if (response.data) {
//       setGenres(response.data.data); // 장르 데이터 설정
//     }
//   } catch (error) {
//     console.error('오류 발생:', error);
//     if (retryCount < 5) {
//       // 다섯 번 이하로 재시도
//       setRetryCount(retryCount + 1); // 재시도 횟수 증가
//     } else {
//       throw new Error('API 호출이 여러 번 실패했습니다.');
//     }
//   }
// };
const MAX_RETRY_COUNT = 5; // 재시도 횟수 상수 설정
const RETRY_INTERVAL = 1000; // 재시도 간격(ms) 상수 설정

const EditfetchGenres = async () => {
  let retryCount = 0; // 재시도 횟수 초기화

  while (retryCount < MAX_RETRY_COUNT) {
    try {
      // 실제 서버 대신 msw의 모의 서버로 요청을 보냅니다.
      const response = await axios.get('/api/v1/users/preference');
      const genresData = response.data.data.genres;
      return genresData; // 장르 데이터 반환
    } catch (error) {
      console.error(`재시도 ${retryCount + 1}번: 오류 발생`, error);
      retryCount++; // 재시도 횟수 증가
      await new Promise((resolve) => {
        setTimeout(resolve, RETRY_INTERVAL);
      }); // 재시도 간격만큼 대기
    }
  }

  throw new Error(`최대 재시도 횟수(${MAX_RETRY_COUNT})를 초과하여 요청 실패`); // 최대 재시도 횟수를 초과하면 에러 발생
};
export default EditfetchGenres;
