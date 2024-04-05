/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

import axios from 'axios';

const MAX_RETRY_COUNT = 5; // 재시도 횟수 상수 설정
const RETRY_INTERVAL = 1000; // 재시도 간격(ms) 상수 설정
let retryCount = 0; // 재시도 횟수 초기화

// 모든 장르 데이터 가져오기
const fetchGenres = async () => {
  while (retryCount < MAX_RETRY_COUNT) {
    try {
      const response = await axios.get('/api/v1/genres/list');
      if (response.data) {
        return response.data.data; // 장르 데이터 반환
      }
    } catch (error) {
      console.error(`재시도 ${retryCount + 1}번: 오류 발생`, error);
      retryCount++; // 재시도 횟수 증가
      await new Promise((resolve) => {
        setTimeout(resolve, RETRY_INTERVAL);
      }); // 재시도 간격만큼 대기
    }
  }

  throw new Error(`최대 재시도 횟수(${MAX_RETRY_COUNT})를 초과하여 요청 실패`);
};

// 내 장르 취향 가져오기
const EditfetchGenres = async () => {
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

export { EditfetchGenres, fetchGenres };
