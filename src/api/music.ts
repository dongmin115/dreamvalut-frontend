/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from 'axios';
import { getCookie } from '@/app/Cookies';

export const getMusic = async (trackId: number, setIsLiked: any) => {
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
    setIsLiked(response.data.likes_flag);
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export const likes = async (trackId: string) => {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/likes`,
      {},
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

export const disLikes = async (trackId: string) => {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/disLikes`,
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

export const fetchSearch = async (
  query: string,
  pageIndex: number,
  size: number,
) => {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}&page=${pageIndex}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};
