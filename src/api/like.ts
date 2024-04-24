/* eslint-disable no-console */
import axios from 'axios';

// const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres/list`);

// 좋아요 정보 가져오기
export async function fetchAddLike(trackId: string) {
  try {
    const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/likes`, // 실제 서버용
      `/api/v1/tracks/${trackId}/likes`, // mock server용
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (add like):', trackId);
    throw error;
  }
}

export async function fetchCancelLike(trackId: string) {
  try {
    const response = await axios.delete(
      //   `${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/likes`, // 실제 서버용
      `/api/v1/tracks/${trackId}/likes`, // mock server용
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (cancel like):', error);
    throw error;
  }
}
