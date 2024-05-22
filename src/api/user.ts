/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import axios from 'axios';
import { getCookie } from '@/app/Cookies';

async function getUser(setName: any) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    setName(response.data.display_name);
    return response.data;
  } catch (error) {
    console.error('유저 정보 요청 실패:', error);
    throw error;
  }
}

export default getUser;
