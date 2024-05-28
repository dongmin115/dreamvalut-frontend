/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { getCookie, removeCookie } from '@/app/Cookies.tsx';

export const KakaoLogin = () => {
  const handleCallback = async () => {
    try {
      // API 호출
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
    } catch (error) {
      console.error('API 요청 받아오기 실패:', error);
    }
  };
  // 컴포넌트가 마운트되었을 때 콜백을 실행합니다.
  handleCallback();
};

export const GoogleLogin = () => {
  const handleCallback = async () => {
    try {
      // API 호출
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
    } catch (error) {
      console.error('API 요청 받아오기 실패:', error);
    }
  };
  // 컴포넌트가 마운트되었을 때 콜백을 실행합니다.
  handleCallback();
};

export const NaverLogin = () => {
  const handleCallback = async () => {
    try {
      // API 호출
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
    } catch (error) {
      console.error('API 요청 받아오기 실패:', error);
    }
  };
  // 컴포넌트가 마운트되었을 때 콜백을 실행합니다.
  handleCallback();
};

export const LogOut = () => {
  // 쿠키 삭제
  removeCookie('accessToken', { path: '/' });
  removeCookie('refreshToken', { path: '/' });

  // 쿠키 삭제 후 확인
  const isAccessTokenRemoved = !getCookie('accessToken');
  const isRefreshTokenRemoved = !getCookie('refreshToken');

  // 쿠키가 잘 삭제되었으면 로그인 페이지로 이동
  if (isAccessTokenRemoved && isRefreshTokenRemoved) {
    window.location.href = '/login';
  } else {
    console.error('Failed to remove cookies.');
  }
};
