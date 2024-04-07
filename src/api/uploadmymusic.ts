/* eslint-disable consistent-return */
import axios from 'axios';

const uploadMymusic = async () => {
  try {
    const response = await axios.post('/api/v1/tracks');
    if (response.data) {
      return response.data.data; // 장르 데이터 반환
    }
  } catch (error) {
    console.error('오류 발생', error);
    throw new Error('API 호출 중 오류 발생');
  }
};

export default uploadMymusic;
