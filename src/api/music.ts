/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from 'axios';
import { getCookie } from '@/app/Cookies';

const getMusic = async (trackId: number) => {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};
export default getMusic;
