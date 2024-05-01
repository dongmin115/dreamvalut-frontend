/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { getCookie } from '@/app/Cookies';

export const getMusic = async (trackId: number) => {
  try {
    const accessToken = await getCookie('accessToken');
    const refreshToken = await getCookie('refreshToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'x-refresh-token': refreshToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};
export const likes = async (trackId: number) => {
  try {
    const accessToken = await getCookie('accessToken');
    const refreshToken = await getCookie('refreshToken');
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'x-refresh-token': refreshToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export const disLikes = async (trackId: number) => {
  try {
    const accessToken = await getCookie('accessToken');
    const refreshToken = await getCookie('refreshToken');
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/disLikes`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'x-refresh-token': refreshToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};
