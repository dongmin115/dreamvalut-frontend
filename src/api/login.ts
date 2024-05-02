import { getCookie } from '@/app/Cookies.tsx';
import axios from 'axios';
// import { Cookie } from 'next/font/google';
// import jwt from 'jsonwebtoken';

const KakaoLogin = () => {
  const handleCallback = async () => {
    // 카카오 로그인 페이지로 리다이렉트합니다.
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;

    try {
      // 액세스 토큰과 리프레시 토큰이 유효한 경우에만 쿠키에 저장합니다.

      // 쿠키에 토큰 데이터를 저장합니다.
      const a = await getCookie('accessToken');
      const r = await getCookie('refreshToken');

      // 쿠키를 헤더에 포함하여 Axios POST 요청을 보냅니다.
      const headers = {
        Authorization: `Bearer ${a}`,
        'x-refresh-token': r,
      };
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {},
          {
            headers,
          },
        );
        console.log('HTTP 요청 성공:', response.data);
      } catch (error) {
        console.error('HTTP 요청 실패:', error);
      }
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  // 리다이렉트가 완료된 후에 콜백 처리를 수행합니다.
  handleCallback();
};

export default KakaoLogin;
