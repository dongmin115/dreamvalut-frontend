/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { Cookies } from 'react-cookie';

// 쿠키 인스턴스 생성
const cookies = new Cookies();

// Axios 인스턴스 생성
const refreshapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 인터셉터 추가
refreshapi.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// 응답 인터셉터 추가
refreshapi.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // 토큰 재시도 플래그 설정
    console.log('401 에러 감지. 토큰 재발급을 시도합니다.'); // 로그 추가: 401 에러 및 토큰 재발급 시도
    try {
      console.log('토큰재발급요청중....');
      // 토큰 재발급 요청
      // const refreshtoken = cookies.get('refreshToken');
      const response = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh`);
      console.log('토큰재발급요청완료', response);
      cookies.get('accessToken');
      cookies.get('refreshToken');

      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
      ).then((response) => {
        console.log('토큰재발급요청완료', response);
      }).catch((error) => {
        console.error('토큰재발급실패', error);
      }).finally(() => {
        console.log('토큰재발급요청종료');
      });

      if ((await response).data) {
        const { accessToken, refreshToken } = (await response).data;
        cookies.set('accessToken', accessToken, { path: '/' });
        cookies.set('refreshToken', refreshToken, { path: '/' });
        console.log(`새 액세스 토큰(${accessToken})과 리프레시 토큰(${refreshToken})이 쿠키에 저장되었습니다.`); // 로그 추가: 새 토큰 저장
        // 헤더 업데이트
        refreshapi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 원래 요청 재시도
        return refreshapi(originalRequest);
      }
    } catch (refreshError) {
      console.error('토큰 재발급 실패', refreshError);
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export default refreshapi;
