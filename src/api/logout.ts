import { getCookie, removeCookie } from '@/app/Cookies.tsx';
import axios from 'axios';

// 로그아웃 함수를 정의합니다.
const logout = () => {
  // 쿠키에서 액세스 토큰과 리프레시 토큰을 읽어옵니다.
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  console.log('액세스 토큰:', accessToken);
  console.log('리프레시 토큰:', refreshToken);

  // 토큰이 없으면 에러를 던집니다.
  if (!accessToken || !refreshToken) {
    throw new Error('No tokens found in cookies');
  }

  // API 요청을 보냅니다.
  console.log('post try문 시작');
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
      // 요청이 성공하면 쿠키를 삭제합니다.
      removeCookie('accessToken', { path: '/' });
      removeCookie('refreshToken', { path: '/' });
      console.log('쿠키 삭제 완료');

      // 요청이 성공하면 응답 데이터를 반환합니다.
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
