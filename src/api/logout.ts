/* eslint-disable implicit-arrow-linebreak */
import { getCookie, removeCookie } from '@/app/Cookies.tsx';
import Swal from 'sweetalert2';
import api from './axios_interceptor.ts';

const logout = async () => {
  try {
    const response = await api.post(
      '/signout',
      {},
      {
        headers: {
          'X-Refresh-Token': getCookie('refreshToken'),
        },
      },
    );
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });

    // 성공 알림
    Swal.fire({
      title: '로그아웃',
      text: '로그아웃 성공',
      icon: 'success',
      confirmButtonText: '확인',
    });

    return response.data;
  } catch (error) {
    // 실패 알림
    Swal.fire({
      title: '로그아웃 실패',
      text: '다시 시도해보세요',
      icon: 'error',
      confirmButtonText: '확인',
    });
    throw error; // 에러를 밖으로 던집니다.
  }
};
export default logout;
