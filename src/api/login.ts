import axios from 'axios';
import { setCookie } from '@/app/Cookies.tsx';
import jwt from 'jsonwebtoken';

const KakaoLogin = () => {
  const handleCallback = async () => {
    // 카카오 로그인 페이지로 리다이렉트합니다.
    window.location.href = `${process.env.LOGIN_URL}`;

    try {
      // Axios를 사용하여 API를 호출하여 JSON 형태의 토큰을 받아옵니다.
      const response = await axios.get(`${process.env.LOGIN_URL}`);
      const { accessToken, refreshToken } = response.data;

      // 액세스 토큰과 리프레시 토큰이 유효한 경우에만 쿠키에 저장합니다.
      if (accessToken && refreshToken) {
        // JSON 형태로 토큰 데이터를 만듭니다.
        const tokenData = {
          accessToken,
          refreshToken,
        };

        // 액세스 토큰과 리프레시 토큰을 jwt로 디코딩하여 JSON 형태로 추출합니다.
        const decodedAccessToken = jwt.decode(accessToken);
        const decodedRefreshToken = jwt.decode(refreshToken);

        // 쿠키에 토큰 데이터를 저장합니다.
        setCookie('tokenData', JSON.stringify(tokenData), {
          path: '/',
          sameSite: 'strict',
        });

        console.log('액세스 토큰과 리프레시 토큰을 쿠키에 저장했습니다.');

        // 쿠키를 헤더에 포함하여 Axios POST 요청을 보냅니다.
        const headers = {
          Authorization: `Bearer ${JSON.stringify(decodedAccessToken)}`,
          'x-refresh-token': JSON.stringify(decodedRefreshToken),
        };

        try {
          const res = await axios.post(
            'http://localhost:8080/refresh',
            {},
            {
              headers,
            },
          );
          console.log('HTTP 요청 성공:', res.data);
        } catch (error) {
          console.error('HTTP 요청 실패:', error);
        }
      } else {
        console.error('액세스 토큰 또는 리프레시 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  // 리다이렉트가 완료된 후에 콜백 처리를 수행합니다.
  handleCallback();
};

export default KakaoLogin;
