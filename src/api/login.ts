/* eslint-disable operator-linebreak */
/* eslint-disable no-multi-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { setCookie } from '@/app/Cookies.tsx';

const KakaoLogin = async () => {
  const res = (window.location.href = `${process.env.LOGIN_API_URL}/kakao`);
  if (res) {
    setCookie('token', `JWT ${res}`, {
      path: '/',
      sameSite: 'strict',
    });
  }
};

export default KakaoLogin;
