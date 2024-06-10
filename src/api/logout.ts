import { getCookie, removeCookie } from '@/app/Cookies.tsx';
import api from './axios_interceptor.ts';

const logout = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  if (!accessToken || !refreshToken) {
    throw new Error('No tokens found in cookies');
  }

  return api
    .post('/signout', {}, {})
    .then((response) => {
      removeCookie('accessToken', { path: '/' });
      removeCookie('refreshToken', { path: '/' });
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default logout;
