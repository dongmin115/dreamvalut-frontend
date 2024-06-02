import { getCookie, removeCookie } from '@/app/Cookies.tsx';
import axios from 'axios';

// 로그아웃 함수를 정의합니다.
const logout = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  // 토큰이 없으면 에러
  if (!accessToken || !refreshToken) {
    throw new Error('No tokens found in cookies');
  }

  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/signout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Refresh-Token': `${refreshToken}`,
        },
      },
    )
    .then((response) => {
      removeCookie('accessToken', { path: '/' });
      removeCookie('refreshToken', { path: '/' });
      return response.data;
    })
    .catch((error) => {
      // 에러가 발생하면 에러 메시지를 콘솔에 출력합니다.
      console.error('Error during logout:', error);

      // 에러 객체를 던져 호출자가 처리할 수 있도록 합니다.
      throw error;
    });
};

export default logout;
