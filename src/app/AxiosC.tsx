/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getCookie } from '@/app/Cookies.tsx';

// Axios 인스턴스 생성
const axiosInstance = axios.create();

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    // 액세스 토큰 가져오기
    const accessToken = await getCookie('accessToken');
    // 요청 헤더에 액세스 토큰 설정
    config.headers.accessToken = accessToken;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
