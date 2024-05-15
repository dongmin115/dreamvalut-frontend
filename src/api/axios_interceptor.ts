/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { getCookie } from '@/app/Cookies';
import axios from 'axios';
import { Cookies } from 'react-cookie';

// 쿠키 인스턴스 생성
const cookies = new Cookies();

// Axios 인스턴스 생성
const refreshapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 인터셉터 추가
refreshapi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// 응답 인터셉터 추가
refreshapi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 토큰 재시도 플래그 설정
      console.log('401 에러 감지. 토큰 재발급을 시도합니다.'); // 로그 추가: 401 에러 및 토큰 재발급 시도
      try {
        console.log('토큰재발급요청중....');
        // 토큰 재발급 요청
        const refreshToken = getCookie('refreshToken');
        const accessToken = getCookie('accessToken');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'X-Refresh-Token': `${refreshToken}`,
            },
          },
        );
        console.log('토큰재발급요청완료', response);

        // axios
        //   .post(`${process.env.NEXT_PUBLIC_API_URL}/refresh`)
        //   .then((response) => {
        //     console.log('토큰재발급요청완료', response);
        //   })
        //   .catch((error) => {
        //     console.error('토큰재발급실패', error);
        //   })
        //   .finally(() => {
        //     console.log('토큰재발급요청종료');
        //   });

        // 쿠키에 저장하는 로직만 구현하면댐
        if (response) {
          const { accesstoken, refreshtoken } = response.data;
          cookies.set('accessToken', accesstoken, { path: '/' });
          cookies.set('refreshToken', refreshtoken, { path: '/' });
          console.log(
            `새 액세스 토큰(${accesstoken})과 리프레시 토큰(${refreshtoken})이 쿠키에 저장되었습니다.`,
          ); // 로그 추가: 새 토큰 저장
          // 헤더 업데이트
          refreshapi.defaults.headers.common.Authorization = `Bearer ${accesstoken}`;

          // 원래 요청 재시도
          return refreshapi(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 재발급 실패', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default refreshapi;
