/* eslint-disable no-unused-vars */

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
