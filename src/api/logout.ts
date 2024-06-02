import { getCookie, removeCookie } from '@/app/Cookies.tsx';
import axios from 'axios';

const logout = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

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
      throw error;
    });
};

export default logout;
