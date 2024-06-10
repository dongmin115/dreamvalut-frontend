/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { getCookie, setCookie } from '@/app/Cookies.tsx';
import axios from 'axios';
import { Cookies } from 'react-cookie';

// 쿠키 인스턴스 생성
const cookies = new Cookies();

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
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

        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          setCookie('accessToken', newAccessToken, { path: '/' });
          setCookie('refreshToken', newRefreshToken, { path: '/' });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // 반환 추가
  },
);

export default api;
